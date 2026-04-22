"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function ScrollAreaIllustration(): ReactNode {
  return (
    <IllustrationCard className="max-w-36 [--radius-2xl]">
      <IllustrationCardPanel className="relative p-0">
        <div className="flex flex-col gap-2 p-3">
          <IllustrationText className="w-[80%]" variant="secondary" />
          <IllustrationText className="w-[90%]" variant="secondary" />
          <IllustrationText className="w-[70%]" variant="secondary" />
          <IllustrationText className="w-[85%]" variant="secondary" />
          <IllustrationText className="w-[90%]" variant="secondary" />
          <IllustrationText className="w-[80%]" variant="secondary" />
        </div>
        <div className="absolute top-2 right-1 h-8 w-1 rounded-full bg-muted-foreground/40" />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
