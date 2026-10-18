import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GitHubIcon as Github } from "@/components/ui/GitHubIcon";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/animations/TextReveal";
import { AnimatedGradient } from "@/components/animations/AnimatedGradient";
export function Hero() {
  return (
    <section id="inicio" className="hero">
      <Container>
        <div className="hero-main">
          <TextReveal>
            <p className="hero-location" data-reveal>
              <span className="status-dot" />
              Desenvolvedor de Software
              <span className="hero-location-divider">/</span>
              <span>Brasília, Brasil</span>
            </p>
            <h1 data-reveal>
              Olá, eu sou
              <br />
              Gustavo<span className="title-period">.</span>
            </h1>
            <p className="hero-headline" data-reveal>
              {profile.headline}
            </p>
            <p className="hero-description" data-reveal>
              {profile.introduction}
            </p>
            <div className="hero-actions" data-reveal>
              <Button href="#projetos">
                Explorar projetos <ArrowDown size={17} />
              </Button>
              <Button href="#contato" variant="text">
                Entrar em contato <ArrowUpRight size={17} />
              </Button>
            </div>
            <div className="hero-socials" data-reveal>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} /> GitHub{" "}
                <span className="sr-only">(nova aba)</span>
              </a>
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <ArrowUpRight size={15} />
                  <span className="sr-only">(nova aba)</span>
                </a>
              )}
            </div>
          </TextReveal>
          <AnimatedGradient />
        </div>
        <div className="hero-baseline">
          <span>
            Oracle APEX <i /> SQL & PL/SQL <i /> Web & Mobile
          </span>
          <a href="#sobre">
            Continue explorando <ArrowDown size={14} />
          </a>
        </div>
      </Container>
    </section>
  );
}
