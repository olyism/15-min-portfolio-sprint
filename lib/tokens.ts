import fs from "fs";
import path from "path";

export type Token = {
  name: string;
  value: string;
  note?: string;
  /** For light-dark() colours */
  light?: string;
  dark?: string;
};

export type TokenGroup = { name: string; tokens: Token[] };

/**
 * Reads app/tokens.css so /design-system always matches the real tokens.
 * Groups come from "@group Name" comments; notes come from the comment after each token.
 */
export function getTokenGroups(): TokenGroup[] {
  const css = fs.readFileSync(path.join(process.cwd(), "app", "tokens.css"), "utf-8");
  const groups: TokenGroup[] = [];
  let current: TokenGroup | null = null;

  // Join multi-line declarations, e.g. long font stacks.
  const statements = css.replace(/\/\*\s*@group\s+(.+?)\s*\*\//g, ";@group $1;").split(";");
  let pendingNote: string | undefined;

  for (let i = 0; i < statements.length; i++) {
    const s = statements[i];
    const group = s.match(/@group\s+(.+)/);
    if (group) {
      current = { name: group[1].trim(), tokens: [] };
      groups.push(current);
      continue;
    }
    // A note comment sits at the start of the next statement.
    const noteMatch = s.match(/^\s*\/\*\s*(.+?)\s*\*\//);
    if (noteMatch && current?.tokens.length) {
      current.tokens[current.tokens.length - 1].note = noteMatch[1];
    }
    const decl = s.replace(/\/\*[\s\S]*?\*\//g, "").match(/--([\w-]+)\s*:\s*([\s\S]+)/);
    if (!decl || !current) continue;
    const [, name, rawValue] = decl;
    if (name.endsWith("*") || name.includes("--")) continue; // resets and sub-properties
    const value = rawValue.replace(/\s+/g, " ").trim();
    const ld = value.match(/^light-dark\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)$/);
    current.tokens.push({ name, value, light: ld?.[1], dark: ld?.[2], note: pendingNote });
    pendingNote = undefined;
  }
  return groups;
}
