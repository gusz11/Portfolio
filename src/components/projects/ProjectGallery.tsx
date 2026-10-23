"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { ProjectImage, ProjectTheme } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ProjectVisual } from "./ProjectVisual";
import { trapDialogFocus } from "@/lib/focus";
import { OndeFicaGallerySlide } from "./OndeFicaGallerySlide";
import { GaragoGallerySlide } from "./GaragoGallerySlide";
import { LuriaGallerySlide } from "./LuriaGallerySlide";
export function ProjectGallery({
  images,
  theme,
  availableImages,
}: {
  images: ProjectImage[];
  theme: ProjectTheme;
  availableImages: string[];
}) {
  const [index, setIndex] = useState(0);
  const [detailZoom, setDetailZoom] = useState(false);
  const reduced = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const expand = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const current = images[index];
  useEffect(() => {
    const element = dialog.current;
    return () => {
      if (element?.open) document.body.style.overflow = "";
    };
  }, []);
  function step(direction: number) {
    setIndex((value) => (value + direction + images.length) % images.length);
  }
  function controls() {
    return (
      <div className="gallery-controls">
        <button
          className="icon-button"
          aria-label="Imagem anterior"
          onClick={() => step(-1)}
        >
          <ArrowLeft size={20} />
        </button>
        <span aria-live="polite">
          {index + 1} / {images.length} — {current.label}
        </span>
        <button
          className="icon-button"
          aria-label="Próxima imagem"
          onClick={() => step(1)}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }
  return (
    <div
      className={
        theme === "ondefica" || theme === "garago" || theme === "luria"
          ? `gallery gallery-${theme}`
          : "gallery"
      }
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          step(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div
        className="gallery-stage"
        onPointerDown={(event) => {
          if (
            (theme === "garago" || theme === "luria") &&
            event.pointerType === "touch"
          )
            touchStart.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerCancel={() => {
          touchStart.current = null;
        }}
        onPointerUp={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start || (theme !== "garago" && theme !== "luria")) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5)
            step(dx < 0 ? 1 : -1);
        }}
      >
        <motion.div
          key={current.path}
          initial={reduced ? false : { opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {theme === "ondefica" ? (
            <OndeFicaGallerySlide
              image={current}
              available={availableImages.includes(current.path)}
              index={index}
              total={images.length}
              reducedMotion={reduced}
            />
          ) : theme === "garago" ? (
            <GaragoGallerySlide
              image={current}
              available={availableImages.includes(current.path)}
              reducedMotion={reduced}
            />
          ) : theme === "luria" ? (
            <LuriaGallerySlide
              image={current}
              available={availableImages.includes(current.path)}
              reducedMotion={reduced}
            />
          ) : (
            <ProjectVisual
              image={current}
              theme={theme}
              available={availableImages.includes(current.path)}
            />
          )}
        </motion.div>
        <button
          ref={expand}
          className="gallery-expand icon-button"
          aria-label={`Ampliar: ${current.label}`}
          onClick={() => {
            dialog.current?.showModal();
            document.body.style.overflow = "hidden";
          }}
        >
          <Expand size={19} />
        </button>
      </div>
      {controls()}
      <div
        className="gallery-thumbnails"
        role="group"
        aria-label="Escolher imagem da galeria"
      >
        {images.map((item, itemIndex) => (
          <button
            key={item.path}
            aria-pressed={index === itemIndex}
            onClick={() => setIndex(itemIndex)}
          >
            <span>{String(itemIndex + 1).padStart(2, "0")}</span>
            {item.label}
          </button>
        ))}
      </div>
      {!availableImages.length && (
        <p className="gallery-note">
          Composições demonstrativas temporárias. As capturas reais serão
          adicionadas a esta galeria.
        </p>
      )}
      <dialog
        ref={dialog}
        className={
          theme === "ondefica"
            ? "gallery-dialog ondefica-gallery-dialog"
            : theme === "garago"
              ? "gallery-dialog garago-gallery-dialog"
              : theme === "luria"
                ? "gallery-dialog luria-gallery-dialog"
                : "gallery-dialog"
        }
        aria-label="Imagem ampliada do projeto"
        onKeyDown={trapDialogFocus}
        onClose={() => {
          setDetailZoom(false);
          document.body.style.overflow = "";
          expand.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="lightbox-content">
          <button
            className="lightbox-close icon-button"
            aria-label="Fechar imagem ampliada"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
          {theme === "luria" ? (
            <>
              <button
                className="luria-detail-toggle"
                aria-pressed={detailZoom}
                onClick={() => setDetailZoom((value) => !value)}
              >
                {detailZoom ? "Ver imagem inteira" : "Ampliar detalhes"}
              </button>
              <div
                className={`luria-lightbox-viewport${detailZoom ? " luria-lightbox-zoomed" : ""}`}
                tabIndex={0}
                role="region"
                aria-label="Screenshot do LURIA; role para explorar quando ampliada"
                onKeyDown={(event) => {
                  if (
                    detailZoom &&
                    (event.key === "ArrowLeft" || event.key === "ArrowRight")
                  )
                    event.stopPropagation();
                }}
              >
                <ProjectVisual
                  image={current}
                  theme={theme}
                  available={availableImages.includes(current.path)}
                  sizes="2880px"
                />
              </div>
            </>
          ) : (
            <ProjectVisual
              image={current}
              theme={theme}
              available={availableImages.includes(current.path)}
            />
          )}
          {controls()}
        </div>
      </dialog>
    </div>
  );
}
