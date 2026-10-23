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
import { GaragoCover } from "./GaragoCover";
import { LuriaCover } from "./LuriaCover";
export function ProjectVisual({
  image,
  theme,
  available,
  priority = false,
  composition,
  sizes = "(max-width: 767px) 100vw, (max-width: 1400px) 70vw, 1280px",
}: {
  image: ProjectImage;
  theme: ProjectTheme;
  available: boolean;
  priority?: boolean;
  composition?: ProjectCoverComposition;
  sizes?: string;
}) {
  const [failedPath, setFailedPath] = useState<string>();
  if (composition && theme === "luria" && failedPath !== image.path)
    return (
      <LuriaCover
        composition={composition}
        priority={priority}
        onError={() => setFailedPath(image.path)}
      />
    );
  if (composition && theme === "garago" && failedPath !== image.path)
    return (
      <GaragoCover
        composition={composition}
        priority={priority}
        onError={() => setFailedPath(image.path)}
      />
    );
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
      sizes={sizes}
      priority={priority}
      onError={() => setFailedPath(image.path)}
    />
  );
  return (
    <div
      className={`project-visual real-image visual-${theme}`}
      style={
        image.width && image.height
          ? { aspectRatio: `${image.width} / ${image.height}` }
          : undefined
      }
    >
      {theme === "ondefica" ? (
        <div className="project-screenshot">{screenshot}</div>
      ) : (
        screenshot
      )}
    </div>
  );
}
