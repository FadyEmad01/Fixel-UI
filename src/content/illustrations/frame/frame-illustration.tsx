"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function FrameIllustration(): ReactNode {
  return (
    <div className="flex-1 rounded-[calc(var(--radius-2xl)+2px)] bg-muted/72 p-1">
      <div className="flex flex-col gap-2 p-4">
        <IllustrationText className="w-[70%]" />
      </div>
      <IllustrationCard className="max-w-none">
        <IllustrationCardPanel className="p-5">
          <div className="flex flex-col gap-2">
            <IllustrationText className="w-[70%]" />
            <IllustrationText className="w-[90%]" variant="secondary" />
          </div>
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
