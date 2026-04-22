"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { InfoIcon } from "lucide-react";

export function TooltipIllustration(): ReactNode {
  return (
    <div className="flex max-w-32 flex-1 flex-col items-center gap-2">
      <IllustrationCard className="[--radius-2xl]">
        <IllustrationCardPanel className="p-4">
          <IllustrationText />
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationIcon icon={InfoIcon} />
    </div>
  );
}
