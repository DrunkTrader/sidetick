import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { requireCurrentSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  await requireCurrentSession();

  return (
    <div className="min-h-screen bg-[var(--color-navy)] text-[var(--color-text-primary)]">
      <header className="border-b border-[rgba(0,200,150,0.12)] bg-[var(--color-navy-mid)]/90 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/dashboard" className="font-[var(--font-display)] text-xl">
            Sidetick
          </Link>
          <nav className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <Link href="/dashboard" className="transition hover:text-[var(--color-teal-light)]">
              My Courses
            </Link>
            <Link href="/dashboard/account" className="transition hover:text-[var(--color-teal-light)]">
              Account
            </Link>
            <LogoutButton className="rounded-full border border-[rgba(0,200,150,0.2)] px-3 py-1 text-xs text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-70" />
          </nav>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">{children}</div>
    </div>
  );
}
