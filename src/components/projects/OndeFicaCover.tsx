import Image from "next/image";
import type { ProjectCoverComposition } from "@/types/project";

export function OndeFicaCover({
  composition,
  priority,
  onError,
}: {
  composition: ProjectCoverComposition;
  priority: boolean;
  onError: () => void;
}) {
  return (
    <div className="project-visual visual-ondefica ondefica-cover">
      <div className="ondefica-cover-map" aria-hidden="true">
        <svg viewBox="0 0 800 540" fill="none">
          <path
            d="M-40 390C130 420 180 250 375 270S620 320 850 100M100-50C180 110 335 175 340 600M600-50C450 150 610 330 730 590"
            stroke="currentColor"
            strokeWidth="40"
          />
          <path
            d="M80 380Q225 225 390 270T700 160"
            stroke="#637653"
            strokeWidth="2"
            strokeDasharray="6 9"
          />
          <circle cx="80" cy="380" r="8" fill="#637653" />
          <circle cx="700" cy="160" r="8" fill="#637653" />
        </svg>
      </div>
      <div className="ondefica-cover-brand" aria-hidden="true">
        <span>OndeFica</span>
      </div>
      <div className="ondefica-device ondefica-device-secondary">
        <div className="ondefica-device-screen">
          <Image
            src={composition.secondary.path}
            alt={composition.secondary.alt}
            fill
            sizes="(max-width: 767px) 30vw, (max-width: 1400px) 22vw, 340px"
            priority={priority}
            onError={onError}
          />
        </div>
      </div>
      <div className="ondefica-device ondefica-device-primary">
        <div className="ondefica-device-screen">
          <Image
            src={composition.primary.path}
            alt={composition.primary.alt}
            fill
            sizes="(max-width: 767px) 34vw, (max-width: 1400px) 25vw, 380px"
            priority={priority}
            onError={onError}
          />
        </div>
      </div>
      <span className="ondefica-cover-caption">Telas reais do aplicativo</span>
    </div>
  );
}
