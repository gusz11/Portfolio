"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navigation } from "@/data/navigation";
import { MobileMenu } from "./MobileMenu";
export function Header() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link
          href="/#inicio"
          className="wordmark"
          aria-label="Gustavo Jesus, início"
        >
          Gustavo Jesus<span>.</span>
        </Link>
        <nav className="desktop-navigation" aria-label="Navegação principal">
          {navigation
            .filter((item) => item.id !== "contato")
            .map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </Link>
            ))}
        </nav>
        <Link className="header-contact" href="/#contato">
          Vamos conversar <ArrowUpRight size={16} />
        </Link>
        <MobileMenu active={active} />
      </div>
    </header>
  );
}
