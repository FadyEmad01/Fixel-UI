"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
} from "../_shared";
import { ChevronRightIcon } from "lucide-react";

export function BreadcrumbIllustration(): ReactNode {
  return (
    <IllustrationCard>
      <IllustrationCardPanel className="flex items-center gap-1 p-3">
        <IllustrationText className="flex-1" />
        <IllustrationIcon icon={ChevronRightIcon} />
        <IllustrationText className="flex-1" variant="secondary" />
        <IllustrationIcon icon={ChevronRightIcon} />
        <IllustrationText className="flex-1" variant="secondary" />
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
