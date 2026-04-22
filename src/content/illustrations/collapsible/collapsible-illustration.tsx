"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { ChevronDownIcon } from "lucide-react";

export function CollapsibleIllustration(): ReactNode {
  return (
    <IllustrationCard>
      <IllustrationCardPanel className="divide-y divide-border p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <IllustrationText className="w-[60%]" />
          <IllustrationIcon icon={ChevronDownIcon} />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <IllustrationText className="w-[80%]" variant="secondary" />
          <IllustrationText className="w-[70%]" variant="secondary" />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
