import React from "react";

const TestimonialSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex min-h-82.5 animate-pulse flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6"
        >
          {/* Top */}
          <div className="flex items-start justify-between">
            {/* Quote Skeleton */}
            <div className="h-14 w-14 rounded-2xl bg-base-content/10" />

            {/* Rating Skeleton */}
            <div className="flex items-center gap-1 pt-1">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-3.5 w-3.5 rounded-full bg-base-content/10"
                />
              ))}
            </div>
          </div>

          {/* Testimonial Skeleton */}
          <div className="mt-6 space-y-2">
            <div className="h-3.5 w-full rounded bg-base-content/10" />
            <div className="h-3.5 w-full rounded bg-base-content/10" />
            <div className="h-3.5 w-4/5 rounded bg-base-content/10" />
            <div className="h-3.5 w-3/5 rounded bg-base-content/10" />
          </div>

          {/* Bottom */}
          <div className="mt-auto pt-6">
            {/* Divider */}
            <div className="h-px w-full bg-white/10" />

            {/* Client */}
            <div className="mt-5 flex items-center">
              {/* Image Skeleton */}
              <div className="h-12 w-12 shrink-0 rounded-full bg-base-content/10" />

              {/* Name Skeleton */}
              <div className="ml-4 space-y-2">
                <div className="h-3.5 w-28 rounded bg-base-content/10" />

                <div className="h-3 w-20 rounded bg-base-content/10" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialSkeleton;
