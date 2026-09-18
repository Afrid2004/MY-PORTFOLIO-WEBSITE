const ProjectSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/3"
        >
          {/* Image */}
          <div className="aspect-video animate-pulse bg-base-content/10" />

          {/* Content */}
          <div className="space-y-4 p-6">
            <div className="h-7 w-2/3 animate-pulse rounded-lg bg-base-content/10" />

            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-base-content/10" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-base-content/10" />
              <div className="h-3 w-4/6 animate-pulse rounded bg-base-content/10" />
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((tech) => (
                <div
                  key={tech}
                  className="h-8 w-20 animate-pulse rounded-full bg-base-content/10"
                />
              ))}
            </div>

            <div className="h-px bg-white/10" />

            {/* Buttons */}
            <div className="flex gap-3">
              <div className="h-12 flex-1 animate-pulse rounded-full bg-base-content/10" />
              <div className="h-12 flex-1 animate-pulse rounded-full bg-base-content/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectSkeleton;
;
