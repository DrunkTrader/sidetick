"use client";

import { useEffect, useState } from "react";

const navItems: Array<{ label: string; href: string }> = [
  { label: "Home", href: "/" },
  { label: "Resources", href: "/freebies" },
  { label: "Courses", href: "/dashboard" },
];

function isMarketOpen(): boolean {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istTime = new Date(utc + 3600000 * 5.5);

  const day = istTime.getDay();
  if (day === 0 || day === 6) return false;

  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();

  const timeInMinutes = hours * 60 + minutes;
  const startMinutes = 9 * 60 + 15;
  const endMinutes = 15 * 60 + 30;

  return timeInMinutes >= startMinutes && timeInMinutes <= endMinutes;
}

export function Navbar(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkMarket = () => setMarketOpen(isMarketOpen());
    checkMarket();
    const interval = setInterval(checkMarket, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        isScrolled
          ? "border-slate-200 bg-[var(--color-navy)]/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a href="#" className="flex items-center gap-2 font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-primary)]">
          Sidetick
          <span
            className={`h-2.5 w-2.5 rounded-full ${marketOpen ? "bg-red-500 animate-pulse" : "bg-slate-800"}`}
            title={marketOpen ? "Indian Market Open" : "Indian Market Closed"}
          />
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
            href="/login"
            className="hidden rounded-full border border-slate-200 bg-white/80 px-6 py-2 text-sm font-bold text-[var(--color-text-dark)] shadow-sm transition hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] md:inline-flex"
          >
            Login
          </a>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="inline-flex rounded-full border border-slate-200 px-3 py-2 text-xs text-[var(--color-text-primary)] md:hidden"
            aria-label="Toggle navigation menu"
          >
            Menu
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-[var(--color-navy-mid)] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-[var(--color-text-dark)] hover:text-[var(--color-teal)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-[var(--color-text-dark)] shadow-sm"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
