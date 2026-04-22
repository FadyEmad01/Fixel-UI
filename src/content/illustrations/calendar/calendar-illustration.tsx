"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export function CalendarIllustration(): ReactNode {
  return (
    <IllustrationCard className="max-w-36 [--radius-2xl]">
      <IllustrationCardPanel className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <IllustrationIcon icon={ChevronLeftIcon} />
          <IllustrationText className="w-[60%]" variant="secondary" />
          <IllustrationIcon icon={ChevronRightIcon} />
        </div>
        <div className="flex items-center gap-2">
          <IllustrationText className="flex-1" variant="secondary" />
          <IllustrationText className="flex-1" variant="secondary" />
          <IllustrationText className="flex-1" variant="main" />
          <IllustrationText className="flex-1 bg-transparent" variant="main" />
          <IllustrationText className="flex-1" variant="main" />
        </div>
        <div className="flex items-center gap-2">
          <IllustrationText className="flex-1" variant="main" />
          <IllustrationText className="flex-1 bg-transparent" variant="main" />
          <IllustrationText className="flex-1" variant="main" />
          <IllustrationText className="flex-1" variant="main" />
          <IllustrationText className="flex-1" variant="main" />
        </div>
        <div className="flex items-center gap-2">
          <IllustrationText className="flex-1 bg-transparent" variant="main" />
          <IllustrationText className="flex-1" variant="main" />
          <IllustrationText className="flex-1 bg-primary" variant="main" />
          <IllustrationText className="flex-1" variant="main" />
          <IllustrationText className="flex-1 bg-transparent" variant="main" />
        </div>
        <div className="flex items-center gap-2">
          <IllustrationText className="flex-1" variant="main" />
          <IllustrationText className="flex-1" variant="main" />
          <IllustrationText className="flex-1 bg-transparent" variant="main" />
          <IllustrationText className="flex-1" variant="secondary" />
          <IllustrationText className="flex-1" variant="secondary" />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
