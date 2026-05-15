type CreateOrderRequest = {
  amount: number;
  courseId: string;
};

import { createReceiptOrder } from "@/lib/razorpay";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as CreateOrderRequest;
    if (!body.amount || !body.courseId) {
      return Response.json(
        { success: false, error: "Amount and courseId are required" },
        { status: 400 },
      );
    }

    const order = createReceiptOrder({ amount: body.amount, courseId: body.courseId });

    return Response.json({ success: true, data: order }, { status: 200 });
  } catch (error) {
    console.error("[PAYMENT_CREATE_ORDER]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
