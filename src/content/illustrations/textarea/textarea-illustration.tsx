"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function TextareaIllustration(): ReactNode {
  return (
    <IllustrationCard className="[--radius-2xl]" withGradient={false}>
      <IllustrationCardPanel className="flex flex-col gap-2 px-6 py-4">
        <IllustrationText className="w-[60%]" />
        <IllustrationText className="opacity-0" />
        <IllustrationText className="opacity-0" />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
