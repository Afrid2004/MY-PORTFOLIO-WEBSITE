import React from "react";

const WorkExperienceLoading = () => {
  return (
    <div className="divide-y divide-base-content/10">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 gap-5 px-4 py-4 sm:px-5 sm:py-5 md:grid-cols-12 md:items-center md:gap-0"
        >
          {/* Experience */}
          <div className="min-w-0 md:col-span-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Drag Handle */}
                <div className="hidden h-8 w-8 animate-pulse rounded-lg bg-base-content/10 md:flex" />

                <div className="min-w-0">
                  {/* Role */}
                  <div className="h-4 w-36 animate-pulse rounded bg-base-content/10" />

                  {/* Company */}
                  <div className="mt-2 h-3 w-28 animate-pulse rounded bg-base-content/10" />

                  {/* Experience ID */}
                  <div className="mt-2 h-2.5 w-24 animate-pulse rounded bg-base-content/10" />
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex shrink-0 items-center gap-2 md:hidden">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-base-content/10" />
                <div className="h-9 w-9 animate-pulse rounded-lg bg-base-content/10" />
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between gap-3 md:block">
              {/* Mobile Label */}
              <div className="h-2.5 w-8 animate-pulse rounded bg-base-content/10 md:hidden" />

              <div className="text-right md:text-left">
                {/* Date */}
                <div className="ml-auto h-3 w-32 animate-pulse rounded bg-base-content/10 md:ml-0" />

                {/* Current Badge */}
                <div className="mt-2 h-5 w-16 animate-pulse rounded-full bg-base-content/10" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between gap-3 md:block">
              {/* Mobile Label */}
              <div className="h-2.5 w-10 animate-pulse rounded bg-base-content/10 md:hidden" />

              {/* Status Badge */}
              <div className="h-6 w-16 animate-pulse rounded-full bg-base-content/10" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center justify-end gap-2 md:col-span-2 md:flex">
            <div className="h-9 w-9 animate-pulse rounded-lg bg-base-content/10" />
            <div className="h-9 w-9 animate-pulse rounded-lg bg-base-content/10" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkExperienceLoading;
