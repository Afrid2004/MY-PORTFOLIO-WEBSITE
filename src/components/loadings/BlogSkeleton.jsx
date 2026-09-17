import React from "react";

const BlogSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <article
          key={index}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-base-content/10">
            {/* Category */}
            <div className="absolute left-4 top-4 h-7 w-24 rounded-full bg-base-content/10" />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            {/* Meta */}
            <div className="flex items-center gap-4">
              <div className="h-3 w-24 rounded bg-base-content/10" />
              <div className="h-3 w-20 rounded bg-base-content/10" />
            </div>

            {/* Title */}
            <div className="mt-4 space-y-2">
              <div className="h-5 w-full rounded bg-base-content/10" />
              <div className="h-5 w-4/5 rounded bg-base-content/10" />
            </div>

            {/* Excerpt */}
            <div className="mt-3 space-y-2">
              <div className="h-3.5 w-full rounded bg-base-content/10" />
              <div className="h-3.5 w-full rounded bg-base-content/10" />
            </div>

            {/* Divider */}
            <div className="mt-6 h-px w-full bg-white/10" />

            {/* Read More */}
            <div className="mt-auto pt-5">
              <div className="h-4 w-28 rounded bg-base-content/10" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogSkeleton;
