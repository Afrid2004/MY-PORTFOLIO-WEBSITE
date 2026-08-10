"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const MagneticButton = ({ children, className = "" }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 150,
    damping: 12,
    mass: 0.5,
  });

  const springY = useSpring(y, {
    stiffness: 150,
    damping: 12,
    mass: 0.5,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const distance = Math.sqrt(mouseX ** 2 + mouseY ** 2);

    const radius = 100;
    const strength = 0.15;

    if (distance < radius) {
      x.set(mouseX * strength);
      y.set(mouseY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
