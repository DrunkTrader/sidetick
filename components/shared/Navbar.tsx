"use client";

import { useEffect, useState } from "react";

const navItems: Array<{ label: string; href: string }> = [
  { label: "About", href: "#about" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQs", href: "#faqs" },
];

export function Navbar(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        isScrolled
          ? "border-[rgba(0,200,150,0.18)] bg-[var(--color-navy)]/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a href="#" className="font-[var(--font-display)] text-2xl text-[var(--color-text-primary)]">
          Sidetick
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-teal)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="hidden rounded-full bg-[var(--gradient-cta)] px-5 py-2 text-sm font-bold text-[var(--color-text-dark)] shadow-[0_0_30px_rgba(0,200,150,0.15)] md:inline-flex"
          >
            Enroll Now →
          </a>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="inline-flex rounded-full border border-[rgba(0,200,150,0.25)] px-3 py-2 text-xs text-[var(--color-text-primary)] md:hidden"
            aria-label="Toggle navigation menu"
          >
            Menu
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-[rgba(0,200,150,0.18)] bg-[var(--color-navy-mid)] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-[var(--color-text-primary)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex w-fit rounded-full bg-[var(--gradient-cta)] px-5 py-2 text-sm font-bold text-[var(--color-text-dark)]"
            >
              Enroll Now →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
