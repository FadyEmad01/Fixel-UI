"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationIcon,
} from "../_shared";
import { UserRoundIcon } from "lucide-react";

export function AvatarIllustration(): ReactNode {
  return (
    <IllustrationCard className="size-12 [--radius-2xl]">
      <IllustrationCardPanel className="flex items-center justify-center p-0">
        <div className="flex size-full items-center justify-center rounded-full">
          <IllustrationIcon icon={UserRoundIcon} />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
