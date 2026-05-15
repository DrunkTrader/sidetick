import { generateBunnyToken } from "@/lib/bunny";

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("lessonId");

    if (!lessonId) {
      return Response.json({ success: false, error: "lessonId is required" }, { status: 400 });
    }

    const playbackUrl = generateBunnyToken(lessonId, "anonymous");
    return Response.json({ success: true, data: { playbackUrl } }, { status: 200 });
  } catch (error) {
    console.error("[VIDEO_TOKEN]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
