"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
} from "../_shared";

export function KbdIllustration(): ReactNode {
  return (
    <div className="flex items-center justify-center gap-2">
      <IllustrationCard className="size-10 [--radius-2xl]">
        <IllustrationCardPanel className="flex items-center justify-center p-0 text-muted-foreground/88 leading-none">
          ⌘
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationCard className="size-10 [--radius-2xl]">
        <IllustrationCardPanel className="flex items-center justify-center p-0 text-muted-foreground/88 leading-none">
          K
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
