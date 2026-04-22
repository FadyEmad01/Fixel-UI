"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { AlertCircleIcon } from "lucide-react";

export function ToastIllustration(): ReactNode {
  return (
    <div className="relative flex flex-1 justify-center">
      <IllustrationCard className="absolute -top-6 scale-80">
        <IllustrationCardPanel className="flex items-center gap-2 p-3" />
      </IllustrationCard>
      <IllustrationCard className="absolute -top-3 scale-90">
        <IllustrationCardPanel className="flex items-center gap-2 p-3" />
      </IllustrationCard>
      <IllustrationCard>
        <IllustrationCardPanel className="flex items-start gap-2 p-3">
          <IllustrationIcon icon={AlertCircleIcon} />
          <div className="flex flex-1 flex-col gap-2">
            <IllustrationText className="w-[40%]" />
            <IllustrationText className="w-[70%]" variant="secondary" />
          </div>
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
