"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { XIcon } from "lucide-react";

export function ComboboxIllustration(): ReactNode {
  return (
    <IllustrationCard className="[--radius-2xl]" withGradient={false}>
      <IllustrationCardPanel className="flex items-center gap-2 px-3 py-[calc(--spacing(2.5)-1px)]">
        <div className="flex h-5 items-center gap-1 rounded-sm bg-muted-foreground/8 py-0.5 ps-2 pe-1">
          <IllustrationText className="w-6" />
          <IllustrationIcon icon={XIcon} />
        </div>
        <div className="flex h-5 items-center gap-1 rounded-sm bg-muted-foreground/8 py-0.5 ps-2 pe-1">
          <IllustrationText className="w-6" />
          <IllustrationIcon icon={XIcon} />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
