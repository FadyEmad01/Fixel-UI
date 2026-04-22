"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { SearchIcon } from "lucide-react";

export function InputGroupIllustration(): ReactNode {
  return (
    <IllustrationCard className="[--radius-2xl]" withGradient={false}>
      <IllustrationCardPanel className="flex gap-2 p-0">
        <div className="flex flex-1 items-center gap-2 py-2.5 ps-4">
          <IllustrationIcon icon={SearchIcon} />
          <IllustrationText className="w-[60%]" />
        </div>
        <div className="flex items-center py-2.5 pe-4">
          <div className="size-4 shrink-0 rounded bg-muted-foreground/20" />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
