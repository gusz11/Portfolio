import type { Project } from "@/types/project";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
export function ProjectFeatures({ project }: { project: Project }) {
  return (
    <>
      <section className="section case-features">
        <Container>
          <div className="editorial-grid">
            <div className="section-aside">
              <span className="section-kicker">Funcionalidades e escopo</span>
              <h2>
                {project.theme === "ondefica"
                  ? "Seu roteiro começa aqui."
                  : project.theme === "garago"
                    ? "Pensado para o dia a dia."
                    : project.theme === "financeiro"
                      ? "Do movimento à visão do todo."
                      : "Mais caminhos para aprender."}
              </h2>
            </div>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="section case-technical">
        <Container>
          <h2>Por trás da experiência.</h2>
          <div className="technical-grid">
            {project.technical.map((item) => (
              <ScrollReveal key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
