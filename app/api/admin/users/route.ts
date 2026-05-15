export async function GET(): Promise<Response> {
  try {
    return Response.json({ success: true, data: [] }, { status: 200 });
  } catch (error) {
    console.error("[ADMIN_USERS]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
