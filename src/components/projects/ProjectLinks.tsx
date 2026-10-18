import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { Button } from "@/components/ui/Button";
export function ProjectLinks({ links }: { links: Project["links"] }) {
  if (!links.length) return null;
  return (
    <div className="case-links">
      {links.map((link) => (
        <Button key={link.href} href={link.href} external variant="secondary">
          {link.label}
          <ArrowUpRight size={17} />
        </Button>
      ))}
    </div>
  );
}
