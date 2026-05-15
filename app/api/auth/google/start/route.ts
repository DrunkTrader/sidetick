import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

const GOOGLE_STATE_COOKIE = "sidetick_google_oauth_state";

export async function GET(request: Request): Promise<Response> {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    return Response.json({ success: false, error: "Google login is not configured." }, { status: 503 });
  }

  const state = randomBytes(24).toString("hex");
  const redirectUri = new URL("/api/auth/google/callback", request.url).toString();
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", googleClientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(authUrl);
  response.cookies.set({
    name: GOOGLE_STATE_COOKIE,
    value: state,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}
