"use client";

import { useState } from "react";

const curriculumModules: Array<{ title: string; icon: string; lessons: string[] }> = [
  {
    title: "1. Introduction to Systematic Trading",
    icon: "⚙️",
    lessons: ["Why discretionary trading fails", "Automation mindset", "Setup and prerequisites"],
  },
  {
    title: "2. Pine Script Fundamentals",
    icon: "📈",
    lessons: ["Language basics", "Inputs and variables", "Indicators in Pine"],
  },
  {
    title: "3. Strategy Coding in Pine Script",
    icon: "🧠",
    lessons: ["Entry/exit logic", "Risk controls", "Re-usable strategy templates"],
  },
  {
    title: "4. TradingView Alerts Setup",
    icon: "🔔",
    lessons: ["Alert architecture", "Webhook payloads", "Testing alert reliability"],
  },
  {
    title: "5. Dhan API Overview & Authentication",
    icon: "🐍",
    lessons: ["API keys and auth", "Token handling", "Rate limits"],
  },
  {
    title: "6. Connecting Alerts to Dhan API",
    icon: "🤖",
    lessons: ["Mapping signals to orders", "Market and limit orders", "Error-safe execution"],
  },
  {
    title: "7. Webhook Automation Architecture",
    icon: "📊",
    lessons: ["Server flow design", "Validation", "Retry strategy"],
  },
  {
    title: "8. Risk Management Automation",
    icon: "🛡️",
    lessons: ["Position sizing rules", "Stop-loss logic", "Capital protection workflow"],
  },
  {
    title: "9. Backtesting & Strategy Validation",
    icon: "🧪",
    lessons: ["Backtest essentials", "Avoiding overfitting", "Reading performance metrics"],
  },
  {
    title: "10. Deployment & Live Trading Setup",
    icon: "🚀",
    lessons: ["Production deployment", "Monitoring", "Live safeguards"],
  },
  {
    title: "11. Scripts Library & Templates",
    icon: "🗂️",
    lessons: ["Template walkthrough", "Customization workflow", "Versioning strategy"],
  },
];

const specialTrackIcons = [
  { label: "Quant", icon: "∑" },
  { label: "Options", icon: "Δ" },
  { label: "Risk", icon: "R" },
  { label: "Python", icon: "Py" },
  { label: "Backtesting", icon: "BT" },
  { label: "AI Trading", icon: "AI" },
];

export function Curriculum(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="curriculum" className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[var(--font-display)] text-3xl md:text-5xl">What You&apos;ll Learn</h2>
        <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
          22 hours of content · 11 modules · 60+ lessons · Lifetime access
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-6">
          {specialTrackIcons.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(10,22,40,0.58)] px-3 py-3 text-center"
            >
              <p className="font-[var(--font-mono)] text-xs text-[var(--color-teal-light)]">{item.icon}</p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {curriculumModules.map((module, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={module.title}
                className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(10,22,40,0.6)] backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold text-[var(--color-text-primary)] md:text-base">
                    <span className="text-lg">{module.icon}</span>
                    {module.title}
                  </span>
                  <span className="text-[var(--color-teal)]">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="border-t border-[rgba(255,255,255,0.1)] px-5 py-4">
                    <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                      {module.lessons.map((lesson) => (
                        <li key={lesson}>• {lesson}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
