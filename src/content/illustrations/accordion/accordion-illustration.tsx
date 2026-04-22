"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { ChevronDownIcon } from "lucide-react";

export function AccordionIllustration(): ReactNode {
  return (
    <IllustrationCard className="max-w-50">
      <IllustrationCardPanel className="divide-y divide-border p-0">
        <div className="p-3">
          <div className="flex items-center gap-2">
            <IllustrationIcon icon={ChevronDownIcon} />
            <IllustrationText className="w-[60%]" />
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <IllustrationIcon className="rotate-180" icon={ChevronDownIcon} />
            <div className="flex flex-1 flex-col gap-2">
              <IllustrationText className="w-[50%]" variant="main" />
              <IllustrationText className="w-[90%]" variant="secondary" />
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <IllustrationIcon icon={ChevronDownIcon} />
            <IllustrationText className="w-[60%]" />
          </div>
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
