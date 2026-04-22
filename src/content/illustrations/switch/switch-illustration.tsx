"use client";

import type { ReactNode } from "react";

export function SwitchIllustration(): ReactNode {
  return (
    <div className="h-6 w-10 rounded-full bg-muted-foreground/20 p-0.5">
      <div className="size-5 rounded-full bg-linear-to-b from-card to-card/90 shadow-xs/5 dark:from-background/90 dark:to-background" />
    </div>
  );
}
