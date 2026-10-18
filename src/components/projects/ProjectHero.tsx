import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/types/project";
import { Container } from "@/components/layout/Container";
import { ProjectVisual } from "./ProjectVisual";
export function ProjectHero({
  project,
  available,
}: {
  project: Project;
  available: boolean;
}) {
  return (
    <section className="case-hero">
      <Container>
        <Link href="/#projetos" className="back-link">
          <ArrowLeft size={17} /> Todos os projetos
        </Link>
        <div className="case-intro">
          <div>
            <p className="case-project-name">{project.name}</p>
            <h1>{project.title}</h1>
          </div>
          <div className="case-intro-aside">
            <span className="project-status">
              <span className="status-dot" />
              {project.status}
            </span>
            <p>{project.description}</p>
          </div>
        </div>
        <div className="case-meta">
          <div>
            <span>Contexto</span>
            <strong>{project.category}</strong>
          </div>
          <div>
            <span>Minha atuação</span>
            <strong>{project.role}</strong>
          </div>
          <div>
            <span>Explorar</span>
            <a href="#visao-geral">Por dentro do projeto ↓</a>
          </div>
        </div>
        <ProjectVisual
          image={project.cover}
          theme={project.theme}
          available={available}
          priority
        />
      </Container>
    </section>
  );
}
