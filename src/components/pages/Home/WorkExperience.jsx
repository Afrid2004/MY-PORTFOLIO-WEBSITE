"use client";

import Reveal from "@/components/Reavel/Reavel";
import React, { useState } from "react";

const WorkExperience = () => {
  const [filter, setFilter] = useState(0);
  const workExperiences = [
    {
      id: 1,
      role: "Junior Full Stack Web Developer",
      company: "Centre for Computer Studies Ltd.",
      duration: "March 2026 – Present",
      address: "72, Nizam Shankar Plaza, 3rd Floor, Satmasjid Road, Dhaka",
      addressUrl:
        "https://www.google.com/search?q=centre+for+computer+studies+ltd.+address",
      responsibilities: [
        "Develop and maintain web applications using PHP, Laravel, React.js and MySQL.",
        "Build CRUD functionalities, REST APIs, and database-driven applications.",
        "Develop responsive UIs using HTML, CSS, JavaScript, Bootstrap and Tailwind CSS.",
        "Debug applications and use Git and GitHub for version control.",
      ],
      technologies: [
        "PHP",
        "Laravel",
        "React.js",
        "MySQL",
        "JavaScript",
        "Tailwind CSS",
        "Bootstrap",
        "Git",
        "GitHub",
      ],
      current: true,
    },

    {
      id: 2,
      role: "Front-End Developer",
      company: "webnewsdesign.com",
      duration: "September 2025 – February 2026",
      address:
        "89/A (3rd floor), Anarkoli Super Market, 77/1 Shiddheswari Ln, Dhaka 1217",
      addressUrl: "https://maps.app.goo.gl/d5iYeJ1SG3cPWbxD8",
      responsibilities: [
        "Developed responsive news portals using HTML, CSS, JavaScript and Bootstrap.",
        "Customized WordPress themes and plugins according to project requirements.",
        "Improved frontend performance and responsiveness.",
        "Collaborated with designers and content teams to deliver production-ready websites.",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "WordPress"],
      current: false,
    },
  ];

  const filteredWork = workExperiences[filter];
  return (
    <section className="py-20">
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

        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <div className="flex flex-col gap-5">
              {workExperiences.map((data, idx) => {
                return (
                  <Reveal
                    key={data.id}
                    initial="opacity-0 translate-y-10"
                    view="opacity-100 translate-y-0"
                    transition="transition-all duration-150"
                    viewport={0.1}
                  >
                    <div
                      onClick={() => setFilter(idx)}
                      className={`flex flex-col gap-3 rounded-2xl px-4 py-3 cursor-pointer border border-l-3 transition-all duration-75 ${
                        filter === idx
                          ? "active border-l-primary bg-primary/5 border-primary/10 hover:bg-primary/7"
                          : "border-l-white/20 border-white/5 bg-white/5 hover:bg-white/7"
                      }`}
                    >
                      <div
                        className={`${filter === idx ? "text-primary" : ""}`}
                      >
                        {data.company}
                      </div>

                      <p className="text-sm">{data.role}</p>
                      <p className="text-xs text-base-content/80">
                        {data.duration}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <div className="col-span-9">
            <Reveal
              key={filter}
              initial="opacity-0 translate-y-10"
              view="opacity-100 translate-y-0"
              transition="transition-all duration-400"
              viewport={0.3}
            >
              <div>
                <div className="px-6 py-6 border rounded-3xl rounded-b-none border-primary/10 border-b border-b-white/10 bg-primary/7">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="mt-2 text-2xl md:text-3xl font-semibold">
                        {filteredWork.company}
                      </h2>

                      <p className="mt-2 text-primary font-medium">
                        {filteredWork.role}
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <span className="text-sm text-base-content/80">
                        {filteredWork.duration}
                      </span>

                      {filteredWork.current && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          Currently Working
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl rounded-t-none border-b-3 border-t-0 bg-white/[0.02] overflow-hidden border border-white/5">
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-wider text-base-content/80">
                      Location
                    </p>

                    <a
                      href={filteredWork.addressUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-base-content/70 hover:text-primary transition-colors"
                    >
                      {filteredWork.address}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Responsibilities</h3>

                    <div className="mt-4 space-y-3">
                      {filteredWork.responsibilities.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 mb-5 last:mb-0"
                        >
                          <span className=" h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <p className="text-sm leading-none text-base-content/60">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-8 h-px bg-white/10" />

                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold">Technologies</h3>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {filteredWork.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="
                rounded-full
                border border-white/10
                bg-white/3
                border-b-2
                px-3 py-1.5
                text-xs
                font-medium
                text-base-content/60
                transition-colors
                hover:border-primary/30
                hover:text-primary
              "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
