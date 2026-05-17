import React from "react";

export default function PineScriptsPage() {
  const scripts = [
    { id: 1, title: "EMA Crossover Strategy", description: "Automated entry/exit based on 9 and 21 EMA crossovers.", tags: ["Beginner", "Trend"] },
    { id: 2, title: "Supertrend + RSI Combo", description: "Filter Supertrend signals using RSI oversold/overbought conditions.", tags: ["Intermediate", "Momentum"] },
    { id: 3, title: "Dhan API Webhook Template", description: "Ready-to-deploy JSON payload template for Dhan Webhooks.", tags: ["Advanced", "Execution"] },
  ];

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <div className="mb-8 flex items-center gap-3">
        <svg className="h-8 w-8 text-teal-500" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">
          Pine Scripts Library
        </h1>
      </div>
      <div className="grid gap-6">
        {scripts.map(script => (
          <div key={script.id} className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-2xl border-4 border-slate-900 dark:border-slate-500 bg-white dark:bg-slate-800 p-6 shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-none transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#1e293b]">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{script.title}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{script.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {script.tags.map(tag => (
                  <span key={tag} className="rounded-full border-2 border-slate-900 dark:border-slate-500 bg-teal-100 dark:bg-teal-900/30 px-3 py-1 text-xs font-bold text-teal-800 dark:text-teal-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button className="mt-4 md:mt-0 rounded-xl border-4 border-slate-900 dark:border-slate-500 bg-teal-500 px-6 py-2 font-bold text-white shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              Copy Code
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
