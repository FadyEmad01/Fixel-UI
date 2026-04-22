"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export function PaginationIllustration(): ReactNode {
  return (
    <div className="flex flex-1 items-center gap-4">
      <IllustrationCard className="w-fit [--radius-2xl]">
        <IllustrationCardPanel className="flex items-center gap-2 p-2">
          <IllustrationIcon icon={ChevronLeftIcon} />
        </IllustrationCardPanel>
      </IllustrationCard>
      <div className="flex flex-1 gap-2">
        <IllustrationText className="flex-1" variant="secondary" />
        <IllustrationText className="flex-1" variant="secondary" />
        <IllustrationText className="flex-1" variant="secondary" />
      </div>
      <IllustrationCard className="w-fit [--radius-2xl]">
        <IllustrationCardPanel className="flex items-center gap-2 p-2">
          <IllustrationIcon icon={ChevronRightIcon} />
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
