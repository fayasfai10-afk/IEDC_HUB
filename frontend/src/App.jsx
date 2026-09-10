import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FilterBar from "./components/FilterBar";
import ProjectGrid from "./components/ProjectGrid";
import SubmissionForm from "./components/SubmissionForm";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

import { deleteProject, getProjects } from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [likedProjects, setLikedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      setProjects(data);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Unable to connect to the IEDC API. Start the backend with .\\start.ps1 and try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleLike(id) {
    if (likedProjects.includes(id)) {
      setLikedProjects((previous) =>
        previous.filter((projectId) => projectId !== id)
      );

      setProjects((previous) =>
        previous.map((project) =>
          project.id === id
            ? {
                ...project,
                likes: Math.max(0, project.likes - 1),
              }
            : project
        )
      );

      return;
    }

    setLikedProjects((previous) => [
      ...previous,
      id,
    ]);

    setProjects((previous) =>
      previous.map((project) =>
        project.id === id
          ? {
              ...project,
              likes: project.likes + 1,
            }
          : project
      )
    );
  }

  function handleProjectCreated(project) {
    setProjects((previous) => [project, ...previous]);
    setSearch("");
    setCategory("All");
  }

  async function handleDelete(id) {
    await deleteProject(id);
    setProjects((previous) => previous.filter((project) => project.id !== id));
    setLikedProjects((previous) => previous.filter((projectId) => projectId !== id));
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const query = search.toLowerCase();
      const matchesSearch = [project.title, project.abstract, project.domain, project.teamLead]
        .some((value) => value?.toLowerCase().includes(query));

      const matchesCategory =
        category === "All" ||
        project.domain === category;

      return matchesSearch && matchesCategory;
    });
  }, [projects, search, category]);

  return (
    <div className="min-h-screen bg-warm text-ink">

      <Navbar />

      <main>

        <Hero />

        <HowItWorks />

        <section id="ideas" className="border-y border-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-label">02 / Innovation showcase</p>
                <h2 className="section-title mt-3">Ideas worth exploring</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-muted">See what students are building across technology, business and social innovation.</p>
            </div>

          <FilterBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />

          {loading && <div className="border-y border-line py-20 text-center text-muted">Loading projects...</div>}

          {error && (
            <div className="flex flex-col gap-4 border border-red-200 bg-red-50 p-5 text-red-700 sm:flex-row sm:items-center sm:justify-between">
              <p>{error}</p>
              <button
                type="button"
                onClick={loadProjects}
                className="w-fit border border-red-300 px-4 py-2 text-sm font-semibold text-red-800 transition hover:bg-white"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <ProjectGrid
              projects={filteredProjects}
              likedProjects={likedProjects}
              onLike={handleLike}
              onDelete={handleDelete}
              onReset={() => { setSearch(""); setCategory("All"); }}
            />
          )}
          </div>
        </section>

        <section id="submit" className="bg-navy py-20 text-white sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="section-label text-amber-brand">03 / Pitch your idea</p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Have an idea worth building?</h2>
              <p className="mt-5 text-base leading-7 text-slate-300">Tell us about your idea and take the first step toward turning it into impact.</p>
            </div>
            <SubmissionForm onProjectCreated={handleProjectCreated} />
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}
