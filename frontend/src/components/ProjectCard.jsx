import { Heart, Users, ArrowUpRight, Trash2, UserRound } from "lucide-react";
import { useState } from "react";

export default function ProjectCard({
  project,
  liked,
  onLike,
  onDelete,
}) {
  const [isPopping, setIsPopping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  function handleLike() {
    setIsPopping(true);
    onLike(project.id);
    window.setTimeout(() => setIsPopping(false), 350);
  }

  async function handleDelete() {
    if (!window.confirm(`Remove "${project.title}" from the showcase?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteError("");
      await onDelete(project.id);
    } catch (error) {
      setDeleteError(error.message || "Unable to delete this project.");
      setIsDeleting(false);
    }
  }

  return (
    <article className={`group flex h-full flex-col border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-brand hover:shadow-[0_14px_30px_rgba(11,31,51,0.09)] ${isDeleting ? "pointer-events-none opacity-60" : ""}`}>

      <div className="flex items-start justify-between gap-4">

        <span className="border-l-2 border-amber-brand pl-2 text-xs font-bold uppercase tracking-[0.12em] text-teal-brand">
          {project.domain}
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label={`Delete ${project.title}`}
            title="Delete project"
            className="text-muted transition hover:text-red-600 disabled:cursor-wait"
          >
            <Trash2 size={16} />
          </button>
          <ArrowUpRight
            size={18}
            className="text-muted transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-teal-brand"
          />
        </div>

      </div>

      <h3 className="mt-5 text-xl font-extrabold text-navy">
        {project.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
        {project.abstract}
      </p>

      {deleteError && <p className="mt-4 border border-red-200 bg-red-50 p-2 text-xs text-red-700">{deleteError}</p>}

      <div className="mt-auto flex items-center justify-between border-t border-line pt-5">

        <div className="space-y-1 text-sm text-muted">
          <div className="flex items-center gap-2"><UserRound size={15} /> {project.teamLead}</div>
          <div className="flex items-center gap-2"><Users size={15} /> {project.teamSize} member{project.teamSize === 1 ? "" : "s"} <span className="text-line">|</span> {project.status}</div>
        </div>

        <button
            onClick={handleLike}
            className={`flex items-center gap-2 border px-3 py-2 text-sm transition ${liked
              ? "border-teal-brand bg-teal-brand text-white"
              : "border-line text-muted hover:border-teal-brand hover:text-teal-brand"
            }`}
        >
          <Heart
            size={17}
            className={isPopping ? "heart-pop" : ""}
            fill={liked ? "currentColor" : "none"}
          />
          {project.likes}
        </button>

      </div>
    </article>
  );
}
