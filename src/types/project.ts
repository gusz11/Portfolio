export type ProjectCategory = "Oracle" | "Web" | "Mobile";
export type ProjectTheme = "luria" | "financeiro" | "garago" | "ondefica";
export interface ProjectImage {
  label: string;
  alt: string;
  path: string;
  width?: number;
  height?: number;
  presentation?: {
    title: string;
    description: string;
    note: string;
  };
}
export interface ProjectCoverComposition {
  primary: ProjectImage;
  secondary: ProjectImage;
}
export interface Project {
  slug: string;
  name: string;
  title: string;
  category: string;
  filters: ProjectCategory[];
  theme: ProjectTheme;
  description: string;
  status: string;
  role: string;
  stack: string[];
  stackNote?: string;
  cover: ProjectImage;
  coverComposition?: ProjectCoverComposition;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  technical: { title: string; body: string }[];
  nextSteps: string[];
  gallery: ProjectImage[];
  links: { label: string; href: string }[];
}
export type ProjectPreview = Pick<
  Project,
  | "slug"
  | "name"
  | "category"
  | "filters"
  | "theme"
  | "description"
  | "stack"
  | "cover"
  | "coverComposition"
>;
