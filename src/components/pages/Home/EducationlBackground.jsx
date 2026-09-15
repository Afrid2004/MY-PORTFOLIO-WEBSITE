"use client";

import Reveal from "@/components/Reavel/Reavel";
import React, { useEffect, useState } from "react";
import EducationSkeleton from "@/components/loadings/EducationSkeleton";
import { FiArrowRight } from "react-icons/fi";

const EducationalBackground = () => {
  const [filter, setFilter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [educations, setEducations] = useState([]);

  const fetchEducations = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/educations");
      const data = await res.json();

      setEducations(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
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

  const filteredEducation = educations[filter];

  return (
    <section id="education" className="relative overflow-x-clip py-20">
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
                  Education
                </span>
              </div>
            </div>

            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              My <span className="text-primary">Academic Journey</span>
            </h2>

            <p className="mt-5 text-base leading-8 text-base-content/60">
              My academic background, coursework, and the skills I've developed
              throughout my educational journey.
            </p>
          </div>
        </Reveal>

        {loading ? (
          <EducationSkeleton />
        ) : (
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
              <div className="flex flex-wrap gap-5 lg:flex-nowrap lg:flex-col">
                {educations.map((data, idx) => (
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
                        {data.institution}
                      </div>

                      <p className="text-sm">
                        {data.degree.split("(")[0].trim()}
                      </p>

                      <p className="text-xs text-base-content/80">
                        {getDuration(data).start}

                        <FiArrowRight
                          className="mx-2 inline-block text-base-content/40"
                          size={12}
                        />

                        {data.current ? "Present" : getDuration(data).end}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
              {filteredEducation && (
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
                            {filteredEducation.degree}
                          </h2>

                          <p className="mt-2 font-medium text-primary">
                            {filteredEducation.institution}
                          </p>

                          {filteredEducation.result && (
                            <span className="mt-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                              Result: {filteredEducation.result}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {filteredEducation.current ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                              Currently Studying
                            </span>
                          ) : (
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              <span>
                                {getDuration(filteredEducation).start}
                              </span>
                              <FiArrowRight size={14} />
                              <span>{getDuration(filteredEducation).end}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl rounded-t-none border border-white/5 border-t-0 border-b-3 bg-white/[0.02] p-6">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Academic Highlights
                        </h3>

                        <div className="mt-4 space-y-3">
                          {filteredEducation.academicHighlights.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 mb-5 last:mb-0"
                              >
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                                <p className="text-sm leading-7 text-base-content/60">
                                  {item}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="my-8 h-px bg-white/10" />

                      <div>
                        <h3 className="text-lg font-semibold">Coursework</h3>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {filteredEducation.coursework.map((course) => (
                            <span
                              key={course}
                              className="rounded-full border border-white/10 border-b-2 bg-white/3 px-3 py-1.5 text-xs font-medium text-base-content/60 transition-colors hover:border-primary/30 hover:text-primary"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="my-8 h-px bg-white/10" />

                      <div>
                        <h3 className="text-lg font-semibold">
                          Skills Developed
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {filteredEducation.skillsDeveloped.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/10 border-b-2 bg-white/3 px-3 py-1.5 text-xs font-medium text-base-content/60 transition-colors hover:border-primary/30 hover:text-primary"
                            >
                              {skill}
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

      <div className="pointer-events-none absolute top-20 -right-10 -z-1 select-none md:-right-60 lg:-right-100">
        <div className="h-75 w-75 rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] blur-[100px] md:h-137.5 md:w-137.5 md:blur-[140px] lg:h-175 lg:w-175" />
      </div>
    </section>
  );
};

export default EducationalBackground;
