import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.12),_transparent_35%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-300">
            <Sparkles size={16} />
            Where student ideas become innovation
          </div>

          <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Turn your
            <span className="text-indigo-400"> ideas</span>
            <br />
            into impact.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Discover innovative student projects, support emerging
            entrepreneurs, and submit your own startup idea to the IEDC
            Innovation Hub.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <a
              href="#ideas"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 font-semibold transition hover:bg-indigo-400"
            >
              Explore Ideas
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </a>

            <a
              href="#submit"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold transition hover:bg-white/10"
            >
              Submit Your Pitch
            </a>

          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">

          {[
            ["50+", "Ideas"],
            ["12", "Categories"],
            ["150+", "Innovators"],
            ["8", "Funded"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center"
            >
              <div className="text-2xl font-bold">{number}</div>
              <div className="mt-1 text-sm text-slate-500">{label}</div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
