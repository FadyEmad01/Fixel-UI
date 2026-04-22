"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { CalendarIcon } from "lucide-react";

export function DatePickerIllustration(): ReactNode {
  return (
    <IllustrationCard className="[--radius-2xl]" withGradient={false}>
      <IllustrationCardPanel className="flex items-center gap-2 p-3">
        <IllustrationIcon icon={CalendarIcon} />
        <IllustrationText className="w-[60%]" />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
