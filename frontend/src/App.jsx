import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FilterBar from "./components/FilterBar";
import ProjectGrid from "./components/ProjectGrid";
import SubmissionForm from "./components/SubmissionForm";

import { getProjects } from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [likedProjects, setLikedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);

        const data = await getProjects();

        setProjects(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

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

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        project.domain === category;

      return matchesSearch && matchesCategory;
    });
  }, [projects, search, category]);

  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <main>

        <Hero />

        <section
          id="ideas"
          className="mx-auto max-w-7xl px-6 py-24"
        >
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Innovation Showcase
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Explore student ideas
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              Discover promising projects built by student
              innovators across different domains.
            </p>
          </div>

          <FilterBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />

          {loading && (
            <div className="py-20 text-center text-slate-400">
              Loading projects...
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-5 text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && (
            <ProjectGrid
              projects={filteredProjects}
              likedProjects={likedProjects}
              onLike={handleLike}
            />
          )}
        </section>

        <section
          id="submit"
          className="border-t border-white/10 py-24"
        >
          <div className="mx-auto max-w-3xl px-6">

            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                Pitch Your Idea
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Have an idea?
              </h2>

              <p className="mt-4 text-slate-400">
                Submit your startup concept and get it in front
                of the innovation community.
              </p>
            </div>

            <SubmissionForm />

          </div>
        </section>

      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        © 2026 IEDC Innovation Hub. Built by student innovators.
      </footer>

    </div>
  );
}
