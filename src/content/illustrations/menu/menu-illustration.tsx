"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { EllipsisIcon, ChevronRightIcon } from "lucide-react";

export function MenuIllustration(): ReactNode {
  return (
    <div className="flex max-w-50 flex-1 flex-col items-end gap-2">
      <IllustrationCard className="w-fit [--radius-2xl]">
        <IllustrationCardPanel className="flex items-center gap-2 p-2">
          <IllustrationIcon icon={EllipsisIcon} />
        </IllustrationCardPanel>
      </IllustrationCard>
      <IllustrationCard className="[--radius-2xl]">
        <IllustrationCardPanel className="flex flex-col gap-4 p-4">
          <div className="me-6">
            <IllustrationText className="w-full" variant="secondary" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <IllustrationText variant="secondary" />
            </div>
            <IllustrationIcon className="-m-1" icon={ChevronRightIcon} />
          </div>
          <div className="me-6">
            <IllustrationText className="w-full" variant="secondary" />
          </div>
        </IllustrationCardPanel>
      </IllustrationCard>
    </div>
  );
}
