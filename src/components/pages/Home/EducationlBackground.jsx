"use client";

import Reveal from "@/components/Reavel/Reavel";
import React, { useState } from "react";

const EducationalBackground = () => {
  const [filter, setFilter] = useState(0);
  const educations = [
    {
      id: 1,
      degree: "B.Sc. in Engineering (CSE)",
      institution: "Northern University Bangladesh",
      duration: "2025 – Ongoing",
      result: null,

      academicHighlights: [
        "Currently pursuing a Bachelor's degree in Computer Science & Engineering.",
        "Building a strong foundation in software development, algorithms and computer science.",
        "Developing practical skills in web application development and database systems.",
        "Working with modern programming technologies and software engineering practices.",
        "Strengthening problem-solving and system design skills through academic projects.",
      ],

      coursework: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Object-Oriented Programming",
        "Computer Networks",
        "Operating Systems",
        "Software Engineering",
        "Web Development",
        "System Analysis & Design",
      ],

      skillsDeveloped: [
        "Programming",
        "Web Development",
        "Database Design",
        "Problem Solving",
        "Software Engineering",
        "System Analysis",
        "Technical Documentation",
      ],
    },

    {
      id: 2,
      degree: "Diploma in Engineering (Computer Technology)",
      institution: "Feni Government Polytechnic Institute",
      duration: "2020 – 2024",
      result: "CGPA: 3.67 out of 4.00",

      academicHighlights: [
        "Successfully completed a comprehensive Diploma in Computer Technology.",
        "Developed a strong foundation in programming and computer systems.",
        "Gained hands-on experience in web development and database management.",
        "Worked with both software and hardware components of computer systems.",
        "Developed practical problem-solving and troubleshooting skills.",
      ],

      coursework: [
        "Programming Fundamentals",
        "Web Development",
        "Database Systems",
        "Computer Architecture",
        "Operating Systems",
        "Software Engineering",
        "Computer Networking",
        "Digital Electronics",
      ],

      skillsDeveloped: [
        "Programming Languages",
        "Web Development",
        "Database Design",
        "System Administration",
        "Problem Solving",
        "Computer Hardware",
        "Technical Documentation",
      ],
    },

    {
      id: 3,
      degree: "Secondary School Certificate (Science)",
      institution: "Goran Adarsha High School",
      duration: "2019 – 2020",
      result: "GPA: 4.89 out of 5.00",

      academicHighlights: [
        "Successfully completed Secondary School Certificate in Science.",
        "Built a strong foundation in mathematics, science and analytical thinking.",
        "Developed early interest in computer technology and programming.",
        "Strengthened problem-solving and logical reasoning abilities.",
      ],

      coursework: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "ICT",
        "General Science",
      ],

      skillsDeveloped: [
        "Analytical Thinking",
        "Problem Solving",
        "Mathematical Reasoning",
        "Scientific Thinking",
        "ICT Fundamentals",
      ],
    },
  ];

  const filteredEducation = educations[filter];
  return (
    <section className="py-20 relative">
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

        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-wrap lg:flex-nowrap lg:flex-col gap-5">
              {educations.map((data, idx) => {
                return (
                  <Reveal
                    key={data.id}
                    initial="opacity-0 translate-y-10"
                    view="opacity-100 translate-y-0"
                    transition="transition-all duration-150"
                    viewport={0.1}
                    className="w-full sm:w-[calc(50%-0.625rem)] lg:w-full"
                  >
                    <div
                      onClick={() => setFilter(idx)}
                      className={`h-full flex flex-col gap-3 rounded-2xl px-4 py-3 cursor-pointer border border-l-3 transition-all duration-75 ${
                        filter === idx
                          ? "active border-l-primary bg-primary/5 border-primary/10 hover:bg-primary/7"
                          : "border-l-white/20 border-white/5 bg-white/5 hover:bg-white/7"
                      }`}
                    >
                      <div
                        className={`${filter === idx ? "text-primary" : ""}`}
                      >
                        {data.institution}
                      </div>

                      <p className="text-sm">{data.degree}</p>
                      <p className="text-xs text-base-content/80">
                        {data.duration}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <Reveal
              key={filter}
              initial="opacity-0 translate-y-10"
              view="opacity-100 translate-y-0"
              transition="transition-all duration-400"
              viewport={0.3}
            >
              <div>
                {/* Header */}
                <div className="rounded-t-3xl border border-primary/10 border-b-white/10 bg-primary/5 px-6 py-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold md:text-3xl">
                        {filteredEducation.degree}
                      </h2>

                      <p className="mt-2 font-medium text-primary">
                        {filteredEducation.institution}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <span className="text-sm text-base-content/80">
                        {filteredEducation.duration}
                      </span>

                      {filteredEducation.result && (
                        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {filteredEducation.result}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="overflow-hidden rounded-b-3xl border border-t-0 border-white/5 bg-white/[0.02] p-6">
                  {/* Academic Highlights */}
                  <div>
                    <h3 className="text-lg font-semibold">
                      Academic Highlights
                    </h3>

                    <div className="mt-4 space-y-4">
                      {filteredEducation.academicHighlights.map(
                        (item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                            <p className="text-sm leading-7 text-base-content/60">
                              {item}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-8 h-px bg-white/10" />

                  {/* Coursework */}
                  <div>
                    <h3 className="text-lg font-semibold">Coursework</h3>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {filteredEducation.coursework.map((course) => (
                        <span
                          key={course}
                          className="
                  rounded-full
                  border border-white/10
                  border-b-2
                  bg-white/3
                  px-3 py-1.5
                  text-xs
                  font-medium
                  text-base-content/60
                  transition-all duration-300
                  hover:border-primary/30
                  hover:bg-primary/5
                  hover:text-primary
                "
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-8 h-px bg-white/10" />

                  {/* Skills Developed */}
                  <div>
                    <h3 className="text-lg font-semibold">Skills Developed</h3>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {filteredEducation.skillsDeveloped.map((skill) => (
                        <span
                          key={skill}
                          className="
                  rounded-full
                  border border-white/10
                  border-b-2
                  bg-white/3
                  px-3 py-1.5
                  text-xs
                  font-medium
                  text-base-content/60
                  transition-all duration-300
                  hover:border-primary/30
                  hover:bg-primary/5
                  hover:text-primary
                "
                        >
                          {skill}
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

      <div className="absolute top-20 -right-10 md:-right-60 lg:-right-100 pointer-events-none select-none -z-1">
        <div
          className="
      w-75 h-75
      md:w-137.5 md:h-137.5
      lg:w-175 lg:h-175
      rounded-full
      blur-[100px] md:blur-[140px]
      bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
    "
        />
      </div>
    </section>
  );
};

export default EducationalBackground;
