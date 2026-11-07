import demos from "@/content/project-demos.json";

export type PolicyCase = {
  name: string; stale: boolean; write: boolean; malicious: boolean;
  timeout: boolean; revoked: boolean; expected: string;
};
export type ProjectDemo = {
  brand: string; line: string; heading: string; detail: string;
  items: string[]; notes: string[]; quote: string; support: string;
  demoTitle: string; demoIntro: string;
  cases?: PolicyCase[];
  system?: { name: string; content: string }[];
  shift?: { hours: string; assignment: string; eligibility: string };
  evidence?: { theme: string; observation: string; interpretation: string; action: string }[];
  versions?: { name: string; title: string; body: string; action: string; feedback: string }[];
  bets?: { name: string; effort: number; why: string; tradeoff: string }[];
  screenings?: string[];
};
export function getProjectDemo(theme?: string): ProjectDemo | undefined {
  return theme ? (demos as Record<string, ProjectDemo>)[theme] : undefined;
}

/** Fixture-only decision function. Real agent execution must enforce policy server-side. */
export function evaluatePolicy(c: PolicyCase, bounded: boolean): string {
  if (!bounded) return "continue";
  if (c.revoked || c.malicious) return "block";
  if (c.timeout) return "stop";
  if (c.stale) return "refresh";
  if (c.write) return "review";
  return "continue";
}
