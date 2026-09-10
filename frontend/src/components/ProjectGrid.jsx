import ProjectCard from "./ProjectCard";

export default function ProjectGrid({
  projects,
  likedProjects,
  onLike,
  onDelete,
  onReset,
}) {
  if (projects.length === 0) {
    return (
      <div className="border border-dashed border-line bg-warm py-20 text-center">
        <h3 className="text-xl font-extrabold text-navy">
          No ideas found
        </h3>

        <p className="mt-2 text-muted">
          Try another keyword or category.
        </p>
        <button onClick={onReset} className="mt-5 border border-navy px-4 py-2 text-sm font-bold text-navy transition hover:bg-navy hover:text-white">Reset filters</button>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          liked={likedProjects.includes(project.id)}
          onLike={onLike}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
