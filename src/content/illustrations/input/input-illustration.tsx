"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function InputIllustration(): ReactNode {
  return (
    <IllustrationCard className="[--radius-2xl]" withGradient={false}>
      <IllustrationCardPanel className="px-6 py-4">
        <IllustrationText className="w-[60%]" />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
