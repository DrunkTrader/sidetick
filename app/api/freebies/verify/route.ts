import { db } from "@/lib/db";
import { normalizeIndianPhone } from "@/lib/auth";
import { clearOtpRecord, getOtpRecord, incrementOtpAttempts } from "@/lib/redis";

type VerifyFreebiesRequest = {
  phone: string;
  otp: string;
};

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as VerifyFreebiesRequest;
    if (!body.phone || !body.otp) {
      return Response.json(
        { success: false, error: "Phone and OTP are required" },
        { status: 400 },
      );
    }

    const normalizedPhone = normalizeIndianPhone(body.phone);
    const otpRecord = await getOtpRecord(normalizedPhone);
    if (!otpRecord) {
      return Response.json({ success: false, error: "OTP expired. Request a new OTP." }, { status: 400 });
    }

    if (otpRecord.attempts >= 3) {
      await clearOtpRecord(normalizedPhone);
      return Response.json(
        { success: false, error: "Maximum OTP attempts exceeded." },
        { status: 429 },
      );
    }

    if (otpRecord.otp !== body.otp) {
      const updatedRecord = await incrementOtpAttempts(normalizedPhone);
      if (updatedRecord && updatedRecord.attempts >= 3) {
        await clearOtpRecord(normalizedPhone);
      }
      return Response.json({ success: false, error: "Invalid OTP." }, { status: 401 });
    }

    await clearOtpRecord(normalizedPhone);

    await db.freebiesLead.upsert({
      where: { phone: normalizedPhone },
      update: {
        verifiedAt: new Date(),
      },
      create: {
        phone: normalizedPhone,
        ipAddress:
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          request.headers.get("x-real-ip") ??
          "unknown",
      },
    });

    return Response.json(
      {
        success: true,
        data: {
          verified: true,
          phone: normalizedPhone,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[FREEBIES_VERIFY]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
