import worlds from "@/content/project-worlds.json";

export type ProjectImage = { src: string; alt: string; width: number; height: number; caption: string };

export type ProjectWorld = {
  name: string; systemName: string; thesis: string;
  font: string; displayFamily: string; utilityFamily: string; palettePrefix: string;
  voice: string; sample: string; principles: string[]; principleDetails: string[]; spacing: string[]; shape: string;
  references: { name: string; url: string; note: string }[];
  hero: ProjectImage;
  logo?: { src: string; width: number; height: number };
  sectionImages?: Record<string, ProjectImage>;
  description: string;
};
export function getProjectWorld(slug?: string): ProjectWorld | undefined {
  return slug ? (worlds as Record<string, ProjectWorld>)[slug] : undefined;
}
export const PROJECT_COLOUR_ROLES = ["bg", "panel", "fg", "muted", "accent", "mark"] as const;
export const PROJECT_COLOUR_LABELS = {
  bg: "Ground", panel: "Reading surface", fg: "Primary ink", muted: "Secondary ink", accent: "Action", mark: "Selected surface",
};
