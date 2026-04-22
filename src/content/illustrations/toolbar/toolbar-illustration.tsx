"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function ToolbarIllustration(): ReactNode {
  return (
    <div className="flex items-center gap-1 rounded-xl border p-1">
      <IllustrationCard className="w-fit [--radius-2xl]">
        <IllustrationCardPanel className="p-3.5">
          <IllustrationText className="w-4" />
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationCard className="w-fit [--radius-2xl]">
        <IllustrationCardPanel className="p-3.5">
          <IllustrationText className="w-4" />
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationCard className="w-fit [--radius-2xl]">
        <IllustrationCardPanel className="p-3.5">
          <IllustrationText className="w-4" />
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
