"use client";

import React, { useEffect, useState } from "react";
import Reveal from "@/components/Reavel/Reavel";
import { FiArrowRight, FiEye, FiX } from "react-icons/fi";
import CertificationsSkeleton from "@/components/loadings/CertificationsSkeleton";

const Certifications = () => {
  const [filter, setFilter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [certifications, setCertifications] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const fetchCertifications = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/certifications");
      const data = await res.json();

      setCertifications(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const filteredCertification = certifications[filter];

  const handleCertificateOpen = () => {
    if (!filteredCertification?.image || imageError) return;

    setShowCertificate(true);
  };

  const handleCertificateClose = () => {
    setShowCertificate(false);
  };

  useEffect(() => {
    if (!showCertificate) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowCertificate(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showCertificate]);

  return (
    <section className="relative overflow-x-clip py-20">
      <div className="container relative z-10">
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
              Professional <span className="text-primary">Certifications</span>
            </h2>

            <p className="mt-5 text-base leading-8 text-base-content/60">
              Professional certifications and training that have strengthened my
              skills in modern web development and software engineering.
            </p>
          </div>
        </Reveal>

        {loading ? (
          <CertificationsSkeleton />
        ) : (
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
              <div className="flex flex-wrap gap-5 lg:flex-nowrap lg:flex-col">
                {certifications.map((data, idx) => (
                  <Reveal
                    key={data._id}
                    initial="opacity-0 translate-y-10"
                    view="opacity-100 translate-y-0"
                    transition="transition-all duration-150"
                    viewport={0.1}
                    className="w-full sm:w-[calc(50%-0.625rem)] lg:w-full"
                  >
                    <div
                      onClick={() => {
                        setFilter(idx);
                        setImageError(false);
                        setShowCertificate(false);
                      }}
                      className={`flex h-full cursor-pointer flex-col gap-3 rounded-2xl border border-l-3 px-4 py-3 transition-all duration-75 ${filter === idx ? "border-primary/10 border-l-primary bg-primary/5 hover:bg-primary/7" : "border-white/5 border-l-white/20 bg-white/5 hover:bg-white/7"}`}
                    >
                      <div className={filter === idx ? "text-primary" : ""}>
                        {data.issuer}
                      </div>

                      <p className="text-sm leading-6 break-words">
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

            <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
              {filteredCertification && (
                <Reveal
                  key={filter}
                  initial="opacity-0 translate-y-10"
                  view="opacity-100 translate-y-0"
                  transition="transition-all duration-400"
                  viewport={0.3}
                >
                  <div>
                    <div className="rounded-3xl rounded-b-none border border-primary/10 border-b border-b-white/10 bg-primary/7 px-6 py-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <h2 className="mt-2 break-words text-2xl font-semibold md:text-3xl">
                            {filteredCertification.title}
                          </h2>

                          <p className="mt-2 break-words font-medium text-primary">
                            {filteredCertification.issuer}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <span>{filteredCertification.credential}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl rounded-t-none border border-white/5 border-t-0 border-b-3 bg-white/[0.02] p-6">
                      <div>
                        <h3 className="text-lg font-semibold">
                          About the Certification
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-base-content/60">
                          {filteredCertification.description}
                        </p>

                        {filteredCertification.image && !imageError && (
                          <button
                            onClick={handleCertificateOpen}
                            className="mt-5 inline-flex items-center gap-2 cursor-pointer active:scale-[0.95] rounded-4xl border border-primary/20 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-all duration-200 hover:border-primary/40 hover:bg-primary/15"
                          >
                            <FiEye size={16} />
                            View Certificate
                          </button>
                        )}
                      </div>

                      <div className="my-8 h-px bg-white/10" />

                      <div>
                        <h3 className="text-lg font-semibold">
                          Key Highlights
                        </h3>

                        <div className="mt-4 space-y-3">
                          {filteredCertification.highlights?.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="mb-5 flex items-center gap-3 last:mb-0"
                              >
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                                <p className="text-sm leading-7 text-base-content/60">
                                  {item}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="my-8 h-px bg-white/10" />

                      <div>
                        <h3 className="text-lg font-semibold">
                          Skills & Technologies
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {filteredCertification.technologies?.map(
                            (technology) => (
                              <span
                                key={technology}
                                className="rounded-full border border-white/10 border-b-2 bg-white/3 px-3 py-1.5 text-xs font-medium text-base-content/60 transition-colors hover:border-primary/30 hover:text-primary"
                              >
                                {technology}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute -right-10 top-20 -z-1 select-none md:-right-60 lg:-right-100">
        <div className="h-75 w-75 rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] blur-[100px] md:h-137.5 md:w-137.5 md:blur-[140px] lg:h-175 lg:w-175"></div>
      </div>

      <div
        onClick={handleCertificateClose}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all duration-200 ${showCertificate ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {filteredCertification?.image && (
          <div
            onClick={(event) => event.stopPropagation()}
            className={`relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-2xl transition-transform duration-300 ${showCertificate ? "scale-100" : "scale-95"}`}
          >
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-base-content/10 px-5 py-4">
              <div className="min-w-0">
                <h3 className="text-base font-semibold">Certificate</h3>

                <p className="mt-1 truncate text-xs text-base-content/50">
                  {filteredCertification.title}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCertificateClose}
                className="ml-4 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-base-content/40 transition-colors hover:bg-base-content/5 hover:text-base-content"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Certificate Image */}
            <div className="flex max-h-[calc(90vh-75px)] items-center justify-center overflow-auto bg-black/20 p-4 md:p-6">
              <img
                src={filteredCertification.image}
                alt={`${filteredCertification.title} certificate`}
                className="h-auto max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
