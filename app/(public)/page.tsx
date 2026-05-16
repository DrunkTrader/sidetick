import { Hero } from "@/components/landing/Hero";
import { Community } from "@/components/landing/Community";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

export default function LandingPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-[var(--color-teal)] selection:text-white">
      <Navbar />
      <Hero />
      <Community />
      <Contact />
      <Footer />
    </div>
  );
}
