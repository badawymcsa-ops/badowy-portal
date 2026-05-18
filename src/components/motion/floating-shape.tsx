"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FloatingShapeProps = {
  className?: string;
  delay?: number;
  duration?: number;
};

export function FloatingShape({ className, delay = 0, duration = 7 }: FloatingShapeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      initial={false}
      animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [0, 3, 0] }}
      transition={{ delay, duration, repeat: Infinity, ease: "easeInOut" }}
      className={cn("pointer-events-none absolute rounded-full border border-white/10 bg-white/[0.04]", className)}
    />
  );
}
