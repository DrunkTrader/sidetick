const features = [
  { title: "Live Trading Sessions", description: "Weekly execution clinics with real market scenarios." },
  { title: "Real Market Data", description: "Decision frameworks built on real order flow behavior." },
  { title: "Portfolio Projects", description: "Ship verifiable strategy systems for your track record." },
  { title: "Community Access", description: "Private, signal-free community focused on process quality." },
  { title: "Trading Bots", description: "Automate strategy execution with robust fail-safe logic." },
  { title: "Certifications", description: "Outcome-focused assessments and completion credentials." },
];

export function Features(): React.JSX.Element {
  return (
    <section id="features" className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[var(--font-display)] text-3xl md:text-5xl">Premium learning infrastructure</h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-text-muted)] md:text-base">
          Built like a fintech product: modular, measurable, and execution-focused.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(10,22,40,0.58)] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-[rgba(0,200,150,0.28)]"
            >
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

