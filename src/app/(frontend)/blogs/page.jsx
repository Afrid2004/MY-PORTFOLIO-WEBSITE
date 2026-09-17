"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiSearch,
  FiX,
} from "react-icons/fi";

import Reveal from "@/components/Reavel/Reavel";
import BlogsSkeleton from "./BlogsSkeleton";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.log("Failed to fetch blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Get categories
  const categories = [
    "All",
    ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
  ];

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const searchValue = search.trim().toLowerCase();

    const matchesCategory =
      activeCategory === "All" ||
      blog.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      !searchValue ||
      blog.title?.toLowerCase().includes(searchValue) ||
      blog.excerpt?.toLowerCase().includes(searchValue) ||
      blog.category?.toLowerCase().includes(searchValue) ||
      blog.slug?.toLowerCase().includes(searchValue) ||
      blog.tags?.some((tag) => tag.toLowerCase().includes(searchValue));

    return matchesCategory && matchesSearch;
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
              My Blog
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-base-content sm:text-5xl md:text-6xl">
              Thoughts, Tutorials &{" "}
              <span className="text-primary">Insights</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-base-content/50 md:text-lg">
              Practical articles about web development, Laravel, React, Next.js,
              JavaScript, databases, and my journey as a developer.
            </p>
          </header>
        </Reveal>

        {/* Loading */}
        {loading ? (
          <BlogsSkeleton />
        ) : blogs.length > 0 ? (
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
                      placeholder="Search articles..."
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
                      className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
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
                {filteredBlogs.length}{" "}
                {filteredBlogs.length === 1 ? "article" : "articles"}
              </p>

              {search || activeCategory !== "All" ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="text-xs font-medium text-primary transition-colors hover:text-primary/70"
                >
                  Clear filters
                </button>
              ) : null}
            </div>

            {/* Blog Grid / Filter Empty State */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map((blog) => (
                  <Reveal
                    key={blog._id}
                    initial="opacity-0 translate-y-10"
                    view="opacity-100 translate-y-0"
                    transition="transition-all duration-500"
                    viewport={0.1}
                  >
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/5">
                      {/* Image */}
                      <Link href={`/blog/${blog.slug}`} className="block">
                        <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.03]">
                          {blog.image ? (
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm text-base-content/20">
                              No image available
                            </div>
                          )}

                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                          {/* Category */}
                          <div className="absolute left-4 top-4">
                            <span className="inline-flex rounded-full border border-primary/20 bg-base-100/80 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
                              {blog.category}
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-base-content/40">
                          <span className="flex items-center gap-1.5">
                            <FiCalendar size={13} />

                            {blog.publishedAt
                              ? new Date(blog.publishedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                  },
                                )
                              : "No date"}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <FiClock size={13} />

                            {blog.readTime
                              ? `${blog.readTime} min read`
                              : "Quick read"}
                          </span>
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${blog.slug}`}>
                          <h2 className="mt-4 line-clamp-2 text-xl font-semibold leading-8 transition-colors duration-300 hover:text-primary">
                            {blog.title}
                          </h2>
                        </Link>

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
            ) : (
              /* No Result After Search / Filter */
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FiSearch size={22} />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-base-content">
                  No articles found
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
                  View All Articles
                  <FiArrowUpRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          /* No Blogs In Database */
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FiSearch size={22} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-base-content">
              No articles found
            </h2>

            <p className="mt-2 max-w-md text-sm leading-7 text-base-content/40">
              There are no published articles available right now.
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

export default BlogPage;
