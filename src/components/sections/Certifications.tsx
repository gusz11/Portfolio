import Image from "next/image";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certifications } from "@/data/certifications";
import { publicAssetExists } from "@/lib/project-utils";
import { Container } from "@/components/layout/Container";
export function Certifications() {
  return (
    <section id="certificacoes" className="section certifications-section">
      <Container>
        <div className="editorial-grid">
          <div className="section-aside">
            <span className="section-kicker">Certificações</span>
            <h2>
              Aprendizado
              <br />
              que se aprofunda.
            </h2>
            <p>Fundamentos para continuar construindo.</p>
          </div>
          <div className="certification-list">
            {certifications.map((cert) => (
              <article key={cert.name} className="certification">
                <div className="certification-icon">
                  {publicAssetExists(cert.badge) ? (
                    <Image
                      src={cert.badge}
                      width={48}
                      height={48}
                      alt={`Badge ${cert.name}`}
                    />
                  ) : (
                    <BadgeCheck size={30} strokeWidth={1.3} />
                  )}
                </div>
                <div>
                  <p>
                    {cert.issuer}
                    {cert.year ? ` / ${cert.year}` : ""}
                  </p>
                  <h3>{cert.name}</h3>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      Validar certificação <ArrowUpRight size={16} />
                      <span className="sr-only">(nova aba)</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
