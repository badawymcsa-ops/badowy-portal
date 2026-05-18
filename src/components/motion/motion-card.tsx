"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/components/motion/stagger-container";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
  asChildItem?: boolean;
};

export function MotionCard({ children, className, asChildItem = true }: MotionCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={asChildItem ? staggerItem : undefined}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("group", className)}
    >
      {children}
    </motion.div>
  );
}
