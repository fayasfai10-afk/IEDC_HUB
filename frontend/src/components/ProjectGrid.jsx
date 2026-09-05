import ProjectCard from "./ProjectCard";

export default function ProjectGrid({
  projects,
  likedProjects,
  onLike,
}) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-20 text-center">
        <h3 className="text-xl font-semibold">
          No projects found
        </h3>

        <p className="mt-2 text-slate-500">
          Try another search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          liked={likedProjects.includes(project.id)}
          onLike={onLike}
        />
      ))}
    </div>
  );
}
