import Link from "next/link";

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t-2 border-slate-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm md:grid-cols-4 md:px-6">
        <div>
          <h3 className="font-[var(--font-display)] text-2xl font-black text-slate-800">Sidetick</h3>
          <p className="mt-3 font-medium text-slate-500">
            Algorithmic trading education built for Indian retail traders.
          </p>
        </div>

        <div>
          <p className="font-bold text-slate-800 uppercase tracking-wide">Links</p>
          <div className="mt-4 flex flex-col gap-3 font-medium text-slate-500">
            <Link href="/freebies" className="hover:text-[var(--color-teal)] transition">Resources</Link>
            <Link href="/dashboard" className="hover:text-[var(--color-teal)] transition">Courses</Link>
            <Link href="#about" className="hover:text-[var(--color-teal)] transition">About</Link>
          </div>
        </div>

        <div>
          <p className="font-bold text-slate-800 uppercase tracking-wide">Legal</p>
          <div className="mt-4 flex flex-col gap-3 font-medium text-slate-500">
            <a href="#" className="hover:text-[var(--color-teal)] transition">Terms</a>
            <a href="#" className="hover:text-[var(--color-teal)] transition">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-teal)] transition">Refund Policy</a>
          </div>
        </div>

        <div>
          <p className="font-bold text-slate-800 uppercase tracking-wide">Social</p>
          <div className="mt-4 flex flex-col gap-3 font-medium text-slate-500">
            <a href="#" className="hover:text-[#229ED9] transition">Telegram</a>
            <a href="#" className="hover:text-[#FF0000] transition">YouTube</a>
            <a href="#" className="hover:text-black transition">X (Twitter)</a>
            <a href="#" className="hover:text-[#5865F2] transition">Discord</a>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-slate-100 bg-slate-50 px-4 py-6 text-center text-xs font-bold text-slate-400">
        © 2025 Sidetick. All rights reserved. GST: XXXXXXXXXXXX
      </div>
    </footer>
  );
}
