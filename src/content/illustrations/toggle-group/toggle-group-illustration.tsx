"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function ToggleGroupIllustration(): ReactNode {
  return (
    <IllustrationCard className="w-auto flex-row divide-x [--radius-2xl]">
      <IllustrationCardPanel className="bg-clip-padding p-4">
        <IllustrationText className="w-4" />
      </IllustrationCardPanel>
      <IllustrationCardPanel className="bg-muted-foreground/8 bg-clip-padding p-4">
        <IllustrationText className="w-4 bg-foreground" />
      </IllustrationCardPanel>
      <IllustrationCardPanel className="bg-clip-padding p-4">
        <IllustrationText className="w-4" />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
