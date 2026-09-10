import { ArrowRight, ArrowUpRight, Compass, Lightbulb, Sparkles } from "lucide-react";
import useReveal from "../hooks/useReveal";

const stats = [["50+", "Ideas submitted"], ["150+", "Student innovators"], ["12", "Innovation domains"], ["8", "Projects funded"]];

export default function Hero() {
  const { ref, visible } = useReveal();

  return (
    <section id="home" ref={ref} className={`hero-grid relative overflow-hidden border-b border-line ${visible ? "is-visible" : ""}`}>
      <div className="hero-mark" aria-hidden="true">IEDC / 26</div>
      <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-28 sm:px-8 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24 lg:pt-36">
        <div>
          <div className="rise flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.22em] text-teal-brand" style={{ "--rise-delay": "80ms" }}><span className="h-2 w-2 bg-amber-brand" /> IEDC Innovation Hub <span className="hidden text-muted/60 sm:inline">/ Student venture platform</span></div>
          <h1 className="rise mt-6 max-w-3xl text-[clamp(2.9rem,6vw,5.9rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-navy" style={{ "--rise-delay": "160ms" }}>Where student ideas become <span className="relative inline-block text-teal-brand">real-world impact<span className="absolute -bottom-2 left-0 h-1 w-16 bg-amber-brand sm:-bottom-3 sm:w-24" /></span>.</h1>
          <p className="rise mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg" style={{ "--rise-delay": "260ms" }}>Discover promising projects, connect with student innovators, and bring your own idea to life.</p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--rise-delay": "340ms" }}><a href="#ideas" className="group inline-flex items-center justify-center gap-3 bg-navy px-6 py-3.5 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-teal-brand">Explore Ideas <ArrowRight size={18} className="transition group-hover:translate-x-1" /></a><a href="#submit" className="group inline-flex items-center justify-center gap-2 border border-navy px-6 py-3.5 font-bold text-navy transition duration-300 hover:-translate-y-1 hover:bg-navy hover:text-white">Submit Your Pitch <ArrowUpRight size={17} /></a></div>
        </div>
        <div className="rise relative lg:mb-0" style={{ "--rise-delay": "420ms" }}>
          <div className="hero-signal overflow-hidden border border-navy/10 bg-white/80 shadow-[10px_12px_0_0_rgba(15,118,110,0.12)] backdrop-blur-sm">
            <div className="flex items-start justify-between border-b border-line p-6 sm:p-7"><div><div className="flex items-center gap-2 text-sm font-extrabold text-navy"><Lightbulb size={18} className="text-amber-brand" /> A campus full of possibility</div><p className="mt-2 max-w-xs text-sm leading-6 text-muted">Ideas move further when the right people find them.</p></div><span className="grid h-9 w-9 place-items-center bg-teal-brand/10 text-teal-brand"><Sparkles size={17} /></span></div>
            <div className="grid grid-cols-2 gap-px bg-line">{stats.map(([number, label], index) => <div key={label} className="bg-white p-5 sm:p-6"><div className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{number}</div><div className="mt-1 text-xs font-semibold leading-5 text-muted">{label}</div><div className={index === 0 ? "mt-4 h-1 w-8 bg-amber-brand" : "mt-4 h-1 w-5 bg-teal-brand"} /></div>)}</div>
            <div className="flex items-center justify-between gap-4 bg-navy px-6 py-4 text-sm font-semibold text-white sm:px-7"><span className="flex items-center gap-2"><Compass size={16} className="text-amber-brand" /> Built by students, for the future</span><span className="hidden text-xs uppercase tracking-[0.15em] text-slate-300 sm:inline">01 / 03</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
