"use client";

import type { ReactNode } from "react";

export function ProgressIllustration(): ReactNode {
  return (
    <div className="flex max-w-50 flex-1 flex-col gap-2">
      <div className="h-2 w-full rounded-full bg-muted-foreground/20">
        <div className="h-2 w-[45%] rounded-s-full bg-linear-to-b from-(--btn-from) to-(--btn-to)" />
      </div>
    </div>
  );
}
