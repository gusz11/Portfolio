"use client";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ReactNode } from "react";
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={false}
      animate={{ opacity: reduced ? 1 : [0.8, 1] }}
      transition={{ duration: reduced ? 0 : 0.25 }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
}
