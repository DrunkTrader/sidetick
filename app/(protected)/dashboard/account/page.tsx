export default function DashboardAccountPage(): React.JSX.Element {
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
              <p className="mt-1">Mini Quant Student</p>
            </div>
            <div className="rounded-xl bg-[var(--color-navy)]/40 p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Email</p>
              <p className="mt-1">student@sidetick.in</p>
            </div>
            <div className="rounded-xl bg-[var(--color-navy)]/40 p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Phone</p>
              <p className="mt-1">+91 99999 99999</p>
              <button
                type="button"
                className="mt-3 rounded-full border border-[rgba(0,200,150,0.2)] px-4 py-1 text-xs"
              >
                Change Phone Number (Re-OTP)
              </button>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-[var(--gradient-card)] p-5">
          <h2 className="font-[var(--font-display)] text-xl">Active Purchases</h2>
          <div className="mt-4 rounded-xl bg-[var(--color-navy)]/40 p-3 text-sm">
            <p className="font-semibold">Mini Quant</p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Status: ACTIVE · Lifetime access
            </p>
          </div>
        </article>

        <div>
          <button
            type="button"
            className="rounded-full border border-[rgba(255,75,75,0.35)] px-6 py-2 text-sm text-[var(--color-text-primary)]"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}
