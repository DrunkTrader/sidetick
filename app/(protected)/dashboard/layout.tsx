"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function Icon({ name }: { name: string }) {
  const baseClass = "h-5 w-5";
  switch (name) {
    case "Home":
      return <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>;
    case "Curriculum":
      return <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>;
    case "Resources":
      return <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>;
    case "Pine Scripts":
      return <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>;
    case "Logout":
      return <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>;
    default:
      return null;
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState({ name: "Loading...", email: "Loading...", phone: "Loading..." });
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    fetch("/api/user/me").then(res => res.json()).then(data => {
      if (data && !data.error) {
        setUserData({ name: data.name || "N/A", email: data.email || "N/A", phone: data.phone || "N/A" });
      }
    }).catch(err => console.error(err));
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { name: "Home", href: "/dashboard" },
    { name: "Curriculum", href: "/dashboard/curriculum" },
    { name: "Resources", href: "/dashboard/resources" },
    { name: "Pine Scripts", href: "/dashboard/scripts" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 selection:bg-purple-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-black text-xl tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-purple-600 text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            Sidetick
          </div>
        </div>

        <div className="hidden max-w-xl flex-1 px-8 md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search course modules..."
              className="w-full rounded-full border-2 border-slate-900 dark:border-slate-600 bg-white dark:bg-slate-800 py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button className="absolute right-0 top-0 flex h-full items-center justify-center rounded-r-full border-l-2 border-slate-900 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 px-4 hover:bg-slate-200 dark:hover:bg-slate-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="rounded-full border-2 border-slate-900 dark:border-slate-500 bg-slate-100 dark:bg-slate-800 p-2 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Toggle Theme">
            {isDarkMode ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
          } fixed bottom-0 left-0 top-16 z-40 flex flex-col border-r-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300 md:sticky md:top-16 md:h-[calc(100vh-4rem)]`}
        >
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 font-bold transition-colors ${
                      isActive
                        ? "border-slate-900 dark:border-slate-500 bg-purple-600 text-white"
                        : "border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Icon name={item.name} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="border-t-2 border-slate-900 dark:border-slate-700 p-4">
            <div className="relative">
              {isAccountMenuOpen && (
                <div className="absolute bottom-[calc(100%+8px)] left-0 w-full rounded-xl border-2 border-slate-900 dark:border-slate-500 bg-white dark:bg-slate-800 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-none">
                  <h4 className="mb-3 border-b-2 border-slate-100 dark:border-slate-700 pb-2 font-bold text-slate-900 dark:text-white">Personal Info</h4>
                  <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Name</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{userData.name}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Email</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{userData.email}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Phone (Required)</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{userData.phone}</span>
                    </div>
                    <button className="mt-2 rounded-lg border-2 border-slate-900 dark:border-slate-500 bg-slate-100 dark:bg-slate-700 py-2 font-bold text-slate-900 dark:text-white transition-colors hover:bg-slate-200 dark:hover:bg-slate-600">
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-900 dark:border-slate-500 bg-slate-800 dark:bg-slate-900 text-sm text-white">
                  N
                </div>
                Account
              </button>
            </div>
            <a
              href="/api/auth/logout"
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Icon name="Logout" />
              Logout
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main
          className="relative flex-1 overflow-y-auto"
          style={{
            backgroundImage: isDarkMode ? "radial-gradient(#475569 1.5px, transparent 1.5px)" : "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px"
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
