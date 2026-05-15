import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";

async function getSessionByToken(token: string) {
  const payload = await verifySessionToken(token);
  if (!payload) {
    return null;
  }

  const session = await db.session.findUnique({
    where: { id: payload.sessionId },
    include: {
      user: {
        include: {
          purchases: {
            where: { status: "ACTIVE" },
            include: { course: true },
            orderBy: { purchasedAt: "desc" },
          },
          progress: true,
        },
      },
    },
  });

  if (!session || session.isRevoked || session.userId !== payload.userId) {
    return null;
  }

  await db.session.update({
    where: { id: session.id },
    data: { lastActiveAt: new Date() },
  });

  return session;
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  if (!token) {
    return null;
  }

  return getSessionByToken(token);
}

export async function requireCurrentSession() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function requireAdminSession() {
  const session = await requireCurrentSession();
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }
  return session;
}
