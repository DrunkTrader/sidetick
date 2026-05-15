"use client";

import { useEffect, useState } from "react";
import { Curriculum } from "@/components/landing/Curriculum";
import { FAQ } from "@/components/landing/FAQ";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

const priceLabel = "₹4,999";
const originalPriceLabel = "₹9,999";

const problemPoints = [
  "Manually watching charts for hours",
  "Strategies look good on paper but fail in execution",
  "Paying for alerts you don't understand",
];

const featureCards = [
  {
    label: "Scripts",
    title: "Ready-to-Deploy Scripts",
    description: "Get Pine Script templates + webhook handlers usable from Day 1",
  },
  {
    label: "API",
    title: "Dhan API Mastery",
    description: "Full coverage of Dhan's order API — market, limit, and SL orders",
  },
  {
    label: "Responsive",
    title: "Mobile Responsive",
    description: "Watch lessons on phone, tablet, or desktop",
  },
  {
    label: "Updates",
    title: "Lifetime Updates",
    description: "Course updated as TradingView and Dhan API evolve",
  },
];

const socialStats = {
  followers: "40,000+ followers",
  community: "5,000+ community members",
  featured: "Featured content across Instagram, YouTube & Telegram",
};

export default function LandingPage(): React.JSX.Element {
  const [studentCount, setStudentCount] = useState(0);
  const [showMobileEnrollBar, setShowMobileEnrollBar] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isDiscountCaptured, setIsDiscountCaptured] = useState(false);

  useEffect(() => {
    const target = 1247;
    let current = 0;
    const step = 17;
    const interval = window.setInterval(() => {
      current = Math.min(current + step, target);
      setStudentCount(current);
      if (current >= target) {
        window.clearInterval(interval);
      }
    }, 24);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = (): void => {
      const heroSection = document.getElementById("hero");
      if (!heroSection) {
        return;
      }

      const rect = heroSection.getBoundingClientRect();
      setShowMobileEnrollBar(rect.bottom < 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouseOut = (event: MouseEvent): void => {
      if (showExitModal || isDiscountCaptured) {
        return;
      }

      if (event.clientY <= 0) {
        setShowExitModal(true);
      }
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, [showExitModal, isDiscountCaptured]);

  const onDiscountCapture = (): void => {
    if (!email.trim()) {
      return;
    }
    setIsDiscountCaptured(true);
  };

  return (
    <div className="landing-light min-h-screen bg-[var(--color-navy)] text-[var(--color-text-primary)]">
      <Navbar />
      <Hero priceLabel={priceLabel} />

      <section id="about" className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl">Are you stuck in this loop?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {problemPoints.map((point) => (
              <article
                key={point}
                className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-5"
              >
                <p className="text-sm text-[var(--color-text-muted)]">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-4 md:px-6">
        <div className="mx-auto rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--color-navy-mid)] p-5 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            {socialStats.followers} | {socialStats.community} | {socialStats.featured}
          </p>
          <p className="mt-2 font-[var(--font-display)] text-3xl text-[var(--color-teal)]">
            {studentCount.toLocaleString()}+ students
          </p>
        </div>
      </section>

      <Curriculum />

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl">Mini Quant Feature Highlights</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-5"
              >
                <p className="inline-flex rounded-full border border-[rgba(0,200,150,0.24)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">
                  {card.label}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-7 md:grid-cols-2">
          <div className="rounded-2xl bg-[var(--color-navy)] p-10 text-center text-[var(--color-text-muted)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-teal)]">Founder-led</p>
            <p className="mt-4 font-[var(--font-display)] text-3xl text-[var(--color-text-primary)]">Practical trading automation training</p>
            <p className="mt-4 text-sm">Built around scripts, webhooks, broker APIs, and deployment checklists used in real workflows.</p>
          </div>
          <div>
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl">Built by Sidetick Founder</h2>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              Learn from a trader-educator focused on practical execution for Indian markets, not just
              theory.
            </p>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              40,000+ Instagram followers · 5,000+ warm community members
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              As seen on: Instagram Reels, YouTube explainers, and live community sessions
            </p>
          </div>
        </div>
      </section>

      <Testimonials />
      <Pricing priceLabel={priceLabel} originalPriceLabel={originalPriceLabel} />
      <FAQ />
      <Footer />

      {showMobileEnrollBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[rgba(0,200,150,0.18)] bg-[var(--color-navy)] p-3 md:hidden">
          <a
            href="#pricing"
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--gradient-cta)] px-5 py-3 text-sm font-bold text-[var(--color-text-dark)]"
          >
            Enroll Now — {priceLabel}
          </a>
        </div>
      )}

      <a
        href="https://wa.me/919999999999"
        className="fixed bottom-20 right-4 z-40 inline-flex rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg md:bottom-6"
        aria-label="Chat on WhatsApp"
      >
        Chat
      </a>

      {showExitModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl border border-[rgba(0,200,150,0.2)] bg-[var(--color-navy-mid)] p-6">
            <h3 className="font-[var(--font-display)] text-2xl">Wait — get 10% off</h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Drop your email and unlock your discount code instantly.
            </p>
            {!isDiscountCaptured ? (
              <div className="mt-5 space-y-3">
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-[rgba(0,200,150,0.2)] bg-transparent px-4 py-2 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={onDiscountCapture}
                  className="w-full rounded-full bg-[var(--gradient-cta)] px-5 py-2 text-sm font-bold text-[var(--color-text-dark)]"
                >
                  Get 10% Discount
                </button>
              </div>
            ) : (
              <p className="mt-4 rounded-xl bg-[rgba(0,200,150,0.12)] p-3 text-sm text-[var(--color-teal-light)]">
                Coupon captured. Check your inbox for your discount code.
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowExitModal(false)}
              className="mt-4 w-full rounded-full border border-[rgba(0,200,150,0.2)] px-5 py-2 text-sm text-[var(--color-text-primary)]"
            >
              Continue browsing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
