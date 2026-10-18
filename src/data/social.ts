import { profile } from "./profile";
export const social = [
  { label: "GitHub", href: profile.github },
  ...(profile.linkedin ? [{ label: "LinkedIn", href: profile.linkedin }] : []),
];
