import React from "react";

const ProjectsSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Search */}
      <div className="mb-5 mx-auto max-w-xl">
        <div className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03]" />
      </div>

      {/* Categories */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-9 w-20 rounded-full bg-base-content/10"
          />
        ))}
      </div>

      {/* Result Count */}
      <div className="mb-6 flex items-center justify-between">
        <div className="h-4 w-24 rounded bg-base-content/10" />
        <div className="h-4 w-24 rounded bg-base-content/10" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <article
            key={index}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] bg-base-content/10">
              <div className="absolute left-4 top-4 h-7 w-24 rounded-full bg-base-content/10" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-5 w-full rounded bg-base-content/10" />
                <div className="h-5 w-4/5 rounded bg-base-content/10" />
              </div>

              {/* Description */}
              <div className="mt-3 space-y-2">
                <div className="h-3.5 w-full rounded bg-base-content/10" />
                <div className="h-3.5 w-full rounded bg-base-content/10" />
                <div className="h-3.5 w-3/4 rounded bg-base-content/10" />
              </div>

              {/* Technologies */}
              <div className="mt-5 flex flex-wrap gap-2">
                <div className="h-6 w-16 rounded-full bg-base-content/10" />
                <div className="h-6 w-20 rounded-full bg-base-content/10" />
                <div className="h-6 w-14 rounded-full bg-base-content/10" />
              </div>

              {/* Divider */}
              <div className="mt-6 h-px w-full bg-white/10" />

              {/* Buttons */}
              <div className="mt-auto flex gap-3 pt-5">
                <div className="h-10 flex-1 rounded-xl bg-base-content/10" />
                <div className="h-10 flex-1 rounded-xl bg-base-content/10" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSkeleton;
