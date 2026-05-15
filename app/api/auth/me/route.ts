import { db } from "@/lib/db";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";

function getCookieValue(cookieHeader: string, name: string): string | null {
  const target = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));

  if (!target) {
    return null;
  }

  return target.slice(name.length + 1);
}

export async function GET(request: Request): Promise<Response> {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = getCookieValue(cookieHeader, getSessionCookieName());

    if (!token) {
      return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionToken(token);
    if (!payload) {
      return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const session = await db.session.findUnique({
      where: { id: payload.sessionId },
      include: { user: true },
    });

    if (!session || session.isRevoked || session.userId !== payload.userId) {
      return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    return Response.json(
      {
        success: true,
        data: {
          user: {
            id: session.user.id,
            phone: session.user.phone,
            email: session.user.email,
            name: session.user.name,
            role: session.user.role,
          },
          session: {
            id: session.id,
            lastActiveAt: session.lastActiveAt.toISOString(),
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[AUTH_ME]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

