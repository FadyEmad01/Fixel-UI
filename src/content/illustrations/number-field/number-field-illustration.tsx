"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { MinusIcon, PlusIcon } from "lucide-react";

export function NumberFieldIllustration(): ReactNode {
  return (
    <IllustrationCard className="[--radius-2xl]">
      <IllustrationCardPanel className="flex items-center gap-2 px-4 py-2.5">
        <IllustrationIcon className="shrink-0" icon={MinusIcon} />
        <div className="flex flex-1 justify-center">
          <IllustrationText className="w-12" />
        </div>
        <IllustrationIcon className="shrink-0" icon={PlusIcon} />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
