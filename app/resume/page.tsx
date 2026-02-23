"use client";

import { useState } from "react";

const PROMPT_TEMPLATE = `You are helping me build resume content for my portfolio site. Use the context below to draft a clear, scannable resume (or section) suitable for the web.

## Context I'm providing (choose what you have and paste below)

- **LinkedIn**: [Paste your LinkedIn profile URL or copy-paste the text from your LinkedIn About and Experience sections]
- **Existing resume**: [Paste your current resume text here]
- **Free text**: [Or write a few bullets about your background, roles, and key wins]

---

PASTE YOUR CONTEXT BELOW THIS LINE:
`;

export default function ResumePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PROMPT_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Resume
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Use the prompt below in an AI assistant (e.g. Cursor, ChatGPT) to turn your LinkedIn, existing resume, or notes into polished resume content. Copy the prompt, paste your context where indicated, then run it. Paste the result into your site or docs as you like.
        </p>

        <div className="relative rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
          <pre className="p-4 sm:p-6 text-sm text-neutral-800 dark:text-neutral-200 overflow-x-auto whitespace-pre-wrap font-mono">
            {PROMPT_TEMPLATE}
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            {copied ? "Copied" : "Copy prompt"}
          </button>
        </div>

        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          Tip: Replace the bracketed placeholders with your actual LinkedIn URL, resume text, or free-form notes before running the prompt.
        </p>
      </div>
    </div>
  );
}
