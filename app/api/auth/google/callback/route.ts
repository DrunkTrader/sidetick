import { db } from "@/lib/db";
import {
  getSessionCookieMaxAge,
  getSessionCookieName,
  signSessionToken,
  type SessionAuthProvider,
} from "@/lib/auth";
import { syncGoogleUserToSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const GOOGLE_STATE_COOKIE = "sidetick_google_oauth_state";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleUserInfo = {
  sub?: string;
  email?: string;
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
      if (tokenPayload.error_description?.includes("redirect_uri_mismatch")) {
        return redirectToLoginWithError(
          request,
          "Google callback URL mismatch. Add /api/auth/google/callback to OAuth redirect URIs.",
        );
      }
      return redirectToLoginWithError(request, "Google login failed.");
    }

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenPayload.access_token}` },
    });

    const userPayload = (await userResponse.json()) as GoogleUserInfo;
    if (!userResponse.ok || !userPayload.sub) {
      return redirectToLoginWithError(request, "Google profile fetch failed.");
    }

    const user = await db.user.upsert({
      where: { googleId: userPayload.sub },
      update: {
        email: userPayload.email ?? undefined,
        name: userPayload.name ?? undefined,
      },
      create: {
        googleId: userPayload.sub,
        email: userPayload.email ?? null,
        name: userPayload.name ?? null,
      },
    });

    try {
      await syncGoogleUserToSupabase({
        sidetickUserId: user.id,
        googleId: userPayload.sub,
        email: user.email ?? null,
        name: user.name ?? null,
      });
    } catch (error) {
      console.error("[AUTH_GOOGLE_SUPABASE_SYNC]", error);
    }

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

    const authProvider: SessionAuthProvider = "GOOGLE";
    const sessionToken = await signSessionToken({
      userId: user.id,
      identifier: user.email ?? `google:${userPayload.sub}`,
      role: user.role,
      authProvider,
      sessionId: session.id,
    });

    const response = NextResponse.redirect(new URL("/dashboard", request.url));
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
