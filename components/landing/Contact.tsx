"use client";


export function Contact(): React.JSX.Element {
  return (
    <section className="bg-slate-50 px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 md:p-12">
          <div className="text-center">
            <h2 className="font-[var(--font-display)] text-3xl font-black text-slate-800 md:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-3 text-lg font-medium text-slate-600">
              Have questions? Leave your details and we will reach out.
            </p>
          </div>

          <form className="mt-10 grid gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[var(--color-teal)] focus:bg-white"
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="mobile" className="text-sm font-bold text-slate-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  className="rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[var(--color-teal)] focus:bg-white"
                  placeholder="+91"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[var(--color-teal)] focus:bg-white"
                placeholder="you@example.com"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-bold text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="resize-none rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[var(--color-teal)] focus:bg-white"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              className="mt-4 rounded-xl bg-[var(--color-teal)] px-8 py-4 text-lg font-black text-white shadow-lg shadow-[var(--color-teal)]/30 transition hover:-translate-y-1 hover:bg-[var(--color-teal-dark)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
