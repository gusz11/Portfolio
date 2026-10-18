"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function AnimatedTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          ".timeline-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
      }, ref);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <div ref={ref} className="timeline">
      <div className="timeline-track" aria-hidden="true">
        <div className="timeline-fill" />
      </div>
      {children}
    </div>
  );
}
