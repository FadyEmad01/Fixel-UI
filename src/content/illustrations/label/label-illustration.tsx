"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function LabelIllustration(): ReactNode {
  return (
    <div className="flex max-w-50 flex-1 flex-col gap-3">
      <IllustrationText className="w-16 bg-primary" />
      <IllustrationCard className="[--radius-2xl]" withGradient={false}>
        <IllustrationCardPanel className="py-3.5" />
      </IllustrationCard>
    </div>
  );
}
