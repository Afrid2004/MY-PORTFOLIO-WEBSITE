"use client";

import React, { useEffect, useRef, useState } from "react";

import Reveal from "@/components/Reavel/Reavel";
import { getIcon } from "@/lib/iconLoader";
import SkillsSkeleton from "@/components/loadings/SkillsSkeleton";

const SkillProgress = ({ level, color }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5"
      ref={ref}
    >
      <div
        className="h-full rounded-full transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: isVisible ? `${level}%` : "0%",
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}60`,
        }}
      />
    </div>
  );
};

const Skills = () => {
  const [cat, setCat] = useState(0);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/skills");
      if (!res.ok) {
        throw new Error("Failed to fetch skills");
      }
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const categoryInfo = {
    frontend: {
      title: "Frontend",
      description: "Building modern & responsive interfaces",
    },
    backend: {
      title: "Backend",
      description: "Developing scalable server-side applications",
    },
    database: {
      title: "Database",
      description: "Managing and working with application databases",
    },
    tools_other: {
      title: "Tools & Others",
      description: "Tools and platforms I use in my development workflow",
    },
  };

  const categories = Object.entries(categoryInfo)
    .map(([key, data]) => ({
      key,
      title: data.title,
      description: data.description,
      skills: skills.filter(
        (skill) => skill.category === key && skill.status === true,
      ),
    }))
    .filter((category) => category.skills.length > 0);

  const delays = [
    "delay-0",
    "delay-[120ms]",
    "delay-[240ms]",
    "delay-[360ms]",
    "delay-[480ms]",
    "delay-[600ms]",
    "delay-[720ms]",
    "delay-[840ms]",
  ];

  const activeCategory = categories[cat];

  return (
    <section className="py-20 relative">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <Reveal
            initial="opacity-0 translate-y-7"
            view="opacity-100 translate-y-0"
            transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            viewport={0.2}
          >
            <div className="gradient-border w-fit p-0.5 mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  My Skills
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal
            initial="opacity-0 translate-y-7"
            view="opacity-100 translate-y-0"
            transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[120ms]"
            viewport={0.2}
          >
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Technologies I <span className="text-primary">Work With</span>
            </h2>
          </Reveal>

          <Reveal
            initial="opacity-0 translate-y-7"
            view="opacity-100 translate-y-0"
            transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[240ms]"
            viewport={0.2}
          >
            <p className="mt-5 text-base leading-8 text-base-content/60">
              A collection of technologies and tools I use to build modern,
              scalable, and high-performance web applications.
            </p>
          </Reveal>
        </div>

        {loading ? (
          <SkillsSkeleton />
        ) : (
          <>
            {/* Category Tabs */}
            <Reveal
              initial="opacity-0"
              view="opacity-100"
              transition="transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[300ms]"
              viewport={0.2}
            >
              <div className="mt-12">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {categories.map((category, idx) => (
                    <button
                      key={category.key}
                      onClick={() => setCat(idx)}
                      type="button"
                      className={`relative inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium cursor-pointer w-full sm:w-fit active:scale-[0.97] transition-transform duration-200 ${cat === idx ? "text-primary" : "text-base-content hover:text-primary"}`}
                    >
                      {cat === idx ? (
                        <span className="absolute inset-0 rounded-full border-2 border-primary bg-primary/5" />
                      ) : (
                        <span className="absolute inset-0 rounded-full border-2 border-white/15" />
                      )}

                      <span className="relative z-10">{category.title}</span>
                    </button>
                  ))}
                </div>

                {/* Category Content */}
                <div className="mt-6">
                  <div key={activeCategory?.title}>
                    {/* Category Header */}
                    <Reveal
                      initial="opacity-0 translate-y-5"
                      view="opacity-100 translate-y-0"
                      transition="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      viewport={0.2}
                    >
                      <div className="mb-7">
                        <h3 className="text-2xl font-semibold">
                          {activeCategory?.title}
                        </h3>

                        <p className="mt-2 text-sm text-base-content/50">
                          {activeCategory?.description}
                        </p>
                      </div>
                    </Reveal>

                    {/* Skills */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {activeCategory?.skills.map((skill, idx) => {
                        const Icon = getIcon(skill.icon);

                        return (
                          <Reveal
                            key={skill._id}
                            initial="opacity-0 translate-y-10"
                            view="opacity-100 translate-y-0"
                            transition={`transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${delays[idx] || "delay-0"}`}
                            viewport={0.3}
                          >
                            <div
                              style={{
                                "--skill-color": skill.color,
                              }}
                              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-(--skill-color)/20 hover:bg-(--skill-color)/10"
                            >
                              {/* Icon */}
                              <div
                                className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-3xl transition-all duration-300"
                                style={{
                                  color: skill.color,
                                  backgroundColor: `${skill.color}30`,
                                  border: `1px solid ${skill.color}25`,
                                }}
                              >
                                {Icon ? (
                                  <Icon />
                                ) : (
                                  <span className="text-xs">API</span>
                                )}
                              </div>

                              {/* Content */}
                              <div className="relative mt-5 w-full">
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-sm font-semibold">
                                    {skill.name}
                                  </span>

                                  <span
                                    className="text-xs font-medium"
                                    style={{
                                      color: skill.color,
                                    }}
                                  >
                                    {skill.level}%
                                  </span>
                                </div>

                                {/* Progress */}
                                <SkillProgress
                                  level={skill.level}
                                  color={skill.color}
                                />
                              </div>
                            </div>
                          </Reveal>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </>
        )}
      </div>

      <div className="absolute top-20 -left-10 md:-left-60 lg:-left-80 pointer-events-none select-none -z-1">
        <div className="w-75 h-75 md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] rounded-full blur-[100px] md:blur-[140px] bg-[radial-gradient(circle,#209181_0%,transparent_70%)]" />
      </div>
    </section>
  );
};

export default Skills;
