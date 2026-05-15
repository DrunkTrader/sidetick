import Link from "next/link";
import { requireCurrentSession } from "@/lib/session";
import { flattenLessons, miniQuantCourse } from "@/lib/portal-data";

export default async function DashboardPage(): Promise<React.JSX.Element> {
  const session = await requireCurrentSession();
  const lessons = flattenLessons(miniQuantCourse);
  const completedLessonIds = session.user.progress.filter((item) => item.isCompleted).map((item) => item.lessonId);
  const progressPercent = lessons.length > 0 ? Math.round((completedLessonIds.length / lessons.length) * 100) : 0;
  const hasActivePurchase = session.user.purchases.length > 0;
  const nextLesson = lessons.find(({ lesson }) => !completedLessonIds.includes(lesson.id)) ?? lessons[0];

  return (
    <main>
      <h1 className="font-[var(--font-display)] text-3xl">My Courses</h1>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        Continue your progress in Mini Quant from where you left off.
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {hasActivePurchase ? (
          <article className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">Active Course</p>
            <h2 className="mt-2 font-[var(--font-display)] text-2xl">Mini Quant</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              22 hours · 11 modules · Lifetime access
            </p>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">Progress: {progressPercent}%</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(0,200,150,0.12)]">
              <div className="h-full rounded-full bg-[var(--gradient-cta)]" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/dashboard/course/mini-quant"
                className="rounded-full bg-[var(--gradient-cta)] px-5 py-2 text-sm font-bold text-[var(--color-navy)]"
              >
                Open Course
              </Link>
              {nextLesson ? (
                <Link
                  href={`/dashboard/course/mini-quant/${nextLesson.lesson.id}`}
                  className="rounded-full border border-[rgba(0,200,150,0.2)] px-5 py-2 text-sm"
                >
                  Resume Lesson
                </Link>
              ) : null}
            </div>
          </article>
        ) : (
          <article className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-warning)]">No active purchase</p>
            <h2 className="mt-2 font-[var(--font-display)] text-2xl">Mini Quant is not unlocked yet</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Enroll to unlock the course dashboard, lesson player, resources, and lifetime updates.
            </p>
            <Link
              href="/#pricing"
              className="mt-5 inline-flex rounded-full bg-[var(--gradient-cta)] px-5 py-2 text-sm font-bold text-[var(--color-navy)]"
            >
              View Enrollment Options
            </Link>
          </article>
        )}
      </section>
    </main>
  );
}
