import type { Project } from "@/types/project";
import { Chip } from "@/components/ui/Chip";
export function ProjectTechStack({ project }: { project: Project }) {
  return (
    <div className="case-stack">
      <h2>Tecnologias</h2>
      {project.stack.length > 0 && (
        <div className="chips">
          {project.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      )}
      {project.stackNote && <p>{project.stackNote}</p>}
    </div>
  );
}
