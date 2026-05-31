"use client";
import React from "react";
import { LazyMotion, domMax, m } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  scale?: number;
}

export default function FadeIn({ children, delay = 0, direction, scale }: FadeInProps) {
  // Định nghĩa các biến chuyển động để code sạch hơn
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      scale: scale || 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  return (
    // LazyMotion giúp giảm dung lượng bundle ban đầu
    <LazyMotion features={domMax}>
      <m.div
        initial="hidden"
        whileInView="visible"
        variants={variants}
        transition={{
          duration: 0.6,
          delay: delay,
          ease: [0.22, 1, 0.36, 1], // Cubic-bezier giúp mượt hơn trên mobile
        }}
        viewport={{ once: true, margin: "-50px" }}
        style={{ willChange: "transform, opacity" }} // Tối ưu GPU
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}