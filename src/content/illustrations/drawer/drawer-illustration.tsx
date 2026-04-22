"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
} from "../_shared";

export function DrawerIllustration(): ReactNode {
  return (
    <div className="flex h-full w-full flex-1 flex-col justify-end gap-2">
      <div className="flex-1 rounded-xl border border-input border-dashed" />
      <IllustrationCard className="max-w-none shrink-0 [--radius-2xl]">
        <IllustrationCardPanel className="pt-1 pb-12">
          <div className="flex justify-center py-2">
            <div className="h-1 w-12 rounded-full bg-muted-foreground/30" />
          </div>
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
