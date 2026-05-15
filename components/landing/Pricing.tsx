type PricingProps = {
  priceLabel: string;
  originalPriceLabel: string;
};

export function Pricing({ priceLabel, originalPriceLabel }: PricingProps): React.JSX.Element {
  return (
    <section id="pricing" className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-[rgba(0,200,150,0.18)] bg-[var(--gradient-card)] p-8 text-center shadow-[0_0_40px_rgba(0,200,150,0.12)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">Mini Quant</p>
          <h2 className="mt-2 font-[var(--font-display)] text-4xl md:text-5xl">{priceLabel}</h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            <span className="line-through">{originalPriceLabel}</span> — limited-time offer
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--color-warning)]">
            Only 37 seats available at this price
          </p>

          <div className="mt-6 text-sm text-[var(--color-text-muted)]">
            22 hours · 11 modules · Scripts library · Lifetime access · Community access
          </div>

          <a
            href="#"
            className="mt-7 inline-flex rounded-full bg-[var(--gradient-cta)] px-8 py-3 text-base font-bold text-[var(--color-text-dark)]"
          >
            🔥 Enroll Now — {priceLabel}
          </a>

          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            7-day money-back guarantee. No questions asked.
          </p>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            Payment options: UPI · Cards · Net Banking · EMI available
          </p>
        </div>
      </div>
    </section>
  );
}
