export interface Profile {
  name: string;
  fullName: string;
  firstName: string;
  role: string;
  location: string;
  heroTitle: string;
  headline: string;
  introduction: string;
  about: string[];
  education: { course: string; institution: string; period: string };
  email?: string;
  linkedin?: string;
  github: string;
  resume?: string;
}
