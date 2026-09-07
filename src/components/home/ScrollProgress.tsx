"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none bg-black/5">
      <motion.div
        className="h-full bg-gradient-to-r from-brand-red via-brand-red-accent to-brand-red origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
