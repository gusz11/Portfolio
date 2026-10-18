"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 650);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return visible ? (
    <button
      className="back-to-top icon-button"
      aria-label="Voltar ao topo"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }}
    >
      <ArrowUp size={19} />
    </button>
  ) : null;
}
