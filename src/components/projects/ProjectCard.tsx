import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectPreview } from "@/types/project";
import { TiltCard } from "@/components/animations/TiltCard";
import { Chip } from "@/components/ui/Chip";
import { ProjectVisual } from "./ProjectVisual";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
export function ProjectCard({
  project,
  available,
}: {
  project: ProjectPreview;
  available: boolean;
}) {
  return (
    <article className={`project-card card-${project.theme}`}>
      <ScrollReveal>
        <TiltCard>
          <Link
            href={`/projetos/${project.slug}`}
            className="project-cover-link"
            aria-label={`Ver estudo de caso: ${project.name}`}
          >
            <ProjectVisual
              image={project.cover}
              theme={project.theme}
              available={available}
            />
            <span className="project-cover-action">
              <ArrowUpRight size={23} />
            </span>
          </Link>
        </TiltCard>
      </ScrollReveal>
      <div className="project-card-info">
        <span className="project-category">{project.category}</span>
        <h3>
          <Link href={`/projetos/${project.slug}`}>
            {project.name}
            <ArrowUpRight size={24} />
          </Link>
        </h3>
        <p>{project.description}</p>
        <div className="chips">
          {project.stack.slice(0, 4).map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
          {project.stack.length === 0 && <Chip>Experiência responsiva</Chip>}
        </div>
      </div>
    </article>
  );
}
