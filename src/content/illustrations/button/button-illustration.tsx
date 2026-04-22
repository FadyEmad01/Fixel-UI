"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function ButtonIllustration(): ReactNode {
  return (
    <IllustrationCard
      className="max-w-24 border-none bg-linear-to-b from-(--btn-from) to-(--btn-to) [--radius-2xl]"
      withGradient={false}
    >
      <IllustrationCardPanel className="px-6 py-4">
        <IllustrationText className="bg-primary-foreground/40" />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
