"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-navy)] text-[var(--color-text-primary)]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="font-[var(--font-display)] text-xl font-bold text-[var(--color-text-dark)]">
              Sidetick
            </Link>
            <nav className="hidden gap-6 text-sm font-medium text-[var(--color-text-muted)] md:flex">
              <Link href="/dashboard" className="transition hover:text-[var(--color-teal)]">
                Home
              </Link>
              <Link href="/dashboard" className="transition hover:text-[var(--color-teal)]">
                Resources
              </Link>
              <Link href="/dashboard" className="transition hover:text-[var(--color-teal)]">
                Courses
              </Link>
            </nav>
          </div>
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsBurgerOpen((prev) => !prev)}
              className="flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-2 text-[var(--color-text-dark)] transition hover:bg-slate-100"
              aria-label="Toggle user menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {isBurgerOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <div className="flex flex-col py-1 text-sm text-[var(--color-text-dark)]">
                  <Link
                    href="/dashboard/purchases"
                    className="px-4 py-2 hover:bg-slate-50 hover:text-[var(--color-teal)]"
                    onClick={() => setIsBurgerOpen(false)}
                  >
                    Purchases
                  </Link>
                  <Link
                    href="/dashboard/account"
                    className="px-4 py-2 hover:bg-slate-50 hover:text-[var(--color-teal)]"
                    onClick={() => setIsBurgerOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="my-1 border-slate-100" />
                  <a
                    href="/api/auth/logout"
                    className="px-4 py-2 text-red-600 hover:bg-slate-50"
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">{children}</div>
    </div>
  );
}
