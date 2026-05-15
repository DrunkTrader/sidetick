"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CourseDetails, CourseLesson, CourseModule } from "@/lib/portal-data";
import { getCourseProgressPercent } from "@/lib/portal-data";
import { ProgressBar } from "./ProgressBar";

type CourseSidebarProps = {
  course: CourseDetails;
  activeLessonId?: string;
  completedLessonIds: string[];
  inProgressLessonId?: string;
  hasPurchase: boolean;
};

function getModuleStatus(module: CourseModule, completedLessonIds: string[], inProgressLessonId?: string): string {
  const completedCount = module.lessons.filter((lesson) => completedLessonIds.includes(lesson.id)).length;
  if (completedCount === module.lessons.length && module.lessons.length > 0) {
    return "✅";
  }
  if (module.lessons.some((lesson) => lesson.id === inProgressLessonId || completedLessonIds.includes(lesson.id))) {
    return "🔵";
  }
  return "⬜";
}

function isModuleLocked(module: CourseModule, hasPurchase: boolean): boolean {
  return !hasPurchase && module.order >= 4;
}

function getLessonStatus(
  lesson: CourseLesson,
  activeLessonId: string | undefined,
  completedLessonIds: string[],
  locked: boolean,
): string {
  if (locked) {
    return "🔒";
  }
  if (completedLessonIds.includes(lesson.id)) {
    return "✅";
  }
  if (lesson.id === activeLessonId) {
    return "🔵";
  }
  return "⬜";
}

export function CourseSidebar({
  course,
  activeLessonId,
  completedLessonIds,
  inProgressLessonId,
  hasPurchase,
}: CourseSidebarProps): React.JSX.Element {
  const initialOpenModuleId = useMemo(() => {
    const containingActive = course.modules.find((module) =>
      module.lessons.some((lesson) => lesson.id === activeLessonId),
    );
    return containingActive?.id ?? course.modules[0]?.id ?? "";
  }, [activeLessonId, course.modules]);

  const [openModuleIds, setOpenModuleIds] = useState<string[]>(initialOpenModuleId ? [initialOpenModuleId] : []);
  const progressPercent = getCourseProgressPercent(course, completedLessonIds);

  const toggleModule = (moduleId: string): void => {
    setOpenModuleIds((current) =>
      current.includes(moduleId) ? current.filter((id) => id !== moduleId) : [...current, moduleId],
    );
  };

  return (
    <aside className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-4">
      <h2 className="font-[var(--font-display)] text-xl">{course.title}</h2>
      <div className="mt-5 space-y-2">
        {course.modules.map((module) => {
          const locked = isModuleLocked(module, hasPurchase);
          const moduleStatus = locked ? "🔒" : getModuleStatus(module, completedLessonIds, inProgressLessonId);
          const isOpen = openModuleIds.includes(module.id);

          return (
            <div key={module.id} className="rounded-xl border border-[rgba(0,200,150,0.12)] bg-[var(--color-navy)]/30">
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="flex w-full items-center justify-between px-3 py-3 text-left"
              >
                <span className="text-sm text-[var(--color-text-primary)]">
                  {moduleStatus} Module {module.order}: {module.title}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{module.lessons.length} lessons</span>
              </button>

              {isOpen && (
                <div className="border-t border-[rgba(0,200,150,0.1)] px-2 py-2">
                  {module.lessons.map((lesson) => {
                    const lessonStatus = getLessonStatus(
                      lesson,
                      activeLessonId,
                      completedLessonIds,
                      locked,
                    );
                    const isActive = lesson.id === activeLessonId;

                    if (locked) {
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between rounded-lg px-2 py-2 text-xs text-[var(--color-text-muted)]"
                        >
                          <span>
                            {lessonStatus} {lesson.title}
                          </span>
                          <span>{lesson.durationLabel}</span>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={lesson.id}
                        href={`/dashboard/course/${course.slug}/${lesson.id}`}
                        className={`flex items-center justify-between rounded-lg px-2 py-2 text-xs transition ${
                          isActive
                            ? "bg-[var(--color-teal-glow)] text-[var(--color-teal-light)]"
                            : "text-[var(--color-text-muted)] hover:bg-[rgba(0,200,150,0.08)] hover:text-[var(--color-text-primary)]"
                        }`}
                      >
                        <span>
                          {lessonStatus} {lesson.title}
                        </span>
                        <span>{lesson.durationLabel}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-[rgba(0,200,150,0.12)] bg-[var(--color-navy)]/40 p-3">
        <p className="text-xs text-[var(--color-text-muted)]">Progress: {progressPercent}%</p>
        <div className="mt-2">
          <ProgressBar value={progressPercent} />
        </div>
      </div>
    </aside>
  );
}
