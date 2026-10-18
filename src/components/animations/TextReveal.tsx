"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
export function TextReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from("[data-reveal]", {
          y: 25,
          opacity: 0,
          duration: 0.85,
          stagger: 0.11,
          ease: "power3.out",
          clearProps: "all",
        });
      }, ref);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <div ref={ref} className="hero-copy">
      {children}
    </div>
  );
}
