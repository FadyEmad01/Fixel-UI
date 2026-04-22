"use client";

import type { ReactNode } from "react";
import { IllustrationText } from "../_shared";

export function MeterIllustration(): ReactNode {
  return (
    <div className="flex max-w-50 flex-1 flex-col gap-2">
      <div className="flex items-center justify-between">
        <IllustrationText className="w-[50%]" />
        <IllustrationText className="w-8" />
      </div>
      <div className="h-2 w-full rounded-full bg-muted-foreground/20">
        <div className="h-2 w-[65%] rounded-s-full bg-linear-to-b from-(--btn-from) to-(--btn-to)" />
      </div>
    </div>
  );
}
