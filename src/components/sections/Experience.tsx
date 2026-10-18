import { experience } from "@/data/experience";
import { Container } from "@/components/layout/Container";
import { AnimatedTimeline } from "@/components/animations/AnimatedTimeline";
export function Experience() {
  return (
    <section id="experiencia" className="section experience-section">
      <Container>
        <div className="editorial-grid">
          <div className="section-aside">
            <span className="section-kicker">Experiência</span>
            <h2>
              Software no
              <br />
              mundo real.
            </h2>
            <p>
              Da regra de negócio à interface, no contexto de aplicações
              corporativas.
            </p>
          </div>
          <AnimatedTimeline>
            <article className="experience-entry">
              <span className="timeline-dot" />
              <div className="experience-meta">
                <span>{experience.location}</span>
                {experience.period && <span>{experience.period}</span>}
              </div>
              <h3>
                {experience.organization}
                <span>{experience.abbreviation}</span>
              </h3>
              <p className="experience-role">{experience.role}</p>
              <ul className="responsibilities">
                {experience.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </AnimatedTimeline>
        </div>
      </Container>
    </section>
  );
}
