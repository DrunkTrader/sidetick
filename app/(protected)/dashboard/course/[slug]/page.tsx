import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseSidebar } from "@/components/portal/CourseSidebar";
import { flattenLessons, getCourseBySlug } from "@/lib/portal-data";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CoursePage({ params }: CoursePageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const lessons = flattenLessons(course);
  const firstLesson = lessons[0];
  const completedLessonIds = ["m1-l1", "m1-l2", "m2-l1", "m2-l2"];
  const inProgressLessonId = "m3-l1";

  return (
    <main className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <CourseSidebar
        course={course}
        activeLessonId={inProgressLessonId}
        completedLessonIds={completedLessonIds}
        inProgressLessonId={inProgressLessonId}
        hasPurchase
      />

      <section className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-6">
        <h1 className="font-[var(--font-display)] text-3xl">{course.title}</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Pick a lesson from the sidebar to start learning. Your progress auto-saves every 30 seconds.
        </p>

        {firstLesson ? (
          <div className="mt-6 rounded-xl border border-[rgba(0,200,150,0.12)] bg-[var(--color-navy)]/40 p-4">
            <p className="text-xs text-[var(--color-text-muted)]">Recommended next lesson</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
              {firstLesson.module.title} · {firstLesson.lesson.title}
            </p>
            <Link
              href={`/dashboard/course/${course.slug}/${inProgressLessonId}`}
              className="mt-4 inline-flex rounded-full bg-[var(--gradient-cta)] px-5 py-2 text-sm font-bold text-[var(--color-navy)]"
            >
              Continue Learning
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
