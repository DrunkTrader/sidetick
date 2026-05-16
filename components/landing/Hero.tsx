"use client";

import Image from "next/image";

const stats = [
  "1000+ Happy Students",
  "4.9 Star Rating on Youtube",
  "500+ Automation Scripts",
  "24/7 Support"
];

export function Hero(): React.JSX.Element {
  return (
    <section id="hero" className="relative overflow-hidden bg-white px-4 pb-20 pt-16 md:px-6 md:pt-24">
      {/* Playful Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-purple-100/50 blur-3xl" />
        <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-green-100/40 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="relative z-10 animate-fade-in-up">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide">
            TradingView Automation • Pine Script • Dhan API
          </p>
          
          <h1 className="mt-6 font-[var(--font-display)] text-5xl font-black leading-tight text-slate-800 md:text-7xl">
            Mini Quant
          </h1>
          
          <p className="mt-5 max-w-xl text-lg font-medium text-slate-600 md:text-xl">
            Learn to automate your trading workflows using Pine Script and Dhan API.
          </p>

          <div className="mt-10 rounded-2xl border-2 border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/40">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-teal)] text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{stat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/login"
              className="rounded-full bg-red-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-red-500/30 transition hover:-translate-y-1 hover:bg-red-600"
            >
              Enroll Now
            </a>
            <a
              href="#curriculum"
              className="rounded-full border-2 border-slate-200 bg-transparent px-8 py-4 text-lg font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              View Curriculum
            </a>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2">
            <svg className="h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-bold text-slate-500 tracking-wide">
              11 Modules • 22 Hours • Automation Scripts Included
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full animate-fade-in">
          <div className="relative aspect-square w-full max-w-lg mx-auto">
            <Image 
              src="/sidetick_hero.png" 
              alt="Stylized trading terminal with robot hand" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
