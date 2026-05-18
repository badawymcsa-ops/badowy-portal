"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedGradientOrbProps = {
  className?: string;
  delay?: number;
};

export function AnimatedGradientOrb({ className, delay = 0 }: AnimatedGradientOrbProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      initial={false}
      animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.82, 0.5] }}
      transition={{ delay, duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "pointer-events-none absolute rounded-full bg-gradient-to-br from-bd-violet/45 via-bd-magenta/30 to-bd-cyan/25 blur-3xl",
        className
      )}
    />
  );
}
