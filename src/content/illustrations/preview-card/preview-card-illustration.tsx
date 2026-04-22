"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function PreviewCardIllustration(): ReactNode {
  return (
    <IllustrationCard className="max-w-50">
      <IllustrationCardPanel className="flex items-center gap-3 p-4">
        <div className="size-9 shrink-0 rounded-full bg-muted-foreground/20" />
        <div className="flex flex-1 flex-col gap-2">
          <IllustrationText className="w-[70%]" variant="main" />
          <IllustrationText variant="secondary" />
          <IllustrationText className="w-[90%]" variant="secondary" />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
