"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        if (ref.current)
          ref.current.style.transform = `scaleX(${height > 0 ? Math.min(window.scrollY / height, 1) : 0})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [pathname]);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
