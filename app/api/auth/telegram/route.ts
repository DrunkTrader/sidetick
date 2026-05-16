import { createHash, createHmac, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";
import {
  getSessionCookieMaxAge,
  getSessionCookieName,
  signSessionToken,
  type SessionAuthProvider,
} from "@/lib/auth";
import { NextResponse } from "next/server";

type TelegramAuthRequest = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date?: number;
  hash?: string;
};

function isTelegramAuthValid(input: Required<Pick<TelegramAuthRequest, "auth_date" | "hash">> & TelegramAuthRequest): boolean {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken || !input.hash) {
    return false;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (currentTimestamp - input.auth_date > 60 * 60 * 24) {
    return false;
  }

  const entries = Object.entries(input)
    .filter(([key, value]) => key !== "hash" && value !== undefined && value !== null)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${String(value)}`);

  const dataCheckString = entries.join("\n");
  const secret = createHash("sha256").update(botToken).digest();
  const digest = createHmac("sha256", secret).update(dataCheckString).digest("hex");
  const digestBuffer = Buffer.from(digest, "utf8");
  const hashBuffer = Buffer.from(input.hash, "utf8");

  if (digestBuffer.length !== hashBuffer.length) {
    return false;
  }

  return timingSafeEqual(digestBuffer, hashBuffer);
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as TelegramAuthRequest;
    if (!body.id || !body.auth_date || !body.hash) {
      return Response.json({ success: false, error: "Invalid Telegram payload." }, { status: 400 });
    }

    const validatedPayload: Required<Pick<TelegramAuthRequest, "auth_date" | "hash">> &
      TelegramAuthRequest = {
      ...body,
      auth_date: body.auth_date,
      hash: body.hash,
    };

    if (!isTelegramAuthValid(validatedPayload)) {
      return Response.json({ success: false, error: "Telegram login validation failed." }, { status: 401 });
    }

    const telegramId = String(body.id);
    const displayName = [body.first_name, body.last_name].filter(Boolean).join(" ").trim() || body.username || "Telegram User";

    const user = await db.user.upsert({
      where: { telegramId },
      update: {
        name: displayName,
      },
      create: {
        telegramId,
        name: displayName,
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

    const authProvider: SessionAuthProvider = "TELEGRAM";
    const sessionToken = await signSessionToken({
      userId: user.id,
      identifier: user.telegramId ?? `telegram:${telegramId}`,
      role: user.role,
      authProvider,
      sessionId: session.id,
    });

    const response = NextResponse.json(
      {
        success: true,
        data: {
          redirectTo: "/dashboard",
        },
      },
      { status: 200 },
    );

    response.cookies.set({
      name: getSessionCookieName(),
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: getSessionCookieMaxAge(),
    });

    return response;
  } catch (error) {
    console.error("[AUTH_TELEGRAM]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
