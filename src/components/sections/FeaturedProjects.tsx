import { projects } from "@/data/projects";
import {
  getAvailableCoverComposition,
  publicAssetExists,
} from "@/lib/project-utils";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
export function FeaturedProjects() {
  return (
    <section id="projetos" className="section projects-section">
      <Container>
        <SectionHeading
          title="Ideias que viraram projetos."
          description="Diferentes contextos. O mesmo cuidado com a construção. Explore os projetos e o que existe por trás de cada interface."
        />
        <ProjectGrid
          projects={projects.map(
            ({
              slug,
              name,
              category,
              filters,
              theme,
              description,
              stack,
              cover,
              coverComposition,
            }) => ({
              slug,
              name,
              category,
              filters,
              theme,
              description,
              stack,
              cover,
              coverComposition: getAvailableCoverComposition({
                coverComposition,
              }),
            }),
          )}
          availableImages={projects
            .map((project) => project.cover.path)
            .filter(publicAssetExists)}
        />
      </Container>
    </section>
  );
}
