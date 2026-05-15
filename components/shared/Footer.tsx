import Link from "next/link";

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-[rgba(0,200,150,0.15)] bg-[var(--color-navy-mid)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm md:grid-cols-3 md:px-6">
        <div>
          <h3 className="font-[var(--font-display)] text-xl text-[var(--color-text-primary)]">Sidetick</h3>
          <p className="mt-2 text-[var(--color-text-muted)]">
            Algorithmic trading education built for Indian retail traders.
          </p>
        </div>

        <div>
          <p className="font-semibold text-[var(--color-text-primary)]">Links</p>
          <div className="mt-2 flex flex-col gap-2 text-[var(--color-text-muted)]">
            <Link href="/">Home</Link>
            <Link href="/freebies">Freebies</Link>
            <Link href="/login">Login</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund Policy</a>
            <a href="#">Contact</a>
          </div>
        </div>

        <div>
          <p className="font-semibold text-[var(--color-text-primary)]">Social</p>
          <div className="mt-2 flex flex-col gap-2 text-[var(--color-text-muted)]">
            <a href="#">Instagram</a>
            <a href="#">Telegram</a>
            <a href="#">YouTube</a>
            <a href="#">WhatsApp Community</a>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(0,200,150,0.15)] px-4 py-4 text-center text-xs text-[var(--color-text-muted)]">
        © 2025 Sidetick. All rights reserved. GST: XXXXXXXXXXXX
      </div>
    </footer>
  );
}
