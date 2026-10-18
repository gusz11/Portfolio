import { ArrowUpRight, Download, Mail } from "lucide-react";
import { GitHubIcon as Github } from "@/components/ui/GitHubIcon";
import { profile } from "@/data/profile";
import { social } from "@/data/social";
import { publicAssetExists } from "@/lib/project-utils";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
export function Contact() {
  return (
    <section id="contato" className="section contact-section">
      <Container>
        <div className="contact-top">
          <span className="section-kicker">Vamos conversar</span>
          <span className="contact-availability">
            <span className="status-dot" /> Aberto a oportunidades
          </span>
        </div>
        <h2>
          Vamos construir
          <br />
          algo interessante?
        </h2>
        <div className="contact-bottom">
          <p>
            Estou aberto a oportunidades e conversas sobre desenvolvimento de
            software, projetos e tecnologia.
          </p>
          <div className="contact-actions">
            {social.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                external
                variant="secondary"
              >
                {link.label === "GitHub" && <Github size={18} />}
                {link.label}
                <ArrowUpRight size={17} />
              </Button>
            ))}
            {profile.email && (
              <>
                <Button href={`mailto:${profile.email}`}>
                  <Mail size={17} />
                  {profile.email}
                </Button>
                <CopyEmailButton email={profile.email} />
              </>
            )}
            {profile.resume?.endsWith(".pdf") &&
              publicAssetExists(profile.resume) && (
                <Button href={profile.resume} download variant="secondary">
                  Currículo <Download size={17} />
                </Button>
              )}
          </div>
        </div>
      </Container>
    </section>
  );
}
