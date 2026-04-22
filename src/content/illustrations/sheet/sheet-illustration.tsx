"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationButton,
  IllustrationText,
} from "../_shared";

export function SheetIllustration(): ReactNode {
  return (
    <div className="flex h-full flex-1 gap-2">
      <div className="flex-1 rounded-xl border border-input border-dashed" />
      <IllustrationCard className="h-full max-w-1/3 [--radius-2xl]">
        <IllustrationCardPanel className="flex flex-col gap-4 p-3">
          <div className="flex flex-1 flex-col gap-2">
            <IllustrationText className="w-[60%]" variant="main" />
            <IllustrationText variant="secondary" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <IllustrationButton variant="primary" />
          </div>
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
