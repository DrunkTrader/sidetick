const testimonials = [
  {
    name: "Rohit M.",
    role: "Intraday Trader · Pune",
    result: "Built my first Pine strategy and automated execution in 2 weeks.",
    rating: "5.0 out of 5",
  },
  {
    name: "Neha S.",
    role: "Options Trader · Bengaluru",
    result: "No coding background, but now I run alert-to-order automation daily.",
    rating: "5.0 out of 5",
  },
  {
    name: "Arjun K.",
    role: "Part-time Trader · Mumbai",
    result: "The Dhan API modules removed all guesswork from deployment.",
    rating: "5.0 out of 5",
  },
  {
    name: "Vikram P.",
    role: "Swing Trader · Delhi",
    result: "The templates alone saved me months of trial and error.",
    rating: "5.0 out of 5",
  },
];

export function Testimonials(): React.JSX.Element {
  return (
    <section id="testimonials" className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[var(--font-display)] text-3xl md:text-5xl">Student Results & Testimonials</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-5"
            >
              <p className="text-sm text-[var(--color-teal)]">{item.rating}</p>
              <p className="mt-2 text-sm text-[var(--color-text-primary)]">{item.result}</p>
              <div className="mt-4 rounded-xl bg-[rgba(37,211,102,0.12)] p-3 text-xs text-[var(--color-text-muted)]">
                WhatsApp-style proof card
              </div>
              <p className="mt-4 text-sm font-semibold text-[var(--color-text-primary)]">{item.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
