"use client";

import type { ReactNode } from "react";
import { IllustrationText } from "../_shared";

export function TabsIllustration(): ReactNode {
  return (
    <div className="flex max-w-50 flex-col gap-4">
      <div className="flex rounded-lg bg-muted-foreground/12 p-0.5">
        <div className="rounded-[calc(var(--radius-lg)-1px)] bg-linear-to-b from-card to-card/90 p-3 shadow-xs/5 dark:from-background/90 dark:to-background">
          <IllustrationText className="w-6 bg-primary" />
        </div>
        <div className="rounded-[calc(var(--radius-lg)-1px)] p-3">
          <IllustrationText className="w-6" variant="secondary" />
        </div>
        <div className="rounded-[calc(var(--radius-lg)-1px)] p-3">
          <IllustrationText className="w-6" variant="secondary" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <IllustrationText className="w-[70%]" />
        <IllustrationText variant="secondary" />
      </div>
    </div>
  );
}
