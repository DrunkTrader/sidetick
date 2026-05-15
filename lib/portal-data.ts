export type LessonResource = {
  title: string;
  url: string;
};

export type CourseLesson = {
  id: string;
  title: string;
  durationLabel: string;
  totalSeconds: number;
  bunnyVideoId: string;
  notes: string;
  resources: LessonResource[];
};

export type CourseModule = {
  id: string;
  title: string;
  order: number;
  lessons: CourseLesson[];
};

export type CourseDetails = {
  slug: string;
  title: string;
  modules: CourseModule[];
};

export const miniQuantCourse: CourseDetails = {
  slug: "mini-quant",
  title: "Mini Quant",
  modules: [
    {
      id: "m1",
      title: "Introduction to Systematic Trading",
      order: 1,
      lessons: [
        {
          id: "m1-l1",
          title: "Why Systematic Trading Wins",
          durationLabel: "14 min",
          totalSeconds: 840,
          bunnyVideoId: "mq-m1-l1",
          notes: "Learn the mindset shift from manual charts to repeatable automation.",
          resources: [{ title: "Worksheet", url: "#" }],
        },
        {
          id: "m1-l2",
          title: "Automation Workflow Basics",
          durationLabel: "11 min",
          totalSeconds: 660,
          bunnyVideoId: "mq-m1-l2",
          notes: "Understand signal -> webhook -> broker execution flow.",
          resources: [{ title: "Checklist", url: "#" }],
        },
      ],
    },
    {
      id: "m2",
      title: "Pine Script Fundamentals",
      order: 2,
      lessons: [
        {
          id: "m2-l1",
          title: "Pine Syntax Essentials",
          durationLabel: "16 min",
          totalSeconds: 960,
          bunnyVideoId: "mq-m2-l1",
          notes: "Core syntax patterns and readability practices.",
          resources: [{ title: "Code Snippets", url: "#" }],
        },
        {
          id: "m2-l2",
          title: "Inputs, Variables, and Conditions",
          durationLabel: "18 min",
          totalSeconds: 1080,
          bunnyVideoId: "mq-m2-l2",
          notes: "Build configurable strategies with user inputs and conditions.",
          resources: [{ title: "Practice File", url: "#" }],
        },
      ],
    },
    {
      id: "m3",
      title: "Strategy Coding in Pine Script",
      order: 3,
      lessons: [
        {
          id: "m3-l1",
          title: "Entry/Exit Logic",
          durationLabel: "22 min",
          totalSeconds: 1320,
          bunnyVideoId: "mq-m3-l1",
          notes: "Code robust entry and exit logic with clean signal conditions.",
          resources: [{ title: "Template Strategy", url: "#" }],
        },
        {
          id: "m3-l2",
          title: "Risk Filters and Position Sizing",
          durationLabel: "20 min",
          totalSeconds: 1200,
          bunnyVideoId: "mq-m3-l2",
          notes: "Use rule-based risk filters and position sizing in your strategy.",
          resources: [{ title: "Risk Calculator", url: "#" }],
        },
      ],
    },
    {
      id: "m4",
      title: "TradingView Alerts Setup",
      order: 4,
      lessons: [
        {
          id: "m4-l1",
          title: "Alert Configuration Deep Dive",
          durationLabel: "13 min",
          totalSeconds: 780,
          bunnyVideoId: "mq-m4-l1",
          notes: "Configure real-time alerts for reliable strategy execution.",
          resources: [{ title: "Alert Payload Examples", url: "#" }],
        },
      ],
    },
    {
      id: "m5",
      title: "Dhan API Overview & Authentication",
      order: 5,
      lessons: [
        {
          id: "m5-l1",
          title: "Dhan Authentication Flow",
          durationLabel: "17 min",
          totalSeconds: 1020,
          bunnyVideoId: "mq-m5-l1",
          notes: "Generate, store, and rotate secure tokens for trading actions.",
          resources: [{ title: "Auth Quickstart", url: "#" }],
        },
      ],
    },
    {
      id: "m6",
      title: "Connecting Alerts to Dhan API",
      order: 6,
      lessons: [
        {
          id: "m6-l1",
          title: "Signal-to-Order Mapping",
          durationLabel: "19 min",
          totalSeconds: 1140,
          bunnyVideoId: "mq-m6-l1",
          notes: "Transform TradingView alerts into executable order payloads.",
          resources: [{ title: "Mapping Reference", url: "#" }],
        },
      ],
    },
    {
      id: "m7",
      title: "Webhook Automation Architecture",
      order: 7,
      lessons: [
        {
          id: "m7-l1",
          title: "Reliable Webhook Design",
          durationLabel: "15 min",
          totalSeconds: 900,
          bunnyVideoId: "mq-m7-l1",
          notes: "Design idempotent handlers and recovery-safe webhook endpoints.",
          resources: [{ title: "Architecture Diagram", url: "#" }],
        },
      ],
    },
    {
      id: "m8",
      title: "Risk Management Automation",
      order: 8,
      lessons: [
        {
          id: "m8-l1",
          title: "Automated SL and Position Limits",
          durationLabel: "18 min",
          totalSeconds: 1080,
          bunnyVideoId: "mq-m8-l1",
          notes: "Apply automated stop-loss logic and exposure limits.",
          resources: [{ title: "Risk Sheet", url: "#" }],
        },
      ],
    },
    {
      id: "m9",
      title: "Backtesting & Strategy Validation",
      order: 9,
      lessons: [
        {
          id: "m9-l1",
          title: "Backtesting Without Bias",
          durationLabel: "21 min",
          totalSeconds: 1260,
          bunnyVideoId: "mq-m9-l1",
          notes: "Validate strategy quality and avoid curve fitting pitfalls.",
          resources: [{ title: "Validation Checklist", url: "#" }],
        },
      ],
    },
    {
      id: "m10",
      title: "Deployment & Live Trading Setup",
      order: 10,
      lessons: [
        {
          id: "m10-l1",
          title: "Production Rollout",
          durationLabel: "12 min",
          totalSeconds: 720,
          bunnyVideoId: "mq-m10-l1",
          notes: "Deploy your execution stack and validate live readiness.",
          resources: [{ title: "Deployment Guide", url: "#" }],
        },
      ],
    },
    {
      id: "m11",
      title: "Scripts Library & Templates",
      order: 11,
      lessons: [
        {
          id: "m11-l1",
          title: "Template Library Walkthrough",
          durationLabel: "10 min",
          totalSeconds: 600,
          bunnyVideoId: "mq-m11-l1",
          notes: "Use and customize ready-to-deploy scripts from the library.",
          resources: [{ title: "Scripts Repository", url: "#" }],
        },
      ],
    },
  ],
};

export function getCourseBySlug(slug: string): CourseDetails | null {
  if (slug === miniQuantCourse.slug) {
    return miniQuantCourse;
  }
  return null;
}

export function flattenLessons(course: CourseDetails): Array<{ module: CourseModule; lesson: CourseLesson }> {
  return course.modules.flatMap((module) => module.lessons.map((lesson) => ({ module, lesson })));
}

export function getCourseProgressPercent(course: CourseDetails, completedLessonIds: string[]): number {
  const totalLessons = flattenLessons(course).length;
  if (totalLessons === 0) {
    return 0;
  }

  const completedCount = flattenLessons(course).filter(({ lesson }) =>
    completedLessonIds.includes(lesson.id),
  ).length;

  return Math.round((completedCount / totalLessons) * 100);
}
