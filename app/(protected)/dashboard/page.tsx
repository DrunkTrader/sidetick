import { flattenLessons, miniQuantCourse } from "@/lib/portal-data";
import { CourseGridItem } from "@/components/dashboard/CourseGridItem";

export default function DashboardPage(): React.JSX.Element {
  const userName = "Mini Quant Student"; // Mocked for now, to be replaced by actual user data
  const lessons = flattenLessons(miniQuantCourse);

  return (
    <main>
      <div className="mb-8">
        <h1 className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-text-dark)]">
          My Courses
        </h1>
        <p className="mt-2 text-lg text-[var(--color-text-muted)]">
          Welcome, {userName}!
        </p>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--color-text-dark)]">{miniQuantCourse.title}</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {lessons.length} Lessons
          </span>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {lessons.map(({ module, lesson }) => (
            <CourseGridItem
              key={lesson.id}
              courseSlug={miniQuantCourse.slug}
              moduleTitle={module.title}
              lesson={lesson}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
