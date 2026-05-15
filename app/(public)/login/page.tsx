"use client";

import { useEffect, useState } from "react";

type TelegramAuthPayload = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

declare global {
  interface Window {
    onTelegramAuth?: (payload: TelegramAuthPayload) => void;
  }
}

export default function LoginPage(): React.JSX.Element {
  const [statusText, setStatusText] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isTelegramLoading, setIsTelegramLoading] = useState(false);
  const [isTelegramConfigured, setIsTelegramConfigured] = useState(true);

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error) {
      setStatusText(error);
    }
  }, []);

  useEffect(() => {
    const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
    const widgetContainer = document.getElementById("telegram-login-widget");

    if (!widgetContainer) {
      return;
    }

    if (!botUsername) {
      setIsTelegramConfigured(false);
      return;
    }

    window.onTelegramAuth = (telegramAuthPayload: TelegramAuthPayload): void => {
      void (async () => {
        setIsTelegramLoading(true);
        setStatusText("");
        try {
          const response = await fetch("/api/auth/telegram", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(telegramAuthPayload),
          });
          const payload = (await response.json()) as {
            success: boolean;
            error?: string;
            data?: { redirectTo?: string };
          };

          if (!response.ok || !payload.success) {
            setStatusText(payload.error ?? "Telegram login failed.");
            return;
          }

          const redirectTo = payload.data?.redirectTo ?? "/";
          window.location.href = redirectTo;
        } catch (error) {
          console.error("[LOGIN_TELEGRAM]", error);
          setStatusText("Telegram login failed. Please try again.");
        } finally {
          setIsTelegramLoading(false);
        }
      })();
    };

    widgetContainer.innerHTML = "";
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://telegram.org/js/telegram-widget.js?22";
    scriptElement.async = true;
    scriptElement.setAttribute("data-telegram-login", botUsername);
    scriptElement.setAttribute("data-size", "large");
    scriptElement.setAttribute("data-userpic", "false");
    scriptElement.setAttribute("data-request-access", "write");
    scriptElement.setAttribute("data-radius", "12");
    scriptElement.setAttribute("data-onauth", "window.onTelegramAuth(user)");
    widgetContainer.appendChild(scriptElement);

    return () => {
      delete window.onTelegramAuth;
    };
  }, []);

  const startGoogleLogin = (): void => {
    setIsGoogleLoading(true);
    setStatusText("");
    window.location.href = "/api/auth/google/start";
  };

  return (
    <main className="min-h-screen bg-[var(--color-navy)] px-6 py-20 text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-md rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-teal)]">Sidetick</p>
        <h1 className="mt-3 font-[var(--font-display)] text-3xl">Login to your account</h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Continue with your Google account or Telegram account to access your courses.
        </p>

        {statusText ? (
          <div
            role="alert"
            aria-live="polite"
            className="mt-5 rounded-xl border border-[rgba(255,75,75,0.35)] bg-[rgba(255,75,75,0.08)] px-4 py-3 text-sm text-[var(--color-text-primary)]"
          >
            {statusText}
          </div>
        ) : null}

        <div className="mt-6 space-y-4">
          <button
            type="button"
            onClick={startGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full rounded-full bg-[var(--gradient-cta)] px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isGoogleLoading ? "Opening Google login..." : "Continue with Google"}
          </button>

          <div className="rounded-xl border border-[rgba(0,200,150,0.2)] p-4">
            <p className="mb-3 text-xs text-[var(--color-text-muted)]">Continue with Telegram</p>
            {isTelegramConfigured ? (
              <>
                <div id="telegram-login-widget" className="flex justify-center" />
                {isTelegramLoading ? (
                  <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">Signing in...</p>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)]">Telegram login is currently unavailable.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
