import Image from "next/image";
import type { ProjectCoverComposition } from "@/types/project";
import { LuriaWindow } from "./LuriaWindow";

export function LuriaCover({
  composition,
  priority,
  onError,
}: {
  composition: ProjectCoverComposition;
  priority: boolean;
  onError: () => void;
}) {
  return (
    <div className="project-visual visual-luria luria-cover">
      <div className="luria-cover-stage">
        <div className="luria-cover-brand" aria-hidden="true">
          <span>LURIA</span>
          <p>Aprender. Praticar. Evoluir.</p>
        </div>
        {(["primary", "secondary"] as const).map((position) => (
          <div className={`luria-cover-${position}`} key={position}>
            <LuriaWindow title={composition[position].label}>
              <div className="luria-cover-screenshot">
                <Image
                  src={composition[position].path}
                  alt={composition[position].alt}
                  fill
                  sizes={
                    position === "primary"
                      ? "(max-width: 767px) 76vw, 900px"
                      : "(max-width: 767px) 42vw, 540px"
                  }
                  priority={priority}
                  onError={onError}
                />
              </div>
            </LuriaWindow>
          </div>
        ))}
      </div>
    </div>
  );
}
