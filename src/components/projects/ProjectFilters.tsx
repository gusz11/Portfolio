"use client";
import type { ProjectCategory } from "@/types/project";
export type ProjectFilter = "Todos" | ProjectCategory;
const filters: ProjectFilter[] = ["Todos", "Oracle", "Web", "Mobile"];
export function ProjectFilters({
  value,
  onChange,
}: {
  value: ProjectFilter;
  onChange: (value: ProjectFilter) => void;
}) {
  return (
    <div
      className="project-filters"
      role="group"
      aria-label="Filtrar projetos por tecnologia"
    >
      {filters.map((filter) => (
        <button
          key={filter}
          aria-pressed={value === filter}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
