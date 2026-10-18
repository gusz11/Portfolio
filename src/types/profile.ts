export interface Profile {
  name: string;
  firstName: string;
  role: string;
  location: string;
  heroTitle: string;
  headline: string;
  introduction: string;
  about: string[];
  education: { course: string; institution: string };
  email?: string;
  linkedin?: string;
  github: string;
  resume?: string;
}
