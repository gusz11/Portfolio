import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { getProject, publicAssetExists } from "@/lib/project-utils";
import { pageMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectOverview } from "@/components/projects/ProjectOverview";
import { ProjectFeatures } from "@/components/projects/ProjectFeatures";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectTechStack } from "@/components/projects/ProjectTechStack";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  return project
    ? pageMetadata(
        project.name,
        project.description,
        `/projetos/${project.slug}`,
      )
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const availableImages = project.gallery
    .map((image) => image.path)
    .filter(publicAssetExists);
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`case-study case-${project.theme}`}
    >
      <ProjectHero
        project={project}
        available={publicAssetExists(project.cover.path)}
      />
      <ProjectOverview project={project} />
      <ProjectFeatures project={project} />
      <section className="section case-gallery-section">
        <Container>
          <SectionHeading
            title={
              project.theme === "garago"
                ? "Uma experiência na palma da mão."
                : project.theme === "ondefica"
                  ? "Cada tela, uma parte da viagem."
                  : "Um olhar mais de perto."
            }
            description="Explore os ambientes e as diferentes partes do projeto."
          />
          <ProjectGallery
            images={project.gallery}
            theme={project.theme}
            availableImages={availableImages}
          />
        </Container>
      </section>
      <section className="section case-development">
        <Container>
          <div className="editorial-grid">
            <ProjectTechStack project={project} />
            <div>
              <h2>
                {project.nextSteps.length
                  ? "Próximos passos"
                  : "Explore o projeto"}
              </h2>
              {project.nextSteps.length > 0 && (
                <ul className="next-steps">
                  {project.nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              )}
              <ProjectLinks links={project.links} />
            </div>
          </div>
        </Container>
      </section>
      <ProjectNavigation slug={project.slug} />
    </main>
  );
}
