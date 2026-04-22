"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function ToggleIllustration(): ReactNode {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <IllustrationCard className="max-w-12 [--radius-2xl]">
        <IllustrationCardPanel className="rounded-[inherit] p-4">
          <IllustrationText />
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationCard className="max-w-12 shadow-none [--radius-2xl] before:hidden">
        <IllustrationCardPanel className="rounded-[inherit] bg-muted-foreground/8 p-4">
          <IllustrationText className="bg-primary" />
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
