import { motion } from "motion/react";
import type { ProjectImage } from "@/types/project";
import { ProjectVisual } from "./ProjectVisual";
import { LuriaWindow } from "./LuriaWindow";

export function LuriaGallerySlide({
  image,
  available,
  reducedMotion,
}: {
  image: ProjectImage;
  available: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="project-visual luria-gallery-slide">
      <motion.div
        className="luria-gallery-editorial"
        initial={reducedMotion ? false : { opacity: 0.8, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.25 }}
      >
        <p className="luria-gallery-environment">{image.presentation?.note}</p>
        <h3>{image.presentation?.title ?? image.label}</h3>
        <p className="luria-gallery-description">
          {image.presentation?.description}
        </p>
      </motion.div>
      <LuriaWindow title={image.label}>
        <ProjectVisual image={image} theme="luria" available={available} />
      </LuriaWindow>
    </div>
  );
}
