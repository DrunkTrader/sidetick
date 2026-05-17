import React from "react";

export default function CurriculumPage() {
  const syllabus = [
    { module: 1, title: "Introduction to Systematic Trading", lessons: 4 },
    { module: 2, title: "Pine Script Fundamentals", lessons: 6 },
    { module: 3, title: "Strategy Coding in Pine Script", lessons: 5 },
    { module: 4, title: "TradingView Alerts Setup", lessons: 3 },
    { module: 5, title: "Dhan API Overview & Authentication", lessons: 4 },
    { module: 6, title: "Connecting Alerts to Dhan API", lessons: 5 },
  ];

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Course Syllabus
          </h1>
        </div>
        <button className="rounded-xl border-4 border-slate-900 bg-yellow-400 px-4 py-2 font-bold text-slate-900 shadow-[2px_2px_0px_0px_#1e293b] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hidden md:block">
          + Add Module (Admin)
        </button>
      </div>

      <div className="space-y-4">
        {syllabus.map(item => (
          <div key={item.module} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border-4 border-slate-900 dark:border-slate-500 bg-white dark:bg-slate-800 p-4 shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-none">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-slate-900 dark:border-slate-500 bg-purple-600 text-xl font-black text-white">
              {item.module}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h2>
              <p className="text-sm font-medium text-slate-500">{item.lessons} Lessons</p>
            </div>
            <div className="flex gap-2 self-end sm:self-auto">
              <button className="rounded-lg border-2 border-slate-900 dark:border-slate-500 bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600" title="Edit">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button className="rounded-lg border-2 border-slate-900 dark:border-slate-500 bg-red-50 p-2 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40" title="Delete">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
