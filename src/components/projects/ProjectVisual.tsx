"use client";
import { useState } from "react";
import Image from "next/image";
import type {
  ProjectImage,
  ProjectTheme,
  ProjectCoverComposition,
} from "@/types/project";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { OndeFicaCover } from "./OndeFicaCover";
export function ProjectVisual({
  image,
  theme,
  available,
  priority = false,
  composition,
}: {
  image: ProjectImage;
  theme: ProjectTheme;
  available: boolean;
  priority?: boolean;
  composition?: ProjectCoverComposition;
}) {
  const [failedPath, setFailedPath] = useState<string>();
  if (composition && theme === "ondefica" && failedPath !== image.path)
    return (
      <OndeFicaCover
        composition={composition}
        priority={priority}
        onError={() => setFailedPath(image.path)}
      />
    );
  if (!available || failedPath === image.path)
    return <ImagePlaceholder theme={theme} label={image.label} />;
  const screenshot = (
    <Image
      src={image.path}
      alt={image.alt}
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 1400px) 70vw, 1280px"
      priority={priority}
      onError={() => setFailedPath(image.path)}
    />
  );
  return (
    <div className={`project-visual real-image visual-${theme}`}>
      {theme === "ondefica" ? (
        <div className="project-screenshot">{screenshot}</div>
      ) : (
        screenshot
      )}
    </div>
  );
}
