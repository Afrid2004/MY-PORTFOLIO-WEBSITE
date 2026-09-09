"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiClock, FiCalendar } from "react-icons/fi";
import Reveal from "@/components/Reavel/Reavel";
const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Building Modern Web Applications with Laravel & React",
      excerpt:
        "Learn how Laravel and React can work together to build scalable, maintainable, and modern web applications.",
      category: "Laravel & React",
      date: "Sep 05, 2026",
      readTime: "6 min read",
      image: "/assets/images/blog/laravel-react.jpg",
      slug: "building-modern-web-applications-laravel-react",
    },
    {
      id: 2,
      title: "Next.js vs React: Which One Should You Use?",
      excerpt:
        "A practical comparison between React and Next.js, including their use cases, performance, routing, SEO, and project structure.",
      category: "Next.js",
      date: "Aug 28, 2026",
      readTime: "5 min read",
      image: "/assets/images/blog/nextjs-react.jpg",
      slug: "nextjs-vs-react",
    },
    {
      id: 3,
      title: "REST API Development with Laravel",
      excerpt:
        "A beginner-friendly guide to creating clean REST APIs with Laravel for modern frontend and mobile applications.",
      category: "Backend",
      date: "Aug 20, 2026",
      readTime: "7 min read",
      image: "/assets/images/blog/laravel-api.jpg",
      slug: "rest-api-development-with-laravel",
    },
  ];
  return (
    <section className="relative overflow-hidden py-20">
      <div className="container relative z-10">
        {/* Section Header */}
        <Reveal
          initial="opacity-0 translate-y-6"
          view="opacity-100 translate-y-0"
          className="mb-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="gradient-border mx-auto w-fit p-0.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Blog
                </span>
              </div>
            </div>
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Latest <span className="text-primary">Articles</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-base-content/60">
              Thoughts, tutorials, and practical insights about web development,
              programming, and modern software technologies.
            </p>
          </div>
        </Reveal>
        {/* Blog Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <Reveal
              key={blog.id}
              initial="opacity-0 translate-y-10"
              view="opacity-100 translate-y-0"
              transition="transition-all duration-500"
              viewport={0.1}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/5">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.03]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  {/* Category */}
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex rounded-full border border-primary/20 bg-base-100/80 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
                      {blog.category}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-base-content/40">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar size={13} /> {blog.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiClock size={13} /> {blog.readTime}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-8 transition-colors duration-300 group-hover:text-primary">
                    {blog.title}
                  </h3>
                  {/* Excerpt */}
                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-base-content/60">
                    {blog.excerpt}
                  </p>
                  {/* Divider */}
                  <div className="relative mt-6 h-px w-full overflow-hidden bg-white/10">
                    <div className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                  </div>
                  {/* Read More */}
                  <div className="mt-auto pt-5">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-base-content/70 transition-colors duration-300 hover:text-primary"
                    >
                      Read Article
                      <FiArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {/* View All */}
        <Reveal
          initial="opacity-0 translate-y-6"
          view="opacity-100 translate-y-0"
          transition="transition-all duration-500"
          viewport={0.2}
        >
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              View All Articles
              <FiArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-40 -z-10 select-none">
        <div className="h-100 w-100 rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] blur-[120px]" />
      </div>

    </section>
  );
};
export default Blog;
