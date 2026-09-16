import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiTag,
  FiFileText,
  FiFolder,
} from "react-icons/fi";

const getBlog = async (slug) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/blog/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch blog:", error);
    return null;
  }
};

// Dynamic SEO metadata

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const canonicalUrl = `${baseUrl}/blog/${blog.slug}`;

  const imageUrl = blog.image || `${baseUrl}/og-image.jpg`;

  const title = blog.title;

  const description =
    blog.excerpt ||
    `Read ${blog.title} about ${blog.category || "web development"}.`;

  const keywords = Array.isArray(blog.keywords) ? blog.keywords : [];

  return {
    title,

    description,

    keywords,

    authors: [
      {
        name: "MD Faisal Yousuf Afrid",
      },
    ],

    creator: "MD Faisal Yousuf Afrid",

    publisher: "MD Faisal Yousuf Afrid",

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: blog.status === true,
      follow: blog.status === true,
    },

    openGraph: {
      title,

      description,

      url: canonicalUrl,

      siteName: "MD Faisal Yousuf Afrid",

      type: "article",

      publishedTime: blog.publishedAt
        ? new Date(blog.publishedAt).toISOString()
        : undefined,

      modifiedTime: blog.updatedAt
        ? new Date(blog.updatedAt).toISOString()
        : undefined,

      authors: ["MD Faisal Yousuf Afrid"],

      section: blog.category,

      tags: Array.isArray(blog.tags) ? blog.tags : [],

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [imageUrl],

      creator: "@yourusername",
    },
  };
}

const BlogDetails = async ({ params }) => {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "No date";

  return (
    <main className="relative overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="container relative z-10">
        {/* Top Navigation */}
        <div className="mx-auto mb-10 max-w-6xl">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-base-content/50 transition-colors duration-300 hover:text-primary"
          >
            <FiArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="mx-auto mb-12 max-w-5xl text-center md:mb-16">
          {/* Category */}
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight text-base-content sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-base-content/55 md:text-lg">
            {blog.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-base-content/45">
            <span className="flex items-center gap-2">
              <FiCalendar size={15} />
              {blog.publishedAt}
            </span>

            <span className="h-1 w-1 rounded-full bg-base-content/20" />

            <span className="flex items-center gap-2">
              <FiClock size={15} />
              {blog.readTime ? `${blog.readTime} min read` : "Quick read"}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-12 items-start gap-8 lg:gap-10">
            <div className="col-span-12 lg:col-span-8">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-base-200 shadow-2xl shadow-black/10 md:rounded-3xl">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-base-content/30">
                    No image available
                  </div>
                )}
              </div>

              {/* Article Content */}
              <article className="mt-10 min-w-0 md:mt-12">
                <div
                  className="blog-content text-[16px] leading-[1.9] text-base-content/70 md:text-[17px] [&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:text-base-content md:[&_h2]:text-4xl [&_h3]:mb-4 [&_h3]:mt-12 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:tracking-tight [&_h3]:text-base-content md:[&_h3]:text-3xl [&_p]:mb-7 [&_ul]:my-7 [&_ul]:ml-6 [&_ul]:list-disc [&_ol]:my-7 [&_ol]:ml-6 [&_ol]:list-decimal [&_li]:mb-3 [&_li]:pl-1 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-base-content [&_code]:rounded-md [&_code]:bg-base-300 [&_code]:px-1.5 [&_code]:py-1 [&_code]:font-mono [&_code]:text-sm [&_code]:text-primary [&_blockquote]:my-10 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:bg-primary/5 [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:italic [&_blockquote]:text-base-content/60 [&_img]:my-10 [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-white/10"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </article>

              {/* Tags */}
              {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                <div className="mt-12 border-t border-white/10 pt-8">
                  <div className="mb-4 flex items-center gap-2">
                    <FiTag size={15} className="text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-base-content/40">
                      Tags
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                        className="rounded-full border border-white/10 bg-base-200 px-3.5 py-2 text-xs text-base-content/55 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Navigation */}
              <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-base-content/50 transition-colors duration-300 hover:text-primary"
                >
                  <FiArrowLeft
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  All Articles
                </Link>

                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-base-content/50 transition-colors duration-300 hover:text-primary"
                >
                  More Articles
                  <FiArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>


            <aside className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                {/* Article Details */}
                <div className="rounded-2xl border border-white/10 bg-base-200/60 p-6 md:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FiFileText size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-base-content">
                        Article Details
                      </p>

                      <p className="mt-0.5 text-xs text-base-content/35">
                        About this article
                      </p>
                    </div>
                  </div>

                  <div className="my-6 h-px bg-white/10" />

                  {/* Published */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 text-base-content/35">
                      <FiCalendar size={16} />
                    </div>

                    <div>
                      <p className="text-xs text-base-content/35">Published</p>

                      <p className="mt-1 text-sm font-medium text-base-content/70">
                        {blog.publishedAt}
                      </p>
                    </div>
                  </div>

                  {/* Reading Time */}
                  <div className="mt-5 flex items-start gap-4">
                    <div className="mt-0.5 text-base-content/35">
                      <FiClock size={16} />
                    </div>

                    <div>
                      <p className="text-xs text-base-content/35">
                        Reading Time
                      </p>

                      <p className="mt-1 text-sm font-medium text-base-content/70">
                        {blog.readTime
                          ? `${blog.readTime} min read`
                          : "Quick read"}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mt-5 flex items-start gap-4">
                    <div className="mt-0.5 text-base-content/35">
                      <FiFolder size={16} />
                    </div>

                    <div>
                      <p className="text-xs text-base-content/35">Category</p>

                      <p className="mt-1 text-sm font-medium text-primary">
                        {blog.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Topics */}
                {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-base-200/60 p-6 md:p-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FiTag size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-base-content">
                          Topics
                        </p>

                        <p className="mt-0.5 text-xs text-base-content/35">
                          Covered in this article
                        </p>
                      </div>
                    </div>

                    <div className="my-6 h-px bg-white/10" />

                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="rounded-lg border border-white/10 bg-base-300/50 px-3 py-2 text-xs text-base-content/50 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category Card */}
                <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/[0.03] p-6 md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/70">
                    Category
                  </p>

                  <p className="mt-3 text-xl font-semibold tracking-tight text-base-content">
                    {blog.category}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-base-content/40">
                    Explore more articles and tutorials related to{" "}
                    {blog.category}.
                  </p>

                  <Link
                    href="/blog"
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Browse articles
                    <FiArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
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

export default BlogDetails;
