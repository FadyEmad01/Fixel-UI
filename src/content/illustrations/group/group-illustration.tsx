"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function GroupIllustration(): ReactNode {
  return (
    <IllustrationCard className="max-w-48 flex-row divide-x [--radius-2xl]">
      <IllustrationCardPanel className="px-6 py-4">
        <IllustrationText />
      </IllustrationCardPanel>
      <IllustrationCardPanel className="px-6 py-4">
        <IllustrationText />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
