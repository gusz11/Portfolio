"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function AnimatedGradient() {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  return (
    <div className="hero-art" data-paused={paused || reduced}>
      <div className="orbital-composition" aria-hidden="true">
        <div className="orbital-halo" />
        <div className="orbital-axis axis-one" />
        <div className="orbital-axis axis-two" />
        <div className="orbital-sculpture">
          <div className="orbital-disc disc-back" />
          <div className="orbital-disc disc-middle" />
          <div className="orbital-disc disc-front" />
          <div className="orbital-core" />
        </div>
        <span className="orbital-point point-one" />
        <span className="orbital-point point-two" />
      </div>
      <div className="art-caption">
        <span>Dados. Lógica. Experiência.</span>
        {!reduced && (
          <button
            className="art-pause"
            aria-label={
              paused ? "Retomar animação visual" : "Pausar animação visual"
            }
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}
