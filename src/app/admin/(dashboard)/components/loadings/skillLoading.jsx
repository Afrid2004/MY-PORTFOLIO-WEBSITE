import React from "react";

const SkillLoading = () => {
  return (
    <div className="divide-y divide-base-content/10">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-4 px-4 py-4 transition-colors sm:px-5 sm:py-5 md:grid-cols-12 md:items-center md:gap-0"
        >
          {/* Skill */}
          <div className="min-w-0 md:col-span-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                {/* Icon */}
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-base-300" />

                <div className="min-w-0">
                  {/* Skill name */}
                  <div className="mb-2 h-3.5 w-28 max-w-full animate-pulse rounded bg-base-300" />

                  {/* Skill ID */}
                  <div className="h-2.5 w-20 max-w-full animate-pulse rounded bg-base-300" />
                </div>
              </div>

              {/* Actions - Mobile */}
              <div className="flex shrink-0 items-center gap-2 md:hidden">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-base-300" />
                <div className="h-9 w-9 animate-pulse rounded-lg bg-base-300" />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between gap-3 md:block">
              {/* Mobile label */}
              <div className="h-2.5 w-14 animate-pulse rounded bg-base-300 md:hidden" />

              <div className="h-6 w-20 animate-pulse rounded-full bg-base-300" />
            </div>
          </div>

          {/* Level */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between gap-4 md:block">
              {/* Mobile label */}
              <div className="h-2.5 w-8 shrink-0 animate-pulse rounded bg-base-300 md:hidden" />

              <div className="flex w-full max-w-52 items-center gap-3">
                {/* Progress bar */}
                <div className="h-1.5 min-w-0 flex-1 animate-pulse rounded-full bg-base-300" />

                {/* Percentage */}
                <div className="h-3 w-8 shrink-0 animate-pulse rounded bg-base-300" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between gap-3 md:block">
              {/* Mobile label */}
              <div className="h-2.5 w-10 animate-pulse rounded bg-base-300 md:hidden" />

              <div className="h-6 w-16 animate-pulse rounded-full bg-base-300" />
            </div>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden items-center justify-end gap-2 md:col-span-1 md:flex">
            <div className="h-9 w-9 animate-pulse rounded-lg bg-base-300" />
            <div className="h-9 w-9 animate-pulse rounded-lg bg-base-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillLoading;
