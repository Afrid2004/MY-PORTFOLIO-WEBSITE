"use client";

import React from "react";
import { FiAlertTriangle, FiArrowLeft, FiRefreshCw } from "react-icons/fi";

const ErrorPage = ({ error, reset }) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 px-4 py-16">
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          {/* Error Code */}
          <p className="mt-8 text-7xl font-bold tracking-tight text-primary sm:text-8xl">
            500
          </p>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
            Something went wrong
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-base-content/50 sm:text-base">
            Something unexpected happened while loading this page. Please try
            again or return to the homepage.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="group cursor-pointer inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-content transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
            >
              <FiRefreshCw
                size={16}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
              Try Again
            </button>

            <a
              href="/"
              className="group cursor-pointer inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-base-content/70 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5 hover:text-primary active:scale-[0.98]"
            >
              <FiArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Home
            </a>
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

export default ErrorPage;
