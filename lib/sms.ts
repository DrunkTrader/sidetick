type SendOtpInput = {
  phone: string;
  otp: string;
};

function getTwilioConfig(): {
  accountSid: string;
  authToken: string;
  fromPhoneNumber: string;
} {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken) {
    throw new Error("Missing Twilio configuration");
  }

  if (!fromPhoneNumber) {
    throw new Error("Missing Twilio sender configuration");
  }

  return { accountSid, authToken, fromPhoneNumber };
}

export async function sendOtp(input: SendOtpInput): Promise<void> {
  if (!input.phone || !input.otp) {
    throw new Error("Invalid OTP payload");
  }

  const { accountSid, authToken, fromPhoneNumber } = getTwilioConfig();
  const messageBody = `Your Sidetick OTP is ${input.otp}. It expires in 10 minutes.`;
  const authHeader = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  const to = input.phone;
  const from = fromPhoneNumber;

  const payload = new URLSearchParams({
    To: to,
    From: from,
    Body: messageBody,
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload.toString(),
  });

  if (!response.ok) {
    let errorMessage = `Twilio request failed: ${response.status}`;
    try {
      const errorPayload = (await response.json()) as {
        message?: string;
        code?: number;
      };
      if (errorPayload.message) {
        errorMessage = `Twilio request failed (${errorPayload.code ?? "unknown"}): ${errorPayload.message}`;
      }
    } catch {
      // Keep default status-only message.
    }
    throw new Error(errorMessage);
  }
}
