import { db } from "@/lib/db";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
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

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set({
      name: sessionCookieName,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("[AUTH_LOGOUT]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

