type HeroProps = {
  priceLabel: string;
};

export function Hero({ priceLabel }: HeroProps): React.JSX.Element {
  return (
    <section id="hero" className="bg-[var(--gradient-hero)] px-4 pb-16 pt-16 md:px-6 md:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-[var(--font-display)] text-4xl leading-tight md:text-6xl">
            Automate Your Trading. Stop Guessing. Start Earning.
          </h1>
          <p className="mt-5 max-w-xl text-base text-[var(--color-text-muted)] md:text-lg">
            Learn Pine Script, TradingView Alerts &amp; Dhan API Integration in 22 hours — with real
            scripts you can deploy from Day 1.
          </p>
          <div className="mt-7">
            <a
              href="#pricing"
              className="inline-flex rounded-full bg-[var(--gradient-cta)] px-7 py-3 text-base font-bold text-[var(--color-text-dark)] shadow-[0_0_36px_rgba(0,200,150,0.2)]"
            >
              Enroll in Mini Quant — {priceLabel}
            </a>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Lifetime Access | 40K+ Community | 4.9/5 Rating
          </p>
        </div>

        <div className="rounded-3xl border border-[rgba(0,200,150,0.15)] bg-[var(--gradient-card)] p-6 shadow-[0_6px_30px_rgba(0,0,0,0.35)]">
          <div className="rounded-xl bg-[var(--color-navy)] p-4 text-xs text-[var(--color-teal)]">
            <p className="font-[var(--font-mono)]">{'strategy("Mini Quant", overlay=true)'}</p>
            <p className="mt-2 font-[var(--font-mono)] text-[var(--color-blue-light)]">
              {'alertcondition(longEntry, "BUY", "Webhook Buy Trigger")'}
            </p>
            <p className="mt-2 font-[var(--font-mono)] text-[var(--color-teal-light)]">
              {'alertcondition(shortEntry, "SELL", "Webhook Sell Trigger")'}
            </p>
          </div>
          <div className="mt-5 grid grid-cols-8 gap-2">
            {[22, 36, 18, 44, 55, 34, 60, 48].map((height, index) => (
              <div
                key={height}
                className="rounded-full bg-[var(--gradient-teal)]"
                style={{
                  height: `${height + (index % 2 === 0 ? 0 : 14)}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
