export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return Response.json({ success: false, error: "order_id is required" }, { status: 400 });
    }

    return Response.json({ success: true, data: { orderId } }, { status: 200 });
  } catch (error) {
    console.error("[PAYMENT_VERIFY]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
