import { db } from "@/lib/db";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<Response> {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const sessionCookieName = getSessionCookieName();
    const token = cookieHeader
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${sessionCookieName}=`))
      ?.split("=")[1];

    if (token) {
      const payload = await verifySessionToken(token);
      if (payload) {
        await db.session.updateMany({
          where: {
            id: payload.sessionId,
            userId: payload.userId,
          },
          data: {
            isRevoked: true,
            lastActiveAt: new Date(),
          },
        });
      }
    }

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set({
      name: sessionCookieName,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("[AUTH_LOGOUT]", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
