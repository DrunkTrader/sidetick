"use client";

import { useState } from "react";

export function LogoutButton({ className = "" }: { className?: string }): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogout = async (): Promise<void> => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        setError("Logout failed. Please try again.");
        return;
      }
      window.location.href = "/login";
    } catch {
      setError("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button type="button" onClick={onLogout} disabled={isLoading} className={className}>
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      {error ? (
        <span role="alert" className="text-xs text-[var(--color-error)]">
          {error}
        </span>
      ) : null}
    </span>
  );
}
