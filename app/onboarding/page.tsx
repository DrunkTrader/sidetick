"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    const res = await fetch("/api/user/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Failed to save details. Phone number might already be in use.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md rounded-2xl border-4 border-slate-900 dark:border-slate-500 bg-white dark:bg-slate-800 p-8 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-none">
        <h1 className="mb-2 text-3xl font-black text-slate-900 dark:text-white">Complete Profile</h1>
        <p className="mb-6 font-medium text-slate-500 dark:text-slate-400">Welcome! Please provide your details to continue.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block font-bold text-slate-700 dark:text-slate-300">Full Name</label>
            <input required name="name" type="text" className="w-full rounded-xl border-2 border-slate-900 dark:border-slate-500 bg-slate-50 p-3 font-medium outline-none focus:border-purple-600 focus:bg-white dark:bg-slate-900 dark:text-white" placeholder="John Doe" />
          </div>
          <div>
            <label className="mb-1 block font-bold text-slate-700 dark:text-slate-300">Email</label>
            <input required name="email" type="email" className="w-full rounded-xl border-2 border-slate-900 dark:border-slate-500 bg-slate-50 p-3 font-medium outline-none focus:border-purple-600 focus:bg-white dark:bg-slate-900 dark:text-white" placeholder="john@example.com" />
          </div>
          <div>
            <label className="mb-1 block font-bold text-slate-700 dark:text-slate-300">Phone Number *</label>
            <input required name="phone" type="tel" className="w-full rounded-xl border-2 border-slate-900 dark:border-slate-500 bg-slate-50 p-3 font-medium outline-none focus:border-purple-600 focus:bg-white dark:bg-slate-900 dark:text-white" placeholder="+91 9876543210" />
          </div>
          <button disabled={loading} type="submit" className="mt-4 rounded-xl border-4 border-slate-900 dark:border-slate-500 bg-purple-600 py-3 font-bold text-white shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1e293b] active:shadow-none disabled:opacity-50 transition-all">
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
