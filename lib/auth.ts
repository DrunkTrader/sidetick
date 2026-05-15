import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const SESSION_COOKIE_NAME = "sidetick_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;

export type SessionRole = "STUDENT" | "ADMIN";
export type SessionAuthProvider = "GOOGLE" | "TELEGRAM" | "PHONE_OTP";

export type SessionTokenPayload = JWTPayload & {
  userId: string;
  identifier: string;
  role: SessionRole;
  authProvider: SessionAuthProvider;
  sessionId: string;
};

function getJwtSecret(): Uint8Array {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("Missing JWT_SECRET");
  }
  return new TextEncoder().encode(jwtSecret);
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}

export function getSessionCookieMaxAge(): number {
  return SESSION_DURATION_SECONDS;
}

export function normalizeIndianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`;
  }
  if (phone.startsWith("+") && digits.length >= 10) {
    return `+${digits}`;
  }
  throw new Error("Invalid Indian phone number format");
}

export function generateOtpCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function signSessionToken(payload: {
  userId: string;
  identifier: string;
  role: SessionRole;
  authProvider: SessionAuthProvider;
  sessionId: string;
}): Promise<string> {
  const secret = getJwtSecret();

  return new SignJWT({
    userId: payload.userId,
    identifier: payload.identifier,
    role: payload.role,
    authProvider: payload.authProvider,
    sessionId: payload.sessionId,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN ?? "30d")
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<SessionTokenPayload | null> {
  try {
    const secret = getJwtSecret();
    const verified = await jwtVerify(token, secret);
    const payload = verified.payload as SessionTokenPayload;

    if (
      !payload.userId ||
      !payload.identifier ||
      !payload.role ||
      !payload.authProvider ||
      !payload.sessionId
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
