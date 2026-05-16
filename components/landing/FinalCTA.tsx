export function FinalCTA(): React.JSX.Element {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[radial-gradient(circle_at_20%_20%,rgba(0,200,150,0.18),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(26,107,255,0.2),transparent_55%),rgba(10,22,40,0.75)] p-8 text-center md:p-10">
        <p className="font-[var(--font-display)] text-3xl md:text-5xl">Stop guessing. Trade with structure.</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--color-text-muted)] md:text-base">
          Join a focused trading education platform engineered for consistency, risk control, and long-term edge.
        </p>
        <a
          href="#pricing"
          className="mt-7 inline-flex rounded-full bg-[var(--gradient-cta)] px-8 py-3 text-base font-bold text-[var(--color-text-dark)] shadow-[0_0_40px_rgba(0,200,150,0.28)] transition hover:scale-[1.03]"
        >
          Start Learning
        </a>
      </div>
    </section>
  );
}

