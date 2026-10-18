"use client";
import { useState } from "react";
import Image from "next/image";
import type { ProjectImage, ProjectTheme } from "@/types/project";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
export function ProjectVisual({
  image,
  theme,
  available,
  priority = false,
}: {
  image: ProjectImage;
  theme: ProjectTheme;
  available: boolean;
  priority?: boolean;
}) {
  const [failedPath, setFailedPath] = useState<string>();
  if (!available || failedPath === image.path)
    return <ImagePlaceholder theme={theme} label={image.label} />;
  return (
    <div className={`project-visual real-image visual-${theme}`}>
      <Image
        src={image.path}
        alt={image.alt}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1400px) 70vw, 1280px"
        priority={priority}
        onError={() => setFailedPath(image.path)}
      />
    </div>
  );
}
