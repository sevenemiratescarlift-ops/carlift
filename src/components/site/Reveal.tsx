"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const shouldReduceMotion = useReducedMotion();

  const offset = 24;
  const initialOffset =
    direction === "up"
      ? { y: offset }
      : direction === "down"
        ? { y: -offset }
        : direction === "left"
          ? { x: offset }
          : direction === "right"
            ? { x: -offset }
            : {};

  const variants: Variants = {
    hidden: { opacity: 0, ...(shouldReduceMotion ? {} : initialOffset) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
