"use client";

import { motion } from "framer-motion";

export function Instructor(): React.JSX.Element {
  return (
    <section id="instructor" className="px-4 py-20 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(10,22,40,0.62)] p-6 backdrop-blur-xl md:grid-cols-[1.1fr_1fr] md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative min-h-80 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[radial-gradient(circle_at_30%_20%,rgba(0,200,150,0.22),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(26,107,255,0.2),transparent_50%),#0b1528]"
        >
          <div className="absolute inset-0 grid place-items-center text-center">
            <p className="rounded-full border border-[rgba(255,255,255,0.15)] bg-black/30 px-3 py-1 text-xs text-[var(--color-text-muted)]">
              Instructor Profile
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl">Learn from practitioners, not theorists</h2>
          <p className="mt-4 text-sm text-[var(--color-text-muted)] md:text-base">
            Built and taught by full-time market operators focused on risk-adjusted execution, systematic strategy design, and real deployment constraints.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Students Mentored", value: "10K+" },
              { label: "Live Sessions", value: "400+" },
              { label: "Playbooks", value: "75+" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(10,22,40,0.6)] p-4"
              >
                <p className="text-xs text-[var(--color-text-muted)]">{item.label}</p>
                <p className="mt-2 font-[var(--font-display)] text-2xl text-[var(--color-teal-light)]">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

