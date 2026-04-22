"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function BadgeIllustration(): ReactNode {
  return (
    <IllustrationCard className="max-w-24 [--radius-2xl]">
      <IllustrationCardPanel className="flex items-center gap-2 px-2.5 py-2">
        <div className="size-2 rounded-full bg-muted-foreground/88" />
        <IllustrationText className="flex-1" />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
