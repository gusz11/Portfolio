import Link from "next/link";
import { profile } from "@/data/profile";
import { Container } from "./Container";
export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Link href="/#inicio" className="wordmark">
          {profile.name}
          <span>.</span>
        </Link>
        <p>Desenvolvido com intenção. Em Brasília.</p>
        <span>© {new Date().getFullYear()} Gustavo Jesus</span>
      </Container>
    </footer>
  );
}
