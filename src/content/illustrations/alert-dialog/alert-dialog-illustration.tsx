"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationButton,
  IllustrationText,
} from "../_shared";

export function AlertDialogIllustration(): ReactNode {
  return (
    <IllustrationCard className="max-w-50">
      <IllustrationCardPanel className="flex flex-col gap-5 p-4">
        <div className="flex flex-col gap-2">
          <IllustrationText className="w-[50%]" variant="main" />
          <IllustrationText className="w-[90%]" variant="secondary" />
        </div>
        <div className="flex items-center justify-end gap-2">
          <IllustrationButton variant="secondary" />
          <IllustrationButton variant="primary" />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
