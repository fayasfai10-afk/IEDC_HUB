import { Heart, Users, ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  project,
  liked,
  onLike,
}) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/[0.05]">

      <div className="flex items-start justify-between gap-4">

        <span className="rounded-full bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-300">
          {project.domain}
        </span>

        <ArrowUpRight
          size={18}
          className="text-slate-600 transition group-hover:text-indigo-400"
        />

      </div>

      <h3 className="mt-5 text-xl font-bold">
        {project.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
        {project.abstract}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Users size={16} />
          {project.teamSize} members
        </div>

        <button
          onClick={() => onLike(project.id)}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${liked
              ? "bg-rose-500/10 text-rose-400"
              : "bg-white/5 text-slate-400 hover:text-rose-400"
            }`}
        >
          <Heart
            size={17}
            fill={liked ? "currentColor" : "none"}
          />
          {project.likes}
        </button>

      </div>
    </article>
  );
}
