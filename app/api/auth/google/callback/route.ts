import { db } from "@/lib/db";
import {
  getSessionCookieMaxAge,
  getSessionCookieName,
  signSessionToken,
  type SessionAuthProvider,
} from "@/lib/auth";
import { NextResponse } from "next/server";

const GOOGLE_STATE_COOKIE = "sidetick_google_oauth_state";

type GoogleTokenResponse = {
  access_token?: string;
};

type GoogleUserInfo = {
  sub?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
};

function redirectToLoginWithError(request: Request, message: string): NextResponse {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("error", message);
  return NextResponse.redirect(loginUrl);
}

export async function GET(request: Request): Promise<Response> {
  try {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!googleClientId || !googleClientSecret) {
      return redirectToLoginWithError(request, "Google login is not configured.");
    }

    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");
    if (error) {
      return redirectToLoginWithError(request, "Google login was cancelled.");
    }

    const stateFromCookie = request.headers
      .get("cookie")
      ?.split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${GOOGLE_STATE_COOKIE}=`))
      ?.split("=")[1];

    if (!code || !state || !stateFromCookie || state !== stateFromCookie) {
      return redirectToLoginWithError(request, "Invalid Google login request.");
    }

    const redirectUri = new URL("/api/auth/google/callback", request.url).toString();
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenPayload = (await tokenResponse.json()) as GoogleTokenResponse;
    if (!tokenResponse.ok || !tokenPayload.access_token) {
      return redirectToLoginWithError(request, "Google login failed.");
    }

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenPayload.access_token}` },
    });

    const userPayload = (await userResponse.json()) as GoogleUserInfo;
    if (!userResponse.ok || !userPayload.sub) {
      return redirectToLoginWithError(request, "Google profile fetch failed.");
    }

    const email = userPayload.email_verified === false ? undefined : userPayload.email?.trim().toLowerCase();
    const existingByGoogleId = await db.user.findUnique({ where: { googleId: userPayload.sub } });
    const existingByEmail = !existingByGoogleId && email ? await db.user.findUnique({ where: { email } }) : null;

    const user = existingByGoogleId
      ? await db.user.update({
          where: { id: existingByGoogleId.id },
          data: {
            email: email ?? undefined,
            name: userPayload.name ?? undefined,
          },
        })
      : existingByEmail
        ? await db.user.update({
            where: { id: existingByEmail.id },
            data: {
              googleId: userPayload.sub,
              email,
              name: userPayload.name ?? existingByEmail.name,
            },
          })
        : await db.user.create({
            data: {
              googleId: userPayload.sub,
              email: email ?? null,
              name: userPayload.name ?? null,
            },
          });

    const deviceInfo = request.headers.get("user-agent") ?? "unknown";
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const session = await db.session.create({
      data: {
        userId: user.id,
        deviceInfo,
        ipAddress,
      },
    });

    const activePurchase = await db.purchase.findFirst({
      where: {
        userId: user.id,
        status: "ACTIVE",
      },
      select: { id: true },
    });

    const authProvider: SessionAuthProvider = "GOOGLE";
    const sessionToken = await signSessionToken({
      userId: user.id,
      identifier: user.email ?? `google:${userPayload.sub}`,
      role: user.role,
      authProvider,
      sessionId: session.id,
    });

    const redirectTo = activePurchase ? "/dashboard" : "/";
    const response = NextResponse.redirect(new URL(redirectTo, request.url));
    response.cookies.set({
      name: getSessionCookieName(),
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: getSessionCookieMaxAge(),
    });
    response.cookies.set({
      name: GOOGLE_STATE_COOKIE,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("[AUTH_GOOGLE_CALLBACK]", error);
    return redirectToLoginWithError(request, "Google login failed.");
  }
}
