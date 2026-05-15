"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FreebieCard } from "@/components/freebies/FreebieCard";
import { PhoneCaptureModal } from "@/components/freebies/PhoneCaptureModal";

type FreebieItem = {
  id: string;
  category: string;
  icon: string;
  title: string;
  description: string;
  format: string;
};

const freebies: FreebieItem[] = [
  {
    id: "ema-crossover-template",
    category: "Pine Script",
    icon: "📈",
    title: "EMA Crossover Strategy — Pine Script Template",
    description: "Ready-to-use TradingView strategy template for quick deployment.",
    format: ".pine",
  },
  {
    id: "dhan-api-quickstart",
    category: "Guide",
    icon: "📘",
    title: "Dhan API Quickstart Guide",
    description: "Step-by-step API setup guide built for complete beginners.",
    format: "PDF",
  },
  {
    id: "supertrend-rsi-combo",
    category: "Pine Script",
    icon: "⚙️",
    title: "Supertrend + RSI Combo Strategy",
    description: "Trend-following automation script with clear entry/exit logic.",
    format: ".pine",
  },
  {
    id: "webhook-checklist",
    category: "Checklist",
    icon: "✅",
    title: "TradingView Webhook Setup Checklist",
    description: "10-step checklist to configure webhooks reliably.",
    format: "PDF",
  },
  {
    id: "risk-management-sheet",
    category: "Risk Management",
    icon: "🧮",
    title: "Risk Management Formula Sheet",
    description: "Position sizing and stop-loss calculator formulas in one sheet.",
    format: "PDF",
  },
  {
    id: "pine-functions-cheatsheet",
    category: "Reference",
    icon: "🧠",
    title: "Top 10 Pine Script Functions Cheatsheet",
    description: "Fast reference sheet for the most-used Pine functions.",
    format: "PDF",
  },
];

const UNLOCK_STORAGE_KEY = "sidetick_freebies_unlocked";

export default function FreebiesPage(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [downloadMessage, setDownloadMessage] = useState("");

  useEffect(() => {
    const unlockedFromStorage = window.localStorage.getItem(UNLOCK_STORAGE_KEY) === "true";
    setIsUnlocked(unlockedFromStorage);
  }, []);

  const freebieCards = useMemo(() => freebies, []);

  const onVerified = (phone: string): void => {
    setVerifiedPhone(phone);
    setIsUnlocked(true);
    window.localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
    setDownloadMessage("All freebies unlocked for this session.");
  };

  const onDownload = (item: FreebieItem): void => {
    setDownloadMessage(`Download ready: ${item.title}`);
  };

  return (
    <div className="min-h-screen bg-[var(--color-offwhite)] text-[var(--color-text-dark)]">
      <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <section>
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl">Free Resources for Traders</h1>
          <p className="mt-4 max-w-3xl text-base text-slate-600 md:text-lg">
            Pine Script templates, strategy guides &amp; automation tools — 100% free. Enter your
            WhatsApp number to unlock instant access.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-6 rounded-full bg-[var(--gradient-cta)] px-6 py-3 text-sm font-bold text-[var(--color-navy)]"
          >
            📲 Unlock Free Access
          </button>
          {verifiedPhone ? (
            <p className="mt-3 text-sm text-slate-600">Verified WhatsApp: {verifiedPhone}</p>
          ) : null}
        </section>

        <section className="mt-12">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {freebieCards.map((item) => (
              <FreebieCard
                key={item.id}
                category={item.category}
                icon={item.icon}
                title={item.title}
                description={item.description}
                format={item.format}
                isUnlocked={isUnlocked}
                onUnlockClick={() => setIsModalOpen(true)}
                onDownloadClick={() => onDownload(item)}
              />
            ))}
          </div>
          {downloadMessage ? <p className="mt-5 text-sm text-slate-600">{downloadMessage}</p> : null}
        </section>

        <section className="mt-14 rounded-2xl border border-[rgba(0,200,150,0.16)] bg-white p-6 text-center">
          <p className="text-sm text-slate-600">
            Want the full 22-hour course with 11 modules and live scripts?
          </p>
          <Link
            href="/#pricing"
            className="mt-4 inline-flex rounded-full bg-[var(--gradient-cta)] px-6 py-3 text-sm font-bold text-[var(--color-navy)]"
          >
            🔥 Join Mini Quant →
          </Link>
        </section>
      </main>

      <PhoneCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerified={onVerified}
      />
    </div>
  );
}
