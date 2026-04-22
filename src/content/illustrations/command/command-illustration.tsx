"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
  IllustrationText,
  IllustrationCommandItem,
} from "../_shared";
import { SearchIcon } from "lucide-react";

export function CommandIllustration(): ReactNode {
  return (
    <IllustrationCard className="max-w-50">
      <IllustrationCardPanel className="divide-y divide-border p-0">
        <div className="flex items-center gap-2 px-4 py-3">
          <IllustrationIcon icon={SearchIcon} />
          <IllustrationText className="w-[40%]" />
        </div>
        <div className="flex flex-col gap-4 p-4">
          <IllustrationCommandItem />
          <IllustrationCommandItem />
          <IllustrationCommandItem />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
