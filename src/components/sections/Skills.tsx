import { skillGroups } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Chip } from "@/components/ui/Chip";
export function Skills() {
  return (
    <section id="tecnologias" className="section skills-section">
      <Container>
        <SectionHeading
          title="As ferramentas por trás das ideias."
          description="Uma base no ecossistema Oracle. Caminhos abertos para web, mobile e integração de sistemas."
        />
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-row" key={group.title}>
              <div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <div className="chips">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
