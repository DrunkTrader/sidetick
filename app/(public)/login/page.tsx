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
  const [isTelegramLoading, setIsTelegramLoading] = useState(false);

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
      setStatusText("Telegram login is not configured.");
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
          setStatusText("Telegram login failed.");
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
    scriptElement.setAttribute("data-radius", "16");
    scriptElement.setAttribute("data-onauth", "window.onTelegramAuth(user)");
    widgetContainer.appendChild(scriptElement);

    return () => {
      delete window.onTelegramAuth;
    };
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-20 text-slate-800">
      {/* Playful Background Elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-purple-100/50 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-green-100/40 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 md:p-10">
        <div className="text-center">
          <h1 className="font-[var(--font-display)] text-4xl font-black text-slate-800">Welcome Back</h1>
          <p className="mt-3 font-medium text-slate-600">
            Sign in to continue your trading journey.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          <a
            href="/api/auth/google/start"
            className="flex items-center justify-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-5 py-4 font-bold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </a>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-slate-100" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 font-bold text-slate-400">OR</span>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#229ED9]/20 bg-[#229ED9]/5 p-6 text-center">
            <p className="mb-4 font-bold text-slate-700">Continue with Telegram</p>
            <div id="telegram-login-widget" className="flex justify-center" />
            {isTelegramLoading ? (
              <p className="mt-4 font-bold text-[#229ED9] animate-pulse">Signing in...</p>
            ) : null}
          </div>
        </div>

        {statusText ? (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-center border-2 border-red-100">
            <p className="font-bold text-red-600">{statusText}</p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
