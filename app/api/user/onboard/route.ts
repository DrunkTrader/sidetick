import { db } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("sidetick_session")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifySessionToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, email, phone } = body;

    if (!phone) return NextResponse.json({ error: "Phone required" }, { status: 400 });

    const updatedUser = await db.user.update({
      where: { id: payload.userId },
      data: { name, email, phone },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("[ONBOARDING_ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
