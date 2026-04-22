"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function EmptyIllustration(): ReactNode {
  return (
    <IllustrationCard className="border-input border-dashed bg-none shadow-none before:hidden">
      <IllustrationCardPanel className="flex flex-col items-center gap-2">
        <div className="size-8 rounded-full bg-muted-foreground/20" />
        <IllustrationText className="w-[60%]" />
        <IllustrationText className="w-[80%]" variant="secondary" />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
