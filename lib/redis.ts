type UpstashResponse<T> = {
  result: T;
  error?: string;
};

export type OtpRecord = {
  otp: string;
  attempts: number;
};

export type OtpRateLimitResult = {
  allowed: boolean;
  key: string;
  count: number;
};

function getRedisConfig(): { url: string; token: string } {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Missing Upstash Redis configuration");
  }

  return { url, token };
}

async function executeRedisCommand<T>(command: Array<string | number>): Promise<T> {
  const { url, token } = getRedisConfig();
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command]),
  });

  if (!response.ok) {
    throw new Error(`Upstash request failed: ${response.status}`);
  }

  const payload = (await response.json()) as Array<UpstashResponse<T>>;
  const commandResult = payload[0];

  if (commandResult.error) {
    throw new Error(commandResult.error);
  }

  return commandResult.result;
}

export function getOtpRateKey(phone: string): string {
  return `otp_rate:${phone}`;
}

function getOtpKey(phone: string): string {
  return `otp:${phone}`;
}

export async function checkOtpRateLimit(phone: string): Promise<OtpRateLimitResult> {
  const key = getOtpRateKey(phone);
  const count = Number(await executeRedisCommand<number>(["INCR", key]));

  if (count === 1) {
    await executeRedisCommand<number>(["EXPIRE", key, 3600]);
  }

  return { allowed: count <= 5, key, count };
}

export async function storeOtpRecord(phone: string, record: OtpRecord): Promise<void> {
  const key = getOtpKey(phone);
  await executeRedisCommand<string>(["SETEX", key, 600, JSON.stringify(record)]);
}

export async function getOtpRecord(phone: string): Promise<OtpRecord | null> {
  const key = getOtpKey(phone);
  const recordJson = await executeRedisCommand<string | null>(["GET", key]);

  if (!recordJson) {
    return null;
  }

  const parsed = JSON.parse(recordJson) as OtpRecord;
  if (!parsed.otp || typeof parsed.attempts !== "number") {
    throw new Error("Corrupted OTP record in Redis");
  }

  return parsed;
}

export async function incrementOtpAttempts(phone: string): Promise<OtpRecord | null> {
  const current = await getOtpRecord(phone);
  if (!current) {
    return null;
  }

  const next = {
    otp: current.otp,
    attempts: current.attempts + 1,
  };

  await storeOtpRecord(phone, next);
  return next;
}

export async function clearOtpRecord(phone: string): Promise<void> {
  const key = getOtpKey(phone);
  await executeRedisCommand<number>(["DEL", key]);
}

