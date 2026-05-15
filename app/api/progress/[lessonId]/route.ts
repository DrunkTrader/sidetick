type UpdateProgressRequest = {
  watchedSeconds: number;
  totalSeconds: number;
  lastPosition: number;
};

type LessonRouteParams = {
  params: Promise<{ lessonId: string }>;
};

export async function PATCH(request: Request, context: LessonRouteParams): Promise<Response> {
  try {
    const { lessonId } = await context.params;
    const body = (await request.json()) as UpdateProgressRequest;

    if (!body.totalSeconds || body.watchedSeconds < 0 || body.lastPosition < 0) {
      return Response.json({ success: false, error: "Invalid progress payload" }, { status: 400 });
    }

    const percentComplete = Math.min((body.watchedSeconds / body.totalSeconds) * 100, 100);
    const isCompleted = percentComplete >= 85;

    return Response.json(
      { success: true, data: { lessonId, percentComplete, isCompleted } },
      { status: 200 },
    );
  } catch (error) {
    console.error("[PROGRESS_PATCH]", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
