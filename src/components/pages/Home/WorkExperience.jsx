"use client";

import Reveal from "@/components/Reavel/Reavel";
import React, { useEffect, useState } from "react";
import WorkExperienceSkeleton from "@/components/loadings/WorkExperienceSkeleton";
import { FiArrowRight } from "react-icons/fi";

const WorkExperience = () => {
  const [filter, setFilter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [workExperiences, setWorkExperiences] = useState([]);

  const fetchWorkExperiences = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/work-experiences");
      const data = await res.json();
      setWorkExperiences(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkExperiences();
  }, []);

  const getDuration = (data) => {
    const start = new Date(data.startDate).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    if (data.current) {
      return { start };
    }

    const end = new Date(data.endDate).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    return { start, end };
  };

  const filteredWork = workExperiences[filter];

  return (
    <section id="experience" className="relative py-20">
      <div className="container relative z-10">
        <Reveal
          initial="opacity-0 translate-y-6"
          view="opacity-100 translate-y-0"
          className="mb-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="gradient-border mx-auto w-fit p-0.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Work Experience
                </span>
              </div>
            </div>

            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Where I've <span className="text-primary">Worked</span>
            </h2>

            <p className="mt-5 text-base leading-8 text-base-content/60">
              My professional experience, responsibilities, and the technologies
              I've worked with.
            </p>
          </div>
        </Reveal>

        {loading ? (
          <WorkExperienceSkeleton />
        ) : (
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
              <div className="flex flex-wrap gap-5 lg:flex-nowrap lg:flex-col">
                {workExperiences.map((data, idx) => (
                  <Reveal
                    key={data._id}
                    initial="opacity-0 translate-y-10"
                    view="opacity-100 translate-y-0"
                    transition="transition-all duration-150"
                    viewport={0.1}
                    className="w-full sm:w-[calc(50%-0.625rem)] lg:w-full"
                  >
                    <div
                      onClick={() => setFilter(idx)}
                      className={`h-full cursor-pointer flex flex-col gap-3 rounded-2xl border border-l-3 px-4 py-3 transition-all duration-75 ${filter === idx ? "active border-l-primary border-primary/10 bg-primary/5 hover:bg-primary/7" : "border-l-white/20 border-white/5 bg-white/5 hover:bg-white/7"}`}
                    >
                      <div className={filter === idx ? "text-primary" : ""}>
                        {data.company}
                      </div>
                      <p className="text-sm">{data.role}</p>
                      <p className="text-xs text-base-content/80">
                        {getDuration(data).start}

                        {data.current ? (
                          <>
                            <FiArrowRight
                              className="mx-2 inline-block text-base-content/40"
                              size={12}
                            />
                            Present
                          </>
                        ) : (
                          <>
                            <FiArrowRight
                              className="mx-2 inline-block text-base-content/40"
                              size={12}
                            />
                            {getDuration(data).end}
                          </>
                        )}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
              {filteredWork && (
                <Reveal
                  key={filter}
                  initial="opacity-0 translate-y-10"
                  view="opacity-100 translate-y-0"
                  transition="transition-all duration-400"
                  viewport={0.3}
                >
                  <div>
                    <div className="rounded-3xl rounded-b-none border border-primary/10 border-b border-b-white/10 bg-primary/7 px-6 py-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                            {filteredWork.company}
                          </h2>
                          <p className="mt-2 font-medium text-primary">
                            {filteredWork.role}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {filteredWork.current ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                              Currently Working
                            </span>
                          ) : (
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              <span>{getDuration(filteredWork).start}</span>

                              <FiArrowRight size={14} />

                              <span>{getDuration(filteredWork).end}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl rounded-t-none border border-white/5 border-t-0 border-b-3 bg-white/[0.02] p-6">
                      <div className="mb-8">
                        <p className="text-xs uppercase tracking-wider text-base-content/80">
                          Location
                        </p>
                        <a
                          href={filteredWork.addressUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block break-words text-sm text-base-content/70 transition-colors hover:text-primary"
                        >
                          {filteredWork.address}
                        </a>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">
                          Responsibilities
                        </h3>

                        <div className="mt-4 space-y-3">
                          {filteredWork.responsibilities.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 mb-5 last:mb-0"
                            >
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                              <p className="text-sm leading-7 text-base-content/60">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="my-8 h-px bg-white/10" />

                      <div>
                        <h3 className="text-lg font-semibold">Technologies</h3>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {filteredWork.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/10 border-b-2 bg-white/3 px-3 py-1.5 text-xs font-medium text-base-content/60 transition-colors hover:border-primary/30 hover:text-primary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute top-20 -left-10 -z-1 select-none md:-left-60 lg:-left-80">
        <div className="h-75 w-75 rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] blur-[100px] md:h-137.5 md:w-137.5 md:blur-[140px] lg:h-175 lg:w-175" />
      </div>
    </section>
  );
};

export default WorkExperience;
