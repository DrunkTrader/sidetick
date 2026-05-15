import { requireAdminSession } from "@/lib/session";

export default async function AdminPage(): Promise<React.JSX.Element> {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen bg-[var(--color-navy)] px-6 py-10 text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-[var(--color-text-muted)]">Signed in as {session.user.email ?? session.user.name ?? session.user.id}</p>
        <h1 className="mt-2 font-[var(--font-display)] text-3xl">Admin Dashboard</h1>
      </div>
    </main>
  );
}
