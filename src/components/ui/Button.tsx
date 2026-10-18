import Link from "next/link";
import type { ReactNode } from "react";
export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  download?: boolean;
}) {
  const className = `button button-${variant}`;
  if (external || download || href.startsWith("mailto:"))
    return (
      <a
        href={href}
        className={className}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        download={download || undefined}
      >
        {children}
        {external && <span className="sr-only"> (nova aba)</span>}
      </a>
    );
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
