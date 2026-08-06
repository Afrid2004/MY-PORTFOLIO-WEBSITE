import React from "react";

const Stats = () => {
  const allStats = [
    {
      title: "20",
      suffix: "+",
      desc: "Projects Completed",
    },
    {
      title: "10",
      suffix: "+",
      desc: "Technologies",
    },
    {
      title: "100",
      suffix: "%",
      desc: "Responsive Design",
    },
    {
      title: "24",
      suffix: "/7",
      desc: "Learning & Improving",
    },
  ];
  return (
    <div>
      <div className="bg-white/2 border-t border-b border-white/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {allStats.map((stats, idx) => {
              return (
                <div
                  key={idx}
                  className="border-b last:border-b-0 md:nth-[3]:border-b-0 lg:border-b-0 md:border-r md:nth-[2]:border-r-0 lg:nth-[2]:border-r p-5 lg:p-8 lg:first:pl-0 last:pr-0 flex lg:first:justify-start justify-center lg:last:justify-end last:border-r-0 border-white/10"
                >
                  <div className="flex flex-col gap-3 justify-center items-center lg:items-start">
                    <h3 className="text-6xl font-medium">
                      {stats.title}
                      <span className="text-primary">{stats.suffix}</span>
                    </h3>
                    <p className="uppercase tracking-[0.15em] text-neutral-content/60 text-xs">
                      {stats.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
