"use client";

import { motion } from "framer-motion";

export function Outcomes(): React.JSX.Element {
  return (
    <section id="outcomes" className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[var(--font-display)] text-3xl md:text-5xl">Outcomes you can track</h2>
        <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
          Portfolio growth, risk discipline, and strategy repeatability.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(10,22,40,0.62)] p-5"
          >
            <p className="text-xs text-[var(--color-text-muted)]">Portfolio Analytics</p>
            <div className="mt-5 flex items-end gap-2">
              {[32, 26, 38, 44, 40, 52, 58, 55, 64, 72, 69, 80].map((height, index) => (
                <div
                  key={`${height}-${index}`}
                  className="w-full rounded-sm bg-gradient-to-t from-[var(--color-blue)] via-[var(--color-teal)] to-[var(--color-teal-light)] opacity-85"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4">
            {[
              { label: "Avg. Strategy Win Rate", value: "63%" },
              { label: "Max Drawdown Discipline", value: "-6.8%" },
              { label: "Execution Consistency", value: "91%" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(10,22,40,0.58)] p-5"
              >
                <p className="text-xs text-[var(--color-text-muted)]">{item.label}</p>
                <p className="mt-2 font-[var(--font-display)] text-3xl text-[var(--color-teal-light)]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

