import React from "react";

const SkillsSkeleton = () => {
  const skeletonCards = [...Array(8)];

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-9 w-full animate-pulse rounded-full bg-white/5 sm:w-28"
          />
        ))}
      </div>

      {/* Category Header */}
      <div className="mt-6 mb-7">
        <div className="h-7 w-32 animate-pulse rounded bg-white/5" />

        <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-white/5" />
      </div>

      {/* Skill Cards */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-5"
          >
            {/* Icon */}
            <div className="h-14 w-14 animate-pulse rounded-2xl bg-white/5" />

            {/* Content */}
            <div className="mt-5 w-full">
              <div className="flex items-center justify-between gap-3">
                {/* Skill Name */}
                <div className="h-4 w-20 max-w-[65%] animate-pulse rounded bg-white/5" />

                {/* Percentage */}
                <div className="h-3 w-9 animate-pulse rounded bg-white/5" />
              </div>

              {/* Progress */}
              <div className="mt-3 h-1.5 w-full animate-pulse overflow-hidden rounded-full bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSkeleton;
