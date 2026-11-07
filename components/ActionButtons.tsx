"use client";

import { useState } from "react";
import { buttonClass } from "./Button";
import { Check, Copy, Printer } from "./icons";

export function CopyButton({ text, label = "Copy", className }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={buttonClass("secondary", className)}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {}
      }}
    >
      {copied ? <Check /> : <Copy />}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}

export function PrintButton({ label = "Download PDF", className }: { label?: string; className?: string }) {
  return (
    <button type="button" className={buttonClass("primary", className)} onClick={() => window.print()}>
      <Printer />
      {label}
    </button>
  );
}
