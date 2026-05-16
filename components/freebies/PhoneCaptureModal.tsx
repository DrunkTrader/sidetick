"use client";

import { useMemo, useState } from "react";

type PhoneCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onVerified: (phone: string) => void;
};

export function PhoneCaptureModal({
  isOpen,
  onClose,
  onVerified,
}: PhoneCaptureModalProps): React.JSX.Element | null {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const normalizedPhone = useMemo(() => {
    const onlyDigits = phone.replace(/\D/g, "");
    if (onlyDigits.startsWith("91")) {
      return `+${onlyDigits}`;
    }
    return `+91${onlyDigits}`;
  }, [phone]);

  const onSendOtp = async (): Promise<void> => {
    if (normalizedPhone.length < 13) {
      setStatusMessage("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");
    try {
      const response = await fetch("/api/freebies/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalizedPhone }),
      });

      if (!response.ok) {
        setStatusMessage("Could not send OTP. Please try again.");
        return;
      }

      setStep("otp");
      setStatusMessage("OTP sent successfully.");
    } catch (error) {
      console.error("[FREEBIES_SEND_OTP]", error);
      setStatusMessage("Could not send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const onVerifyOtp = async (): Promise<void> => {
    if (otp.length !== 6) {
      setStatusMessage("Enter the 6-digit OTP.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");
    try {
      const response = await fetch("/api/freebies/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalizedPhone, otp }),
      });

      if (!response.ok) {
        setStatusMessage("Invalid OTP. Please try again.");
        return;
      }

      onVerified(normalizedPhone);
      setStatusMessage("Freebies unlocked.");
      setStep("phone");
      setPhone("");
      setOtp("");
      onClose();
    } catch (error) {
      console.error("[FREEBIES_VERIFY_OTP]", error);
      setStatusMessage("Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-text-dark)]">
          Enter your phone number
        </h2>
        <p className="mt-2 text-sm text-slate-600">Unlock all freebies instantly after OTP verification.</p>

        {step === "phone" ? (
          <div className="mt-4">
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="98765 43210"
              className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm text-[var(--color-text-dark)] outline-none focus:border-[var(--color-teal)]"
            />
            <button
              type="button"
              onClick={() => void onSendOtp()}
              disabled={isSubmitting}
              className="mt-3 w-full rounded-full bg-[var(--gradient-cta)] px-5 py-2 text-sm font-semibold text-[var(--color-navy)] disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <input
              type="text"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm text-[var(--color-text-dark)] outline-none focus:border-[var(--color-teal)]"
            />
            <button
              type="button"
              onClick={() => void onVerifyOtp()}
              disabled={isSubmitting}
              className="mt-3 w-full rounded-full bg-[var(--gradient-cta)] px-5 py-2 text-sm font-semibold text-[var(--color-navy)] disabled:opacity-60"
            >
              {isSubmitting ? "Verifying..." : "Verify & Unlock"}
            </button>
          </div>
        )}

        {statusMessage ? <p className="mt-3 text-xs text-slate-600">{statusMessage}</p> : null}
        <button
          type="button"
          onClick={onClose}
          className="mt-4 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-[var(--color-text-dark)]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
