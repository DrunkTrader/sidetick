"use client";

import { useState } from "react";

const faqItems: Array<{ question: string; answer: string }> = [
  {
    question: "Do I need prior coding experience?",
    answer: "No. The course starts from fundamentals and includes templates for faster implementation.",
  },
  {
    question: "How do I access the course after payment?",
    answer: "Access is provisioned after payment confirmation and delivered through your Sidetick login.",
  },
  {
    question: "What broker do I need?",
    answer: "Mini Quant is built around Dhan API workflows.",
  },
  {
    question: "Is the course updated regularly?",
    answer: "Yes. You get lifetime updates as TradingView and Dhan APIs evolve.",
  },
  {
    question: "Can I pay in EMI?",
    answer: "Yes. EMI is available through Razorpay supported options.",
  },
  {
    question: "How long do I have access?",
    answer: "You get lifetime access to all purchased modules and updates.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes. There is a 7-day money-back guarantee.",
  },
];

export function FAQ(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faqs" className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-[var(--font-display)] text-3xl md:text-5xl">Frequently asked by serious traders</h2>
        <div className="mt-8 space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(10,22,40,0.58)] backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-[var(--color-text-primary)] md:text-base">
                    {item.question}
                  </span>
                  <span className="text-[var(--color-teal)]">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <p className="border-t border-[rgba(255,255,255,0.1)] px-5 py-4 text-sm text-[var(--color-text-muted)]">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
