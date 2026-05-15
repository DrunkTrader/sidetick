import Link from "next/link";

export default function DashboardPage(): React.JSX.Element {
  return (
    <main>
      <h1 className="font-[var(--font-display)] text-3xl">My Courses</h1>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        Continue your progress in Mini Quant from where you left off.
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">Active Course</p>
          <h2 className="mt-2 font-[var(--font-display)] text-2xl">Mini Quant</h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            22 hours · 11 modules · Lifetime access
          </p>
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">Progress: 23%</p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/dashboard/course/mini-quant"
              className="rounded-full bg-[var(--gradient-cta)] px-5 py-2 text-sm font-bold text-[var(--color-navy)]"
            >
              Open Course
            </Link>
            <Link
              href="/dashboard/course/mini-quant/m3-l1"
              className="rounded-full border border-[rgba(0,200,150,0.2)] px-5 py-2 text-sm"
            >
              Resume Lesson
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
