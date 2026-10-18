export interface Certification {
  name: string;
  issuer: string;
  year?: string;
  url?: string;
  badge?: string;
}
export const certifications: Certification[] = [
  {
    name: "Oracle Data Platform 2025 Certified Foundations Associate",
    issuer: "Oracle",
  },
  {
    name: "Oracle AI Database Certified Foundations Associate",
    issuer: "Oracle",
  },
];
