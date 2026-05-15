import { generateOtpCode, normalizeIndianPhone } from "@/lib/auth";
import { checkOtpRateLimit, storeOtpRecord } from "@/lib/redis";
import { sendOtp } from "@/lib/sms";

type SendOtpRequest = {
  phone: string;
};

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as SendOtpRequest;
    if (!body.phone) {
      return Response.json({ success: false, error: "Phone is required" }, { status: 400 });
    }

    const normalizedPhone = normalizeIndianPhone(body.phone);
    const rateLimit = await checkOtpRateLimit(normalizedPhone);
    if (!rateLimit.allowed) {
      return Response.json(
        { success: false, error: "OTP request limit reached. Try again after 1 hour." },
        { status: 429 },
      );
    }

    const otp = generateOtpCode();
    await storeOtpRecord(normalizedPhone, { otp, attempts: 0 });
    await sendOtp({ phone: normalizedPhone, otp });

    return Response.json(
      {
        success: true,
        data: {
          phone: normalizedPhone,
          expiresInSeconds: 600,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[FREEBIES_SEND_OTP]", error);
    if (error instanceof Error) {
      if (error.message === "Invalid Indian phone number format") {
        return Response.json(
          { success: false, error: "Enter a valid Indian phone number." },
          { status: 400 },
        );
      }

      if (error.message.includes("Missing Twilio")) {
        return Response.json(
          { success: false, error: "OTP delivery service is not configured. Contact support." },
          { status: 503 },
        );
      }

      if (error.message.startsWith("Twilio request failed")) {
        return Response.json(
          { success: false, error: "OTP could not be delivered right now. Please try again." },
          { status: 502 },
        );
      }
    }

    return Response.json({ success: false, error: "Could not send OTP right now." }, { status: 500 });
  }
}
