type DownloadRouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: DownloadRouteParams): Promise<Response> {
  try {
    const { id } = await context.params;
    return Response.json({ success: true, data: { resourceId: id } }, { status: 200 });
  } catch (error) {
    console.error("[FREEBIES_DOWNLOAD]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
