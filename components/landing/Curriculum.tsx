"use client";

import { useState } from "react";

const curriculumModules: Array<{ title: string; lessons: string[] }> = [
  {
    title: "1. Introduction to Systematic Trading",
    lessons: ["Why discretionary trading fails", "Automation mindset", "Setup and prerequisites"],
  },
  {
    title: "2. Pine Script Fundamentals",
    lessons: ["Language basics", "Inputs and variables", "Indicators in Pine"],
  },
  {
    title: "3. Strategy Coding in Pine Script",
    lessons: ["Entry/exit logic", "Risk controls", "Re-usable strategy templates"],
  },
  {
    title: "4. TradingView Alerts Setup",
    lessons: ["Alert architecture", "Webhook payloads", "Testing alert reliability"],
  },
  {
    title: "5. Dhan API Overview & Authentication",
    lessons: ["API keys and auth", "Token handling", "Rate limits"],
  },
  {
    title: "6. Connecting Alerts to Dhan API",
    lessons: ["Mapping signals to orders", "Market and limit orders", "Error-safe execution"],
  },
  {
    title: "7. Webhook Automation Architecture",
    lessons: ["Server flow design", "Validation", "Retry strategy"],
  },
  {
    title: "8. Risk Management Automation",
    lessons: ["Position sizing rules", "Stop-loss logic", "Capital protection workflow"],
  },
  {
    title: "9. Backtesting & Strategy Validation",
    lessons: ["Backtest essentials", "Avoiding overfitting", "Reading performance metrics"],
  },
  {
    title: "10. Deployment & Live Trading Setup",
    lessons: ["Production deployment", "Monitoring", "Live safeguards"],
  },
  {
    title: "11. Scripts Library & Templates",
    lessons: ["Template walkthrough", "Customization workflow", "Versioning strategy"],
  },
];

export function Curriculum(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="curriculum" className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[var(--font-display)] text-3xl md:text-5xl">What You&apos;ll Learn</h2>
        <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
          22 hours of content · 11 modules · 60+ lessons · Lifetime access
        </p>

        <div className="mt-8 space-y-3">
          {curriculumModules.map((module, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={module.title}
                className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-[var(--color-text-primary)] md:text-base">
                    {module.title}
                  </span>
                  <span className="text-[var(--color-teal)]">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="border-t border-[rgba(0,200,150,0.12)] px-5 py-4">
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
