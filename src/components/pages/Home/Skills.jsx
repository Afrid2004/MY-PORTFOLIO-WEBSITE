"use client";

import React, { useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaLaravel,
  FaWordpress,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa6";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiCalibreweb,
} from "react-icons/si";
import { VscVscodeInsiders } from "react-icons/vsc";
import { FaFigma, FaNpm } from "react-icons/fa6";
import { SiPostman, SiVercel } from "react-icons/si";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "@/components/Reavel/Reavel";

const Skills = () => {
  const [cat, setCat] = useState(0);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const categories = [
    {
      title: "Frontend",
      description: "Building modern & responsive interfaces",
      skills: [
        {
          name: "HTML5",
          icon: FaHtml5,
          color: "#E34F26",
          level: 95,
        },
        {
          name: "CSS3",
          icon: FaCss3Alt,
          color: "#1572B6",
          level: 90,
        },
        {
          name: "JavaScript",
          icon: FaJs,
          color: "#F7DF1E",
          level: 85,
        },
        {
          name: "React.js",
          icon: FaReact,
          color: "#61DAFB",
          level: 85,
        },
        {
          name: "Next.js",
          icon: SiNextdotjs,
          color: "#FFFFFF",
          level: 80,
        },
        {
          name: "Tailwind CSS",
          icon: SiTailwindcss,
          color: "#06B6D4",
          level: 85,
        },
        {
          name: "Bootstrap",
          icon: SiBootstrap,
          color: "#7952B3",
          level: 90,
        },
      ],
    },

    {
      title: "Backend",
      description: "Developing scalable server-side applications",
      skills: [
        {
          name: "Node.js",
          icon: FaNodeJs,
          color: "#339933",
          level: 80,
        },
        {
          name: "Express.js",
          icon: SiExpress,
          color: "#FFFFFF",
          level: 78,
        },
        {
          name: "PHP",
          icon: FaPhp,
          color: "#777BB4",
          level: 85,
        },
        {
          name: "Laravel",
          icon: FaLaravel,
          color: "#FF2D20",
          level: 82,
        },
        {
          name: "MongoDB",
          icon: SiMongodb,
          color: "#47A248",
          level: 78,
        },
        {
          name: "MySQL",
          icon: SiMysql,
          color: "#4479A1",
          level: 85,
        },
        {
          name: "Firebase",
          icon: SiFirebase,
          color: "#FFCA28",
          level: 75,
        },
      ],
    },

    {
      title: "Tools & Others",
      description: "Tools and platforms I use in my development workflow",
      skills: [
        {
          name: "Git",
          icon: FaGitAlt,
          color: "#FF6B4A",
          level: 85,
        },
        {
          name: "GitHub",
          icon: FaGithub,
          color: "#E6E6E6",
          level: 88,
        },

        {
          name: "VS Code",
          icon: VscVscodeInsiders,
          color: "#3BA7FF",
          level: 95,
        },
        {
          name: "Postman",
          icon: SiPostman,
          color: "#FF8A5C",
          level: 85,
        },
        {
          name: "Canva",
          icon: SiCalibreweb,
          color: "#A78BFA",
          level: 80,
        },
        {
          name: "Figma",
          icon: FaFigma,
          color: "#0ACF83",
          level: 75,
        },
        {
          name: "Vercel",
          icon: SiVercel,
          color: "#EAEAEA",
          level: 80,
        },
        {
          name: "npm",
          icon: FaNpm,
          color: "#F05A5A",
          level: 85,
        },
      ],
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={fadeUpVariants}
            className="gradient-border w-fit p-0.5 mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />

              <span className="text-sm font-medium uppercase tracking-wider">
                My Skills
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight"
          >
            Technologies I <span className="text-primary">Work With</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-5 text-base leading-8 text-base-content/60"
          >
            A collection of technologies and tools I use to build modern,
            scalable, and high-performance web applications.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((category, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCat(idx)}
                whileTap={{ scale: 0.97 }}
                className={`relative inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium cursor-pointer w-full sm:w-fit ${
                  cat === idx
                    ? "text-primary"
                    : "text-base-content hover:text-primary"
                }`}
              >
                {cat === idx && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full border-2 border-primary bg-primary/5"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}

                {cat !== idx && (
                  <span className="absolute inset-0 rounded-full border-2 border-white/15" />
                )}

                <span className="relative z-10">{category.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Category Content */}
          <div className="mt-6">
            <div
              key={categories[cat].title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Category Header */}
              <div className="mb-7">
                <h3 className="text-2xl font-semibold">
                  {categories[cat].title}
                </h3>

                <p className="mt-2 text-sm text-base-content/50">
                  {categories[cat].description}
                </p>
              </div>

              {/* Skills */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {categories[cat].skills.map((skill) => {
                  const Icon = skill.icon;

                  return (
                    <Reveal
                      key={skill.name}
                      initial="opacity-0 translate-y-10"
                      view="opacity-100 translate-y-0"
                      transition="transition-all duration-300"
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
                              style={{ color: skill.color }}
                            >
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress */}
                          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="h-full rounded-full"
                              style={{
                                backgroundColor: skill.color,
                                boxShadow: `0 0 10px ${skill.color}60`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-20 -left-10 md:-left-60 lg:-left-80 pointer-events-none select-none -z-1">
        <div
          className="
      w-75 h-75
      md:w-[550px] md:h-[550px]
      lg:w-[700px] lg:h-[700px]
      rounded-full
      blur-[100px] md:blur-[140px]
      bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
    "
        />
      </div>
    </section>
  );
};

export default Skills;
