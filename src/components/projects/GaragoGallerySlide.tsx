import { motion } from "motion/react";
import type { ProjectImage } from "@/types/project";
import { ProjectVisual } from "./ProjectVisual";

/** Internal editorial slide, with the same palette as the real-screen cover. */
export function GaragoGallerySlide({
  image,
  available,
  reducedMotion,
}: {
  image: ProjectImage;
  available: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="project-visual garago-gallery-slide">
      <div className="garago-gallery-editorial">
        <p className="garago-gallery-brand">Garago / {image.label}</p>
        <h3>{image.presentation?.title ?? image.label}</h3>
        <p className="garago-gallery-description">
          {image.presentation?.description}
        </p>
      </div>
      <div className="garago-gallery-device-area">
        <motion.div
          className="garago-gallery-device-motion"
          initial={reducedMotion ? false : { y: 7 }}
          animate={{ y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.32 }}
        >
          <div className="garago-gallery-device">
            <ProjectVisual image={image} theme="garago" available={available} />
          </div>
        </motion.div>
      </div>
      <p className="garago-gallery-note">{image.presentation?.note}</p>
    </div>
  );
}
