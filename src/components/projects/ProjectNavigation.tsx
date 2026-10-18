import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectNeighbors } from "@/lib/project-utils";
import { Container } from "@/components/layout/Container";
export function ProjectNavigation({ slug }: { slug: string }) {
  const { previous, next } = getProjectNeighbors(slug);
  return (
    <nav className="case-navigation" aria-label="Navegação entre projetos">
      <Container>
        <Link href={`/projetos/${previous.slug}`}>
          <span>
            <ArrowLeft size={16} />
            Projeto anterior
          </span>
          <strong>{previous.name}</strong>
        </Link>
        <Link href={`/projetos/${next.slug}`}>
          <span>
            Próximo projeto
            <ArrowUpRight size={16} />
          </span>
          <strong>{next.name}</strong>
        </Link>
      </Container>
    </nav>
  );
}
