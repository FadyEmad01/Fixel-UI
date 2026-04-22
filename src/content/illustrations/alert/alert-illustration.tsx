"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { AlertCircleIcon } from "lucide-react";

export function AlertIllustration(): ReactNode {
  return (
    <IllustrationCard>
      <IllustrationCardPanel className="flex items-center gap-2 p-3">
        <IllustrationIcon icon={AlertCircleIcon} />
        <IllustrationText className="w-[70%]" variant="secondary" />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
