type PricingProps = {
  priceLabel: string;
  originalPriceLabel: string;
};

export function Pricing({ priceLabel, originalPriceLabel }: PricingProps): React.JSX.Element {
  return (
    <section id="pricing" className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-[var(--font-display)] text-3xl md:text-5xl">Choose your trading track</h2>
        <p className="mt-3 text-center text-sm text-[var(--color-text-muted)]">
          Clean pricing, premium execution, no distraction.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(10,22,40,0.58)] p-6">
            <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Starter</p>
            <p className="mt-3 font-[var(--font-display)] text-3xl">₹2,499</p>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Core strategy foundations and beginner quant workflow.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex rounded-full border border-[rgba(255,255,255,0.2)] px-5 py-2 text-sm"
            >
              Get Starter
            </a>
          </article>

          <article className="relative rounded-3xl border border-[rgba(0,200,150,0.35)] bg-[rgba(10,22,40,0.72)] p-6 shadow-[0_0_30px_rgba(0,200,150,0.16)]">
            <p className="absolute -top-3 right-5 rounded-full border border-[rgba(0,200,150,0.35)] bg-[rgba(10,22,40,0.95)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--color-teal-light)]">
              Most Popular
            </p>
            <p className="text-xs uppercase tracking-wider text-[var(--color-teal)]">Pro</p>
            <p className="mt-3 font-[var(--font-display)] text-4xl">{priceLabel}</p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              <span className="line-through">{originalPriceLabel}</span> · Limited cohort pricing
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>22 hours · 11 modules</li>
              <li>Live sessions + portfolio projects</li>
              <li>Trading bots and strategy labs</li>
              <li>Lifetime updates + private community</li>
            </ul>
            <a
              href="#"
              className="mt-6 inline-flex rounded-full bg-[var(--gradient-cta)] px-6 py-2 text-sm font-bold text-[var(--color-text-dark)]"
            >
              Start Learning
            </a>
          </article>

          <article className="rounded-3xl border border-[rgba(255,184,0,0.25)] bg-[rgba(10,22,40,0.58)] p-6">
            <p className="text-xs uppercase tracking-wider text-[var(--color-warning)]">Elite</p>
            <p className="mt-3 font-[var(--font-display)] text-3xl">₹12,999</p>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Mentored execution, review calls, and institutional strategy clinic.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex rounded-full border border-[rgba(255,184,0,0.4)] px-5 py-2 text-sm"
            >
              Talk to Advisor
            </a>
          </article>
        </div>

        <div className="mt-6 text-center text-xs text-[var(--color-text-muted)]">
          7-day money-back guarantee · UPI · Cards · Net Banking · EMI
          <p className="mt-1 text-[var(--color-warning)]">Only 37 seats available at this price.</p>
        </div>
      </div>
    </section>
  );
}
