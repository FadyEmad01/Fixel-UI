"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { ChevronDownIcon } from "lucide-react";

export function SelectIllustration(): ReactNode {
  return (
    <IllustrationCard className="[--radius-2xl]" withGradient={false}>
      <IllustrationCardPanel className="flex gap-2 p-0">
        <div className="flex flex-1 items-center justify-between gap-2 py-2.5 ps-4 pe-2.5">
          <IllustrationText className="w-[60%]" />
          <IllustrationIcon icon={ChevronDownIcon} />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
