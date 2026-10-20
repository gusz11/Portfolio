import Image from "next/image";
import type { ProjectCoverComposition } from "@/types/project";

export function GaragoCover({
  composition,
  priority,
  onError,
}: {
  composition: ProjectCoverComposition;
  priority: boolean;
  onError: () => void;
}) {
  return (
    <div className="project-visual visual-garago garago-cover">
      <div className="garago-cover-stage">
        <svg
          className="garago-cover-plan"
          viewBox="0 0 800 540"
          fill="none"
          aria-hidden="true"
        >
          <path d="M300 470H770V70H470M420 470V370H520V470M560 470V370H660V470M770 300H670V200H770M770 160H670V70" />
        </svg>
        <div className="garago-cover-brand" aria-hidden="true">
          Espaço livre.
          <br />
          Vida prática.
          <span>garago</span>
        </div>
        {(["secondary", "primary"] as const).map((position) => (
          <div
            key={position}
            className={`garago-cover-device garago-cover-device-${position}`}
          >
            <div className="garago-cover-screen">
              <Image
                src={composition[position].path}
                alt={composition[position].alt}
                fill
                sizes="(max-width: 767px) 32vw, (max-width: 1400px) 24vw, 360px"
                priority={priority}
                onError={onError}
              />
            </div>
          </div>
        ))}
        <span className="garago-cover-caption">Telas reais do aplicativo</span>
      </div>
    </div>
  );
}
