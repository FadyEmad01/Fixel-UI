"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationButton,
  IllustrationText,
} from "../_shared";

export function DialogIllustration(): ReactNode {
  return (
    <IllustrationCard className="max-w-36 [--radius-2xl]">
      <IllustrationCardPanel className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <IllustrationText className="w-[60%]" variant="main" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 rounded-sm bg-muted-foreground/8" />
          <div className="h-4 rounded-sm bg-muted-foreground/8" />
        </div>
        <div className="flex items-center justify-end gap-2">
          <IllustrationButton variant="secondary" />
          <IllustrationButton variant="primary" />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
