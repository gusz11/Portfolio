import { existsSync } from "node:fs";
import path from "node:path";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

export function getAvailableCoverComposition(
  project: Pick<Project, "coverComposition">,
) {
  const composition = project.coverComposition;
  return composition &&
    publicAssetExists(composition.primary.path) &&
    publicAssetExists(composition.secondary.path)
    ? composition
    : undefined;
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
export function getProjectNeighbors(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
// Only public assets can be exposed. Existence is checked at build time.
export function publicAssetExists(asset?: string): asset is string {
  if (!asset || !asset.startsWith("/") || asset.includes("..")) return false;
  return existsSync(path.join(process.cwd(), "public", asset));
}
