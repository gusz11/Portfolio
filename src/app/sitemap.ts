import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl
    ? [
        { url: siteUrl, changeFrequency: "monthly", priority: 1 },
        ...projects.map((project) => ({
          url: `${siteUrl}/projetos/${project.slug}`,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      ]
    : [];
}
