import React from "react";

const BlogDetailsLoading = () => {
  return (
    <main className="relative overflow-x-clip py-12 md:py-16 lg:py-20">
      <div className="container relative z-10 animate-pulse">
        {/* Article Header */}
        <header className="mx-auto mb-12 mt-15 max-w-5xl text-center md:mb-16">
          {/* Category */}
          <div className="mb-6 flex justify-center">
            <div className="h-8 w-24 rounded-full bg-base-content/10" />
          </div>

          {/* Title */}
          <div className="mx-auto max-w-4xl space-y-3">
            <div className="h-10 w-full rounded-lg bg-base-content/10 sm:h-12 md:h-16" />
            <div className="mx-auto h-10 w-4/5 rounded-lg bg-base-content/10 sm:h-12 md:h-16" />
          </div>

          {/* Excerpt */}
          <div className="mx-auto mt-7 max-w-3xl space-y-3">
            <div className="h-4 w-full rounded bg-base-content/10 md:h-5" />
            <div className="mx-auto h-4 w-5/6 rounded bg-base-content/10 md:h-5" />
          </div>

          {/* Meta */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-4 w-28 rounded bg-base-content/10" />
            <div className="h-1 w-1 rounded-full bg-base-content/10" />
            <div className="h-4 w-24 rounded bg-base-content/10" />
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-12 items-start gap-8 lg:gap-10">
          {/* Article */}
          <div className="col-span-12 lg:col-span-8">
            {/* Featured Image */}
            <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-base-content/5 md:rounded-3xl" />

            {/* Article Content */}
            <article className="mt-10 space-y-5 md:mt-12">
              {/* Paragraphs */}
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-base-content/10" />
                <div className="h-4 w-full rounded bg-base-content/10" />
                <div className="h-4 w-11/12 rounded bg-base-content/10" />
                <div className="h-4 w-4/5 rounded bg-base-content/10" />
              </div>

              {/* Heading */}
              <div className="pt-6">
                <div className="h-7 w-2/3 rounded bg-base-content/10 md:h-9" />
              </div>

              {/* Paragraphs */}
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-base-content/10" />
                <div className="h-4 w-full rounded bg-base-content/10" />
                <div className="h-4 w-10/12 rounded bg-base-content/10" />
              </div>

              {/* Heading */}
              <div className="pt-6">
                <div className="h-7 w-1/2 rounded bg-base-content/10 md:h-9" />
              </div>

              {/* Paragraphs */}
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-base-content/10" />
                <div className="h-4 w-11/12 rounded bg-base-content/10" />
                <div className="h-4 w-4/5 rounded bg-base-content/10" />
              </div>

              {/* List */}
              <div className="space-y-4 pt-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-base-content/10" />
                    <div className="h-4 w-full rounded bg-base-content/10" />
                  </div>
                ))}
              </div>
            </article>

            {/* Tags */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <div className="mb-4 h-4 w-16 rounded bg-base-content/10" />

              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-20 rounded-full bg-base-content/10"
                  />
                ))}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
              <div className="h-4 w-24 rounded bg-base-content/10" />
              <div className="h-4 w-28 rounded bg-base-content/10" />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 self-start lg:sticky lg:top-24 lg:col-span-4">
            {/* Topics */}
            <div className="rounded-2xl border border-white/10 bg-base-200/60 p-6 md:p-7">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-base-content/10" />

                <div className="flex-1">
                  <div className="h-4 w-20 rounded bg-base-content/10" />
                  <div className="mt-2 h-3 w-32 rounded bg-base-content/10" />
                </div>
              </div>

              <div className="my-6 h-px bg-white/10" />

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-20 rounded-lg bg-base-content/10"
                  />
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/[0.03] p-6 md:p-7">
              <div className="h-3 w-20 rounded bg-base-content/10" />
              <div className="mt-4 h-7 w-40 rounded bg-base-content/10" />

              <div className="mt-3 space-y-2">
                <div className="h-3 w-full rounded bg-base-content/10" />
                <div className="h-3 w-11/12 rounded bg-base-content/10" />
                <div className="h-3 w-4/5 rounded bg-base-content/10" />
              </div>

              <div className="mt-5 h-4 w-32 rounded bg-base-content/10" />
            </div>
          </aside>
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

export default BlogDetailsLoading;
