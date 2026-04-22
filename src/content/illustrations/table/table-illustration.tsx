"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationTableRow,
} from "../_shared";

export function TableIllustration(): ReactNode {
  return (
    <IllustrationCard>
      <IllustrationCardPanel className="p-0">
        <div className="divide-y divide-border">
          <IllustrationTableRow />
          <IllustrationTableRow />
          <IllustrationTableRow />
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
