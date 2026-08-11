"use client";

import { useEffect, useRef, useState } from "react";

const Reveal = ({
  children,
  className = "",
  initial = "",
  view = "",
  transition = "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
  viewport = 0,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          observer.unobserve(entry.target);
        }
      },
      {
        threshold: viewport,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [viewport]);

  return (
    <div
      ref={ref}
      className={`
        ${className}
        ${transition}
        ${isVisible ? view : initial}
      `}
    >
      {children}
    </div>
  );
};

export default Reveal;
