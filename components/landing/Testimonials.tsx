"use client";

import { motion } from "framer-motion";

const logos = ["NSE", "BSE", "ZERODHA", "DHAN", "TRADINGVIEW", "UPSTOX"];

const testimonials = [
  {
    name: "Rohit M.",
    role: "Intraday Trader · Pune",
    result: "Moved from impulse trades to rules-based execution in under 30 days.",
  },
  {
    name: "Neha S.",
    role: "Options Trader · Bengaluru",
    result: "My strategy deployment pipeline is now automated and measurable.",
  },
  {
    name: "Arjun K.",
    role: "Part-time Trader · Mumbai",
    result: "Risk framework alone improved consistency more than years of trial and error.",
  },
];

const performanceCards = [
  { label: "Avg. Weekly Lab Sessions", value: "4" },
  { label: "Backtesting Exercises", value: "120+" },
  { label: "Community Retention", value: "89%" },
];

export function Testimonials(): React.JSX.Element {
  return (
    <section id="testimonials" className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[var(--font-display)] text-3xl md:text-5xl">Built for traders who value process over hype</h2>

        <div className="mt-8 grid gap-4 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(15,32,64,0.5)] p-5 md:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,22,40,0.65)] px-3 py-4 text-center text-xs tracking-[0.16em] text-[var(--color-text-muted)]"
            >
              {logo}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(10,22,40,0.6)] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-[rgba(0,200,150,0.28)]"
            >
              <p className="text-sm text-[var(--color-teal)]">★★★★★</p>
              <p className="mt-3 text-sm text-[var(--color-text-primary)]">{item.result}</p>
              <p className="mt-5 text-sm font-semibold text-[var(--color-text-primary)]">{item.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{item.role}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {performanceCards.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(10,22,40,0.58)] p-5 transition hover:border-[rgba(26,107,255,0.3)]"
            >
              <p className="text-xs text-[var(--color-text-muted)]">{item.label}</p>
              <p className="mt-2 font-[var(--font-display)] text-3xl text-[var(--color-warning)]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
