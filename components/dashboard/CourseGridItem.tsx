import Link from "next/link";
import { CourseLesson } from "@/lib/portal-data";

type CourseGridItemProps = {
  courseSlug: string;
  moduleTitle: string;
  lesson: CourseLesson;
};

export function CourseGridItem({ courseSlug, moduleTitle, lesson }: CourseGridItemProps): React.JSX.Element {
  return (
    <Link
      href={`/dashboard/course/${courseSlug}/${lesson.id}`}
      className="group flex flex-col gap-3 rounded-2xl p-3 transition hover:bg-slate-50"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-200">
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition group-hover:scale-110">
            <svg
              className="ml-1 h-6 w-6 text-[var(--color-teal)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur">
          {lesson.durationLabel}
        </div>
      </div>
      
      <div>
        <h3 className="line-clamp-2 font-semibold leading-snug text-[var(--color-text-dark)] transition group-hover:text-[var(--color-teal)]">
          {lesson.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">{moduleTitle}</p>
      </div>
    </Link>
  );
}
