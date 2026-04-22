"use client";

import type { ReactNode } from "react";
import { IllustrationText } from "../_shared";

export function SeparatorIllustration(): ReactNode {
  return (
    <div className="max-w-50 flex-1 divide-y">
      <div className="flex flex-col gap-2 py-3">
        <IllustrationText className="w-[60%]" />
        <IllustrationText variant="secondary" />
      </div>
      <div className="flex items-center gap-2 divide-x py-3">
        <div className="-mx-2 flex-1 px-2 py-1">
          <IllustrationText variant="secondary" />
        </div>
        <div className="flex-1 px-2 py-1">
          <IllustrationText variant="secondary" />
        </div>
        <div className="-mx-2 flex-1 px-2 py-1">
          <IllustrationText variant="secondary" />
        </div>
        <div className="flex-1 px-2 py-1">
          <IllustrationText variant="secondary" />
        </div>
      </div>
    </div>
  );
}
