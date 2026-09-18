"use client";

import React, { useEffect, useState } from "react";

import {
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";

import Image from "next/image";

import Reveal from "@/components/Reavel/Reavel";
import ProjectSkeleton from "@/components/loadings/ProjectSkeleton";
import { getIcon } from "@/lib/iconLoader";

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Full Stack", "Frontend", "Backend"];

  // Get projects
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/projects", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch projects!");
      }

      setProjects(data);
    } catch (error) {
      console.error(error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  // Show latest 4 projects on home page
  const displayedProjects = filteredProjects.slice(0, 4);

  const delays = [
    "delay-0",
    "delay-[100ms]",
    "delay-[200ms]",
    "delay-[300ms]",
  ];

  // Check if more projects are available
  const hasMoreProjects = filteredProjects.length > 4;

  // Format published date
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      id="projects"
      className="relative overflow-x-clip py-20"
    >
      <div className="container relative z-10">
        {/* Section Header */}
        <Reveal
          initial="opacity-0 translate-y-7"
          view="opacity-100 translate-y-0"
          transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          viewport={0.2}
          className="mx-auto max-w-3xl text-center"
        >
          <Reveal
            initial="opacity-0 translate-y-7"
            view="opacity-100 translate-y-0"
            transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            viewport={0.2}
            className="gradient-border mx-auto w-fit p-0.5"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />

              <span className="text-sm font-medium uppercase tracking-wider">
                My Projects
              </span>
            </div>
          </Reveal>

          <Reveal
            initial="opacity-0 translate-y-7"
            view="opacity-100 translate-y-0"
            transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[100ms]"
            viewport={0.2}
          >
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Things I've{" "}
              <span className="text-primary">Built</span>
            </h2>
          </Reveal>

          <Reveal
            initial="opacity-0 translate-y-7"
            view="opacity-100 translate-y-0"
            transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[200ms]"
            viewport={0.2}
          >
            <p className="mt-5 text-base leading-8 text-base-content/60">
              A collection of projects I've built while learning,
              experimenting, and solving real world problems.
            </p>
          </Reveal>
        </Reveal>

        {/* Filter */}
        <Reveal
          initial="opacity-0 translate-y-5"
          view="opacity-100 translate-y-0"
          transition="transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[200ms]"
          viewport={0.2}
          className="mt-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`relative inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-2 text-sm font-medium transition-transform duration-200 active:scale-[0.96] ${
                  filter === category
                    ? "text-primary"
                    : "text-base-content hover:text-primary"
                }`}
              >
                {filter === category ? (
                  <span className="absolute inset-0 rounded-full border-2 border-primary bg-primary/5 transition-all duration-300" />
                ) : (
                  <span className="absolute inset-0 rounded-full border-2 border-white/15 transition-colors duration-300 hover:border-primary/40" />
                )}

                <span className="relative z-10">
                  {category}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Projects */}
        <div className="mt-10">
          {loading ? (
            <ProjectSkeleton />
          ) : displayedProjects.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-base-content/50">
                No projects found.
              </p>
            </div>
          ) : (
            <div
              key={filter}
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              {displayedProjects.map((project, idx) => (
                <Reveal
                  key={project._id}
                  initial="opacity-0 translate-y-10"
                  view="opacity-100 translate-y-0"
                  transition={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    delays[idx] || "delay-0"
                  }`}
                  viewport={0.3}
                >
                  <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 transition-colors duration-300 hover:border-primary/30">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1900}
                        height={1080}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                      {/* Featured */}
                      {project.featured && (
                        <div className="absolute left-4 top-4">
                          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-black/40 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Category */}
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>

                      

                      {/* Live Icon */}
                      {project.liveUrl && (
                        <div className="absolute bottom-4 right-4">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-content"
                          >
                            <FaExternalLinkAlt className="text-sm" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight">
                            {project.title}
                          </h3>

                          <p className="mt-1 text-xs text-base-content/35">
                            {formatDate(project.publishedDate)}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-base-content/55">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies?.map((tech) => {
                          const TechIcon = getIcon(tech.icon);

                          return (
                            <span
                              key={tech.name}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-base-content/70 transition-colors duration-300 group-hover:border-white/15"
                            >
                              {TechIcon && (
                                <TechIcon
                                  style={{
                                    color: tech.color || undefined,
                                  }}
                                  className="text-sm"
                                />
                              )}

                              {tech.name}
                            </span>
                          );
                        })}
                      </div>

                      <div className="my-6 h-px bg-white/10" />

                      {/* Buttons */}
                      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        {/* Live Demo */}
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center gap-3 rounded-full border-2 border-primary bg-primary px-6 py-3 text-sm font-medium text-secondary transition-all duration-300 hover:bg-transparent hover:text-primary ${
                              project.githubUrl
                                ? "w-full flex-1 sm:w-fit"
                                : "w-full"
                            }`}
                          >
                            <FaExternalLinkAlt className="text-xs" />
                            Live Demo
                          </a>
                        ) : (
                          <span
                            className={`inline-flex items-center justify-center gap-3 rounded-full border-2 border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-base-content transition-all duration-300 hover:border-primary hover:text-primary ${
                              project.githubUrl
                                ? "w-full flex-1 sm:w-fit"
                                : "w-full"
                            }`}
                          >
                            Coming Soon
                          </span>
                        )}

                        {/* GitHub */}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full flex-1 cursor-pointer items-center justify-center gap-3 rounded-full border-2 border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-base-content transition-all duration-300 hover:border-primary hover:text-primary sm:w-fit"
                          >
                            <FaGithub className="text-base" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* View More */}
        {!loading && hasMoreProjects && (
          <Reveal
            initial="opacity-0 translate-y-5"
            view="opacity-100 translate-y-0"
            transition="transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[200ms]"
            viewport={0.3}
            className="mt-10 flex justify-center"
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              View More Projects
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </Reveal>
        )}
      </div>

      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-40 -z-10">
        <div className="h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] opacity-40 blur-[140px]" />
      </div>

      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10">
        <div className="h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] opacity-25 blur-[140px]" />
      </div>
    </section>
  );
};

export default Projects;

