import { MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
export function About() {
  return (
    <section id="sobre" className="section about-section">
      <Container>
        <div className="editorial-grid">
          <div className="section-aside">
            <span className="section-kicker">Sobre mim</span>
            <h2>
              Entre a lógica
              <br />e a experiência.
            </h2>
            <p className="location-note">
              <MapPin size={16} /> {profile.location}
            </p>
          </div>
          <ScrollReveal className="about-copy">
            <p className="lead">
              Construir software é conectar o que acontece nos dados ao que faz
              sentido para as pessoas.
            </p>
            {profile.about.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <div className="education">
              <span>Formação</span>
              <strong>{profile.education.course}</strong>
              <p>{profile.education.institution}</p>
              <p>{profile.education.period}</p>
            </div>
          </ScrollReveal>
        </div>
        <div className="about-specialties">
          <span>Aplicações corporativas</span>
          <span>Dados & regras de negócio</span>
          <span>Interfaces & integrações</span>
        </div>
      </Container>
    </section>
  );
}
