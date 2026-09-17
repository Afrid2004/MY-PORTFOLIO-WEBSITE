import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight, FiFileText } from "react-icons/fi";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 px-4 py-16">
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">

          {/* 404 */}
          <p className="mt-8 text-7xl font-bold tracking-tight text-primary sm:text-8xl">
            404
          </p>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
            Page not found
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-base-content/50 sm:text-base">
            Sorry, the page you are looking for doesn&apos;t exist or may have
            been moved to another location.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-content transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
            >
              <FiArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Home
            </Link>

            <Link
              href="/blogs"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-base-content/70 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5 hover:text-primary active:scale-[0.98]"
            >
              Explore Blog
              <FiArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Top Left Glow */}
      <div className="pointer-events-none absolute -left-48 top-20 -z-0 select-none">
        <div className="h-125 w-125 rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] blur-[140px]" />
      </div>

      {/* Bottom Right Glow */}
      <div className="pointer-events-none absolute -bottom-48 -right-48 -z-0 select-none">
        <div className="h-125 w-125 rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] blur-[140px]" />
      </div>
    </main>
  );
};

export default NotFound;
