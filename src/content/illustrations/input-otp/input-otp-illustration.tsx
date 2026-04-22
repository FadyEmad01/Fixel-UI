"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { TextCursorIcon } from "lucide-react";

export function InputOtpIllustration(): ReactNode {
  return (
    <div className="flex max-w-50 flex-1 items-center gap-2">
      <IllustrationCard className="size-10 [--radius-2xl]" withGradient={false}>
        <IllustrationCardPanel className="flex items-center justify-center p-0">
          <IllustrationText className="size-1.5" />
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationCard className="size-10 [--radius-2xl]" withGradient={false}>
        <IllustrationCardPanel className="flex items-center justify-center p-0">
          <IllustrationText className="size-1.5" />
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationCard className="size-10 [--radius-2xl]" withGradient={false}>
        <IllustrationCardPanel className="flex items-center justify-center p-0">
          <IllustrationText className="size-1.5" />
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationCard className="size-10 [--radius-2xl]" withGradient={false}>
        <IllustrationCardPanel className="flex items-center justify-center p-0">
          <IllustrationIcon icon={TextCursorIcon} />
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
