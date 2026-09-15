"use client";
import ServiceCard from "@/components/Cards/ServiceCard";
import ServiceSkeleton from "@/components/loadings/ServiceSkeleton";
import React, { useEffect, useState } from "react";
const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="gradient-border w-fit p-0.5 mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />

              <span className="text-sm font-medium uppercase tracking-wider">
                My Services
              </span>
            </div>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            What I Can <span className="text-primary">Do For You</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-base-content/60">
            I build modern, responsive, and scalable web solutions tailored to
            your business needs and goals.
          </p>
        </div>

        <div>
          {loading ? (
            <ServiceSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, idx) => {
                return (
                  <ServiceCard
                    key={idx}
                    idx={idx}
                    service={service}
                  ></ServiceCard>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
