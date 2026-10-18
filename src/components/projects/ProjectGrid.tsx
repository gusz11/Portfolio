"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ProjectPreview } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ProjectFilters, type ProjectFilter } from "./ProjectFilters";
import { ProjectCard } from "./ProjectCard";
export function ProjectGrid({
  projects,
  availableImages,
}: {
  projects: ProjectPreview[];
  availableImages: string[];
}) {
  const [filter, setFilter] = useState<ProjectFilter>("Todos");
  const reduced = useReducedMotion();
  const visible = projects.filter(
    (project) => filter === "Todos" || project.filters.includes(filter),
  );
  return (
    <>
      <div className="projects-toolbar">
        <ProjectFilters value={filter} onChange={setFilter} />
        <span className="project-count" aria-live="polite">
          {visible.length} {visible.length === 1 ? "projeto" : "projetos"}
        </span>
      </div>
      <div className="project-grid">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            >
              <ProjectCard
                project={project}
                available={availableImages.includes(project.cover.path)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
