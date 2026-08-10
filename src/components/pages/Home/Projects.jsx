"use client";

import React, { useState } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaLaravel,
} from "react-icons/fa";
import {
  SiMongodb,
  SiFirebase,
  SiTailwindcss,
  SiMysql,
  SiExpress,
  SiNextdotjs,
  SiJsonwebtokens,
} from "react-icons/si";
import { BiCheckShield } from "react-icons/bi";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Full Stack", "Frontend", "Backend"];

  const projects = [
    {
      id: 1,
      title: "EverFast Express",
      category: "Full Stack",
      description:
        "A full-stack courier management platform for managing parcels, riders, deliveries, payments, tracking and delivery analytics.",
      image: "/assets/images/everfast.png",
      featured: true,
      technologies: [
        {
          name: "React",
          icon: FaReact,
          color: "#61DAFB",
        },
        {
          name: "Node.js",
          icon: FaNodeJs,
          color: "#68A063",
        },
        {
          name: "MongoDB",
          icon: SiMongodb,
          color: "#47A248",
        },
        {
          name: "Firebase",
          icon: SiFirebase,
          color: "#FFCA28",
        },
        {
          name: "JWT",
          icon: SiJsonwebtokens,
          color: "#F0F0F0",
        },
      ],
      liveUrl: "https://ever-fast-express.vercel.app/",
      githubUrl: "https://github.com/Afrid2004/EVER-FAST-EXPRESS-CLIENT",
    },
    {
      id: 2,
      title: "Hero Kidz",
      category: "Full Stack",
      description:
        "A modern educational platform built with Next.js featuring authentication, user management and a responsive learning-focused interface.",
      image: "/assets/images/herokidz.png",
      featured: true,
      technologies: [
        {
          name: "Next.js",
          icon: SiNextdotjs,
          color: "#EAEAEA",
        },
        {
          name: "React",
          icon: FaReact,
          color: "#61DAFB",
        },
        {
          name: "MongoDB",
          icon: SiMongodb,
          color: "#47A248",
        },
        {
          name: "NextAuth",
          icon: BiCheckShield,
          color: "#EAEAEA",
        },
        {
          name: "Tailwind CSS",
          icon: SiTailwindcss,
          color: "#06B6D4",
        },
      ],
      liveUrl: "https://next-js-hero-kidz.vercel.app/",
      githubUrl: "https://github.com/Afrid2004/NEXT-JS-HERO-KIDZ",
    },

    /*
  {
    id: 3,
    title: "Smart Deals",
    category: "Full Stack",
    description:
      "An auction and bidding platform where users can explore products, place bids and manage their auction activities.",
    image: "/assets/images/smartdeals.png",
    featured: true,
    technologies: [
      {
        name: "React",
        icon: FaReact,
        color: "#61DAFB",
      },
      {
        name: "Node.js",
        icon: FaNodeJs,
        color: "#68A063",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#47A248",
      },
      {
        name: "Firebase",
        icon: SiFirebase,
        color: "#FFCA28",
      },
    ],
    liveUrl: "https://my-smart-deals.vercel.app/",
    githubUrl: "https://github.com/Afrid2004",
  },
  */

    {
      id: 4,
      title: "Car Verse",
      category: "Frontend",
      description:
        "A modern responsive car platform built with React, featuring a clean interface for exploring and discovering vehicles.",
      image: "/assets/images/carverse.png",
      featured: false,
      technologies: [
        {
          name: "React",
          icon: FaReact,
          color: "#61DAFB",
        },
        {
          name: "Tailwind CSS",
          icon: SiTailwindcss,
          color: "#06B6D4",
        },
      ],
      liveUrl: "https://react-car-verse.vercel.app/",
      githubUrl: "https://github.com/Afrid2004/Car-Verse",
    },

    {
      id: 5,
      title: "Fast Drop",
      category: "Backend",
      description:
        "A courier management system developed using PHP MVC architecture for managing parcels, customers, riders and delivery operations.",
      image: "/assets/images/fastdrop.png",
      featured: false,
      technologies: [
        {
          name: "PHP",
          icon: FaPhp,
          color: "#777BB4",
        },
        {
          name: "Tailwind CSS",
          icon: SiTailwindcss,
          color: "#06B6D4",
        },
        {
          name: "MySQL",
          icon: SiMysql,
          color: "#4479A1",
        },
      ],
      liveUrl: "https://fast-drop.faisalfreelancer.com/",
      githubUrl: "https://github.com/Afrid2004/ISDB-PROJECT-FAST-DROP-MVC",
    },
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="gradient-border w-fit p-0.5 mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />

              <span className="text-sm font-medium uppercase tracking-wider">
                My Projects
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight"
          >
            Things I've <span className="text-primary">Built</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-5 text-base leading-8 text-base-content/60"
          >
            A collection of projects I've built while learning, experimenting,
            and solving real world problems.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileTap={{ scale: 0.96 }}
                className={`relative inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium cursor-pointer ${
                  filter === category
                    ? "text-primary"
                    : "text-base-content hover:text-primary"
                }`}
              >
                {filter === category && (
                  <motion.span
                    layoutId="projectFilter"
                    className="absolute inset-0 rounded-full border-2 border-primary bg-primary/5"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}

                {filter !== category && (
                  <span className="absolute inset-0 rounded-full border-2 border-white/15 transition-colors duration-300 hover:border-primary/40" />
                )}

                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              exit={{
                opacity: 0,
                y: 10,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  variants={itemVariants}
                  className="
                    group relative overflow-hidden
                    rounded-3xl
                    border border-white/10
                    bg-white/3
                    transition-all duration-500
                    hover:border-primary/30
                  "
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1900}
                      height={1080}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                    <div
                      className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/20
                        to-transparent
                        opacity-70
                        transition-opacity
                        duration-500
                        group-hover:opacity-90
                      "
                    />

                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-black/40 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          Featured
                        </span>
                      </div>
                    )}

                    <div className="absolute top-4 right-4">
                      <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    <div
                      className="
                        absolute bottom-4 right-4
                      "
                    >
                      <a
                        href={project.liveUrl}
                        className="flex h-11 w-11
                        items-center justify-center
                        rounded-full
                        border border-white/15
                        bg-black/40
                        text-white
                        backdrop-blur-md
                        transition-all duration-300
                        group-hover:border-primary/40
                        group-hover:bg-primary
                        group-hover:text-primary-content"
                      >
                        <FaExternalLinkAlt className="text-sm" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-base-content/55">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => {
                        const TechIcon = tech.icon;

                        return (
                          <span
                            key={tech.name}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-base-content/70 transition-colors duration-300 group-hover:border-white/15"
                          >
                            {TechIcon && (
                              <TechIcon
                                style={{
                                  color: tech.color,
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

                    <div className="flex items-center gap-3">
                      {project.liveUrl !== "#" ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-primary
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-primary-content
                            transition-all
                            duration-300
                            hover:brightness-110
                            hover:-translate-y-0.5
                          "
                        >
                          <FaExternalLinkAlt className="text-xs" />
                          Live Demo
                        </a>
                      ) : (
                        <span
                          className="
                            inline-flex
                            flex-1
                            cursor-not-allowed
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-white/5
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-base-content/30
                          "
                        >
                          Coming Soon
                        </span>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          flex-1
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-white/10
                          bg-white/3
                          px-4
                          py-2.5
                          text-sm
                          font-semibold
                          transition-all
                          duration-300
                          hover:border-white/20
                          hover:bg-white/6
                          hover:-translate-y-0.5
                        "
                      >
                        <FaGithub className="text-base" />
                        GitHub
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/Afrid2004"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/3
              px-6
              py-3
              text-sm
              font-medium
              transition-all
              duration-300
              hover:border-primary/40
              hover:bg-primary/5
              hover:text-primary
            "
          >
            <FaGithub />
            View More Projects
            <FaExternalLinkAlt className="text-xs" />
          </a>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -right-40 top-40 -z-10">
        <div
          className="
            h-[500px]
            w-[500px]
            rounded-full
            bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
            blur-[140px]
            opacity-40
          "
        />
      </div>

      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10">
        <div
          className="
            h-[450px]
            w-[450px]
            rounded-full
            bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
            blur-[140px]
            opacity-25
          "
        />
      </div>
    </section>
  );
};

export default Projects;
