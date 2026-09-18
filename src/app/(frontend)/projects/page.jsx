"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiGithub, FiSearch, FiX } from "react-icons/fi";
import Reveal from "@/components/Reavel/Reavel";
import ProjectsSkeleton from "./ProjectsSkeleton";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Get projects
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await res.json();

      setProjects(data);
    } catch (error) {
      console.log("Failed to fetch projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Get categories dynamically
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category).filter(Boolean)),
  ];

  // Category Filter
  const categoryProjects = projects.filter((project) => {
    if (activeCategory === "All") {
      return true;
    }

    return project.category === activeCategory;
  });

  // Search Filter
  const searchProjects = categoryProjects.filter((project) => {
    const searchValue = search.toLowerCase();

    return (
      project.title?.toLowerCase().includes(searchValue) ||
      project.description?.toLowerCase().includes(searchValue) ||
      project.category?.toLowerCase().includes(searchValue) ||
      project.technologies?.some((technology) =>
        technology.name?.toLowerCase().includes(searchValue),
      )
    );
  });

  return (
    <main className="relative overflow-x-clip py-12 md:py-16 lg:py-20">
      <div className="container relative z-10">
        {/* Header */}
        <Reveal
          initial="opacity-0 translate-y-8"
          view="opacity-100 translate-y-0"
          transition="transition-all duration-500"
          viewport={0.1}
        >
          <header className="mx-auto mb-12 mt-15 max-w-5xl text-center md:mb-16">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              My Projects
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-base-content sm:text-5xl md:text-6xl">
              Things I&apos;ve <span className="text-primary">Built</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-base-content/50 md:text-lg">
              A collection of web applications and projects I&apos;ve built
              using modern technologies, from full-stack systems to frontend
              experiences.
            </p>
          </header>
        </Reveal>

        {/* Loading */}
        {loading ? (
          <ProjectsSkeleton />
        ) : projects.length > 0 ? (
          <>
            {/* Search & Categories */}
            <Reveal
              initial="opacity-0 translate-y-8"
              view="opacity-100 translate-y-0"
              transition="transition-all duration-500"
              viewport={0.1}
            >
              <div className="mb-10 space-y-5">
                {/* Search */}
                <div className="mx-auto max-w-xl">
                  <div className="relative">
                    <FiSearch
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search projects..."
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-11 text-sm text-base-content outline-none transition-all duration-300 placeholder:text-base-content/30 focus:border-primary/30 focus:bg-white/[0.05]"
                    />

                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 transition-colors hover:text-primary"
                      >
                        <FiX size={17} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full cursor-pointer border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                        activeCategory === category
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-white/10 bg-white/[0.02] text-base-content/45 hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Result Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-base-content/40">
                {searchProjects.length}{" "}
                {searchProjects.length === 1 ? "project" : "projects"}
              </p>
            </div>

            {/* Project Grid */}
            {searchProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {searchProjects.map((project) => (
                  <Reveal
                    key={project._id}
                    initial="opacity-0 translate-y-10"
                    view="opacity-100 translate-y-0"
                    transition="transition-all duration-500"
                    viewport={0.1}
                  >
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/5">
                      {/* Image */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.03]">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-base-content/20">
                            No image available
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        {/* Category */}
                        {project.category && (
                          <div className="absolute left-4 top-4">
                            <span className="inline-flex rounded-full border border-primary/20 bg-base-100/80 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
                              {project.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        {/* Title */}
                        <h2 className="line-clamp-2 text-xl font-semibold leading-8 transition-colors duration-300 group-hover:text-primary">
                          {project.title}
                        </h2>

                        {/* Description */}
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-base-content/60">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        {project.technologies?.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.technologies.map((technology, index) => (
                              <span
                                key={index}
                                className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-base-content/45"
                              >
                                {technology.name}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Divider */}
                        <div className="relative mt-6 h-px w-full overflow-hidden bg-white/10">
                          <div className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                        </div>

                        {/* Actions */}
                        <div className="mt-auto flex items-center gap-3 pt-5">
                          {project.liveUrl && (
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-content transition-all duration-300 hover:opacity-90 ${
                                project.githubUrl ? "flex-1" : "w-full"
                              }`}
                            >
                              Live Demo
                              <FiArrowUpRight size={16} />
                            </Link>
                          )}

                          {project.githubUrl && (
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-base-content/70 transition-all duration-300 hover:border-primary/20 hover:text-primary ${
                                project.liveUrl ? "flex-1" : "w-full"
                              }`}
                            >
                              <FiGithub size={16} />
                              GitHub
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              /* No Filter Result */
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FiSearch size={22} />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-base-content">
                  No projects found
                </h2>

                <p className="mt-2 max-w-md text-sm leading-7 text-base-content/40">
                  Try a different search term or choose another category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-content transition-all duration-300 hover:opacity-90"
                >
                  View All Projects
                  <FiArrowUpRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          /* No Projects In Database */
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FiSearch size={22} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-base-content">
              No projects found
            </h2>

            <p className="mt-2 max-w-md text-sm leading-7 text-base-content/40">
              There are no active projects available right now.
            </p>
          </div>
        )}
      </div>

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-48 top-40 -z-10 select-none">
        <div className="h-125 w-125 rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] blur-[140px]" />
      </div>

      <div className="pointer-events-none absolute -right-48 top-[45%] -z-10 select-none">
        <div className="h-125 w-125 rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] blur-[140px]" />
      </div>
    </main>
  );
};

export default ProjectsPage;
