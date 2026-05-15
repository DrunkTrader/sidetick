import { notFound } from "next/navigation";
import { CourseSidebar } from "@/components/portal/CourseSidebar";
import { VideoPlayer } from "@/components/portal/VideoPlayer";
import { flattenLessons, getCourseBySlug } from "@/lib/portal-data";

type LessonPageProps = {
  params: Promise<{ slug: string; lessonId: string }>;
};

export default async function LessonPlayerPage({
  params,
}: LessonPageProps): Promise<React.JSX.Element> {
  const { slug, lessonId } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const lessons = flattenLessons(course);
  const currentIndex = lessons.findIndex(({ lesson }) => lesson.id === lessonId);

  if (currentIndex === -1) {
    notFound();
  }

  const currentLesson = lessons[currentIndex];
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const completedLessonIds = ["m1-l1", "m1-l2", "m2-l1", "m2-l2"];
  const inProgressLessonId = currentLesson.lesson.id;

  return (
    <main className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <CourseSidebar
        course={course}
        activeLessonId={lessonId}
        completedLessonIds={completedLessonIds}
        inProgressLessonId={inProgressLessonId}
        hasPurchase
      />

      <section>
        <VideoPlayer
          lessonId={currentLesson.lesson.id}
          lessonTitle={currentLesson.lesson.title}
          moduleTitle={`Module ${currentLesson.module.order}`}
          totalSeconds={currentLesson.lesson.totalSeconds}
          userEmail="student@sidetick.in"
          userPhone="+919999999999"
          previousLessonHref={
            previousLesson ? `/dashboard/course/${course.slug}/${previousLesson.lesson.id}` : undefined
          }
          nextLessonHref={nextLesson ? `/dashboard/course/${course.slug}/${nextLesson.lesson.id}` : undefined}
        />

        <div className="mt-6 rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-5">
          <h2 className="font-[var(--font-display)] text-xl">Lesson Notes / Resources</h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">{currentLesson.lesson.notes}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={currentLesson.lesson.resources[0]?.url ?? "#"}
              className="rounded-full border border-[rgba(0,200,150,0.2)] px-4 py-2 text-xs"
            >
              Download Worksheet
            </a>
            <a
              href="#"
              className="rounded-full border border-[rgba(0,200,150,0.2)] px-4 py-2 text-xs"
            >
              View Script on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
