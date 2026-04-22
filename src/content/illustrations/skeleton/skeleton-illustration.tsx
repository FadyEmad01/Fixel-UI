"use client";

import type { ReactNode } from "react";
import { IllustrationText } from "../_shared";

export function SkeletonIllustration(): ReactNode {
  return (
    <div className="mask-[linear-gradient(100deg,black_0%,rgba(0,0,0,0.2)_20%,rgba(0,0,0,0.2)_80%,rgba(0,0,0,0.6)_100%)] flex max-w-50 flex-1 items-center gap-3">
      <div className="size-8 rounded-full bg-muted-foreground/20" />
      <div className="flex flex-1 flex-col gap-2">
        <IllustrationText className="w-full" variant="secondary" />
        <IllustrationText className="w-full" variant="secondary" />
      </div>
    </div>
  );
}
