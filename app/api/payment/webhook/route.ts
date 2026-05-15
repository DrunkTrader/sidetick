import crypto from "node:crypto";

function validateWebhook(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
}

export async function POST(request: Request): Promise<Response> {
  try {
    const signature = request.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const body = await request.text();

    if (!signature || !webhookSecret) {
      return Response.json({ success: false, error: "Missing webhook metadata" }, { status: 400 });
    }

    const isValid = validateWebhook(body, signature, webhookSecret);
    if (!isValid) {
      return Response.json({ success: false, error: "Invalid signature" }, { status: 401 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[PAYMENT_WEBHOOK]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
