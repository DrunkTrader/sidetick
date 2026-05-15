import { LogoutButton } from "@/components/auth/LogoutButton";
import { requireCurrentSession } from "@/lib/session";

export default async function DashboardAccountPage(): Promise<React.JSX.Element> {
  const session = await requireCurrentSession();
  const activePurchases = session.user.purchases;

  return (
    <main className="max-w-4xl">
      <h1 className="font-[var(--font-display)] text-3xl">Account Settings</h1>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        Manage your profile, purchases, and session access.
      </p>

      <section className="mt-6 grid gap-4">
        <article className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-5">
          <h2 className="font-[var(--font-display)] text-xl">Profile</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="rounded-xl bg-[var(--color-navy)]/40 p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Display Name</p>
              <p className="mt-1">{session.user.name ?? "Not provided"}</p>
            </div>
            <div className="rounded-xl bg-[var(--color-navy)]/40 p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Email</p>
              <p className="mt-1">{session.user.email ?? "Not provided"}</p>
            </div>
            <div className="rounded-xl bg-[var(--color-navy)]/40 p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Phone</p>
              <p className="mt-1">{session.user.phone ?? "Not provided"}</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-5">
          <h2 className="font-[var(--font-display)] text-xl">Active Purchases</h2>
          <div className="mt-4 grid gap-3">
            {activePurchases.length > 0 ? (
              activePurchases.map((purchase) => (
                <div key={purchase.id} className="rounded-xl bg-[var(--color-navy)]/40 p-3 text-sm">
                  <p className="font-semibold">{purchase.course.title}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    Status: {purchase.status} · Lifetime access
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-xl bg-[var(--color-navy)]/40 p-3 text-sm text-[var(--color-text-muted)]">
                You do not have an active purchase yet.
              </p>
            )}
          </div>
        </article>

        <div>
          <LogoutButton className="rounded-full border border-[rgba(255,75,75,0.35)] px-6 py-2 text-sm text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-70" />
        </div>
      </section>
    </main>
  );
}
