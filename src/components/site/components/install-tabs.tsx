"use client";

import { useState } from "react";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

interface InstallTabsProps {
  commands: Record<PackageManager, string>;
}

const TABS: { id: PackageManager; label: string }[] = [
  { id: "pnpm", label: "pnpm" },
  { id: "npm", label: "npm" },
  { id: "yarn", label: "yarn" },
  { id: "bun", label: "bun" },
];

export function InstallTabs({ commands }: InstallTabsProps) {
  const [active, setActive] = useState<PackageManager>("pnpm");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(commands[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="w-full rounded-lg border bg-muted/40 overflow-hidden text-sm">
      {/* Tab bar */}
      <div className="flex items-center border-b px-1 pt-1 gap-0.5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={[
              "px-3 py-1.5 rounded-t text-xs font-mono font-medium transition-colors",
              active === tab.id
                ? "bg-background text-foreground border border-b-background border-b-[1px] -mb-px"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Command line */}
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <code className="font-mono text-xs text-foreground break-all">
          {commands[active]}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy install command"
          className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {copied ? (
            /* checkmark */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            /* clipboard */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
