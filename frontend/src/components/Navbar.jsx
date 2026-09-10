import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [["Home", "home"], ["Explore Ideas", "ideas"], ["How It Works", "how-it-works"], ["Submit Pitch", "submit"]];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? "border-b border-line bg-white/95 shadow-sm backdrop-blur" : "bg-warm/90"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="flex items-center gap-3 text-navy" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center bg-navy text-sm font-black text-white">I</span>
          <span className="leading-tight"><strong className="block text-sm font-extrabold tracking-wide">IEDC</strong><span className="block text-xs text-muted">Innovation Hub</span></span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">{links.map(([label, href]) => <a key={href} href={`#${href}`} className="text-sm font-semibold text-muted transition hover:text-teal-brand">{label}</a>)}</div>
        <a href="#submit" className="hidden items-center gap-2 bg-teal-brand px-4 py-2.5 text-sm font-bold text-white transition hover:bg-navy sm:inline-flex">Submit Your Idea <ArrowUpRight size={16} /></a>
        <button className="grid h-10 w-10 place-items-center text-navy lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <div className="border-t border-line bg-white px-5 py-4 lg:hidden">{links.map(([label, href]) => <a key={href} href={`#${href}`} onClick={() => setOpen(false)} className="block border-b border-line py-3 text-sm font-semibold text-navy">{label}</a>)}<a href="#submit" onClick={() => setOpen(false)} className="mt-4 block bg-teal-brand px-4 py-3 text-center text-sm font-bold text-white">Submit Your Idea</a></div>}
    </header>
  );
}
