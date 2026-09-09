
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reavel/Reavel";

const Certifications = () => {
    const [filter, setFilter] = useState(0);
    const [imageError, setImageError] = useState(false);

    const certifications = [
        {
            id: 1,
            title: "Professional Web Application Development using Laravel & React",
            issuer: "ISDB-BISEW IT Scholarship Project",
            duration: "2026",
            credential: "Certificate",

            image: "/assets/images/certificates/isdb-bisew-certificate.jpg",

            description:
                "Successfully completed professional training in Web Application Development using Laravel and React, with practical experience in building modern web applications.",

            highlights: [
                "Completed professional web application development training.",
                "Built practical web applications using Laravel and React.",
                "Worked with MVC architecture and database-driven applications.",
                "Developed REST APIs and integrated frontend with backend services.",
                "Gained hands-on experience with modern web development practices.",
            ],

            technologies: [
                "PHP",
                "Laravel",
                "React.js",
                "MySQL",
                "REST API",
                "JavaScript",
                "Bootstrap",
                "Git",
                "Tailwind CSS"
            ],
        },

        {
            id: 2,
            title: "Complete Web Development Course",
            issuer: "Programming Hero",
            duration: "2026",
            credential: "Course Completed",

            image: "/assets/images/certificates/programming-hero-certificate.jpg",

            description:
                "Completed a comprehensive web development course covering frontend development, backend development, databases, APIs, and modern JavaScript technologies.",

            highlights: [
                "Completed comprehensive full-stack web development training.",
                "Built responsive and interactive web applications.",
                "Worked with React, Node.js, Express.js and MongoDB.",
                "Learned REST API development and database integration.",
                "Strengthened practical problem-solving and development skills.",
            ],

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "React.js",
                "Next.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Git",
            ],
        },
    ];

    const filteredCertification = certifications[filter];

    return (
        <section className="relative py-20">
            <div className="container relative z-10">
                {/* Section Header */}
                <Reveal
                    initial="opacity-0 translate-y-6"
                    view="opacity-100 translate-y-0"
                    className="mb-10"
                >
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="gradient-border mx-auto w-fit p-0.5">
                            <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />

                                <span className="text-sm font-medium uppercase tracking-wider">
                                    Certifications
                                </span>
                            </div>
                        </div>

                        <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
                            Professional{" "}
                            <span className="text-primary">
                                Certifications
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-8 text-base-content/60">
                            Professional certifications and training that have
                            strengthened my skills in modern web development
                            and software engineering.
                        </p>
                    </div>
                </Reveal>

                {/* Main Content */}
                <div className="grid grid-cols-12 gap-5">
                    {/* Left Side */}
                    <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
                        <div className="flex flex-wrap gap-5 lg:flex-nowrap lg:flex-col">
                            {certifications.map((data, idx) => (
                                <Reveal
                                    key={data.id}
                                    initial="opacity-0 translate-y-10"
                                    view="opacity-100 translate-y-0"
                                    transition="transition-all duration-150"
                                    viewport={0.1}
                                    className="w-full sm:w-[calc(50%-0.625rem)] lg:w-full"
                                >
                                    <div
                                        onClick={() => setFilter(idx)}
                                        className={`flex h-full cursor-pointer flex-col gap-3 rounded-2xl border border-l-3 px-4 py-4 transition-all duration-75 ${
                                            filter === idx
                                                ? "border-primary/10 border-l-primary bg-primary/5 hover:bg-primary/7"
                                                : "border-white/5 border-l-white/20 bg-white/5 hover:bg-white/7"
                                        }`}
                                    >
                                        <div
                                            className={
                                                filter === idx
                                                    ? "text-primary"
                                                    : ""
                                            }
                                        >
                                            {data.issuer}
                                        </div>

                                        <p className="text-sm leading-6">
                                            {data.title}
                                        </p>

                                        <p className="text-xs text-base-content/80">
                                            {data.duration}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                        <Reveal
                            key={filter}
                            initial="opacity-0 translate-y-10"
                            view="opacity-100 translate-y-0"
                            transition="transition-all duration-400"
                            viewport={0.3}
                        >
                            <div>
                                {/* Header */}
                                <div className="rounded-t-3xl border border-primary/10 border-b-white/10 bg-primary/5 px-6 py-6">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
                                                {filteredCertification.title}
                                            </h2>

                                            <p className="mt-2 font-medium text-primary">
                                                {filteredCertification.issuer}
                                            </p>
                                        </div>

                                        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                                            <span className="text-sm text-base-content/80">
                                                {filteredCertification.duration}
                                            </span>

                                            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                                {filteredCertification.credential}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="overflow-hidden rounded-b-3xl border border-t-0 border-white/5 bg-white/[0.02] p-6">
                                    {/* Certificate Image */}
                                    {filteredCertification.image && !imageError && (
                                        <div>
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="text-lg font-semibold">
                                                    Certificate
                                                </h3>

                                                <span className="text-xs text-base-content/40">
                                                    Certificate Preview
                                                </span>
                                            </div>

                                            <div className="group relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                                                <Image
                                                    src={
                                                        filteredCertification.image
                                                    }
                                                    alt={`${filteredCertification.title} certificate`}
                                                    width={1600}
                                                    height={1100}
                                                    onError={() => setImageError(true)}
                                                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                                />
                                            </div>

                                            <div className="my-8 h-px bg-white/10" />
                                        </div>
                                    )}

                                    {/* Description */}
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            About the Certification
                                        </h3>

                                        <p className="mt-4 text-sm leading-7 text-base-content/60">
                                            {filteredCertification.description}
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="my-8 h-px bg-white/10" />

                                    {/* Highlights */}
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Key Highlights
                                        </h3>

                                        <div className="mt-4 space-y-4">
                                            {filteredCertification.highlights.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                                                        <p className="text-sm leading-7 text-base-content/60">
                                                            {item}
                                                        </p>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="my-8 h-px bg-white/10" />

                                    {/* Technologies */}
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Skills & Technologies
                                        </h3>

                                        <div className="mt-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                            <div className="flex w-max flex-nowrap gap-2">
                                                {filteredCertification.technologies.map(
                                                    (technology) => (
                                                        <span
                                                            key={technology}
                                                            className="shrink-0 whitespace-nowrap rounded-full border border-white/10 border-b-2 bg-white/3 px-3 py-1.5 text-xs font-medium text-base-content/60 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                                                        >
                                                            {technology}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="pointer-events-none absolute -right-10 top-20 -z-1 select-none md:-right-60 lg:-right-100">
                <div
                    className="
                        h-75
                        w-75
                        rounded-full
                        bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
                        blur-[100px]
                        md:h-137.5
                        md:w-137.5
                        md:blur-[140px]
                        lg:h-175
                        lg:w-175
                    "
                />
            </div>
        </section>
    );
};

export default Certifications;

