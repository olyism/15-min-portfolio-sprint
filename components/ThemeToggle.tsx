"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { Monitor, Moon, Sun } from "./icons";

type Theme = "system" | "light" | "dark";
const EVENT = "themechange";

function read(): Theme {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function apply(theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
  } catch {}
  if (theme === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(EVENT));
}

const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "system", label: "System theme", Icon: Monitor },
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
];

/** System / Light / Dark switch. The choice is saved in this browser. */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, read, () => "system" as Theme);
  return (
    <div role="radiogroup" aria-label="Theme" className={cn("inline-flex rounded-pill bg-bg-subtle p-1", className)}>
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          title={label}
          onClick={() => apply(value)}
          className={cn(
            "inline-flex size-7 items-center justify-center rounded-pill text-fg-subtle transition-colors duration-(--duration-fast)",
            "hover:text-fg aria-checked:bg-bg-elevated aria-checked:text-fg aria-checked:shadow-card",
          )}
        >
          <Icon width={15} height={15} />
        </button>
      ))}
    </div>
  );
}

/** Runs before the page paints so there's no flash of the wrong theme. */
export const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;
