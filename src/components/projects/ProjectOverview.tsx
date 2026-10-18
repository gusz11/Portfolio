import type { Project } from "@/types/project";
import { Container } from "@/components/layout/Container";
export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section id="visao-geral" className="section case-overview">
      <Container>
        <div className="editorial-grid">
          <div className="section-aside">
            <span className="section-kicker">Visão geral</span>
            <h2>
              {project.theme === "garago"
                ? "Uma conexão dentro do condomínio."
                : project.theme === "ondefica"
                  ? "Entre descobrir e estar lá."
                  : project.theme === "financeiro"
                    ? "Os dados contam uma história."
                    : "Aprendizagem em diferentes ambientes."}
            </h2>
          </div>
          <div>
            <p className="lead">{project.overview}</p>
            <div className="case-problem-solution">
              <div>
                <h3>O contexto</h3>
                <p>{project.problem}</p>
              </div>
              <div>
                <h3>A construção</h3>
                <p>{project.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
