"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function PopoverIllustration(): ReactNode {
  return (
    <div className="flex max-w-50 flex-1 flex-col items-center gap-2">
      <IllustrationCard className="w-fit [--radius-2xl]">
        <IllustrationCardPanel className="flex items-center gap-2 px-4 py-3">
          <IllustrationText className="w-12" variant="main" />
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationCard className="[--radius-2xl]">
        <IllustrationCardPanel className="flex flex-col gap-3 p-4">
          <IllustrationText className="w-[70%]" variant="main" />
          <div className="flex flex-col gap-1.5">
            <IllustrationText className="w-[80%]" variant="secondary" />
            <IllustrationText className="w-[60%]" variant="secondary" />
          </div>
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
