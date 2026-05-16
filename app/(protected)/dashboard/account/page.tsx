export default function DashboardAccountPage(): React.JSX.Element {
  return (
    <main className="max-w-4xl">
      <h1 className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-text-dark)]">Account Settings</h1>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        Manage your profile, purchases, and linked accounts.
      </p>

      <section className="mt-6 grid gap-6">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-text-dark)]">Profile Information</h2>
          <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            
            <div className="col-span-full mb-2 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                👨‍💻
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-[var(--color-text-dark)] transition hover:bg-slate-50"
              >
                Change Picture
              </button>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-[var(--color-text-muted)]">Display Name</p>
                  <p className="mt-1 font-semibold text-[var(--color-text-dark)]">Mini Quant Student</p>
                </div>
                <button type="button" className="text-xs font-medium text-[var(--color-teal)] hover:underline">Edit</button>
              </div>
            </div>
            
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-[var(--color-text-muted)]">Email</p>
                  <p className="mt-1 font-semibold text-[var(--color-text-dark)]">student@sidetick.in</p>
                </div>
                <button type="button" className="text-xs font-medium text-[var(--color-teal)] hover:underline">Edit</button>
              </div>
            </div>
            
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-[var(--color-text-muted)]">Phone Number</p>
                  <p className="mt-1 font-semibold text-[var(--color-text-dark)]">+91 99999 99999</p>
                </div>
                <button type="button" className="text-xs font-medium text-[var(--color-teal)] hover:underline">Change</button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-[var(--color-text-muted)]">Linked Telegram Account</p>
                  <p className="mt-1 font-semibold text-[var(--color-text-dark)]">@miniquant_student</p>
                </div>
                <button type="button" className="text-xs font-medium text-red-500 hover:underline">Unlink</button>
              </div>
            </div>

          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-text-dark)]">Active Purchases</h2>
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
            <p className="font-bold text-[var(--color-text-dark)]">Mini Quant</p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Status: <span className="font-semibold text-[var(--color-teal)]">ACTIVE</span> · Lifetime access
            </p>
          </div>
        </article>

        <div className="mt-2">
          <a
            href="/api/auth/logout"
            className="inline-flex rounded-full border border-red-200 bg-red-50 px-6 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Logout
          </a>
        </div>
      </section>
    </main>
  );
}
