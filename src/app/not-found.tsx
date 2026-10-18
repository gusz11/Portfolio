import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="not-found">
      <Container>
        <span className="error-code">404</span>
        <h1>
          Este caminho ainda
          <br />
          não foi construído.
        </h1>
        <p>
          A página que você procura não está aqui. Os projetos continuam logo
          ali.
        </p>
        <Button href="/#projetos">
          <ArrowLeft size={18} />
          Explorar projetos
        </Button>
      </Container>
    </main>
  );
}
