"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { TextCursorIcon } from "lucide-react";

export function AutocompleteIllustration(): ReactNode {
  return (
    <div className="flex max-w-50 flex-1 flex-col gap-2">
      <IllustrationCard className="[--radius-2xl]" withGradient={false}>
        <IllustrationCardPanel className="flex items-center gap-2 px-4 py-2">
          <IllustrationText className="w-[40%]" />
          <IllustrationIcon icon={TextCursorIcon} />
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationCard className="[--radius-2xl]">
        <IllustrationCardPanel className="flex flex-col gap-4 p-4">
          <IllustrationText variant="secondary" />
          <IllustrationText variant="secondary" />
          <IllustrationText variant="secondary" />
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
