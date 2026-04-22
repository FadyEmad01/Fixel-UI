"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationText,
} from "../_shared";

export function FooterIllustration(): ReactNode {
  return (
    <IllustrationCard className="w-full max-w-64 [--radius-2xl]">
      <IllustrationCardPanel className="flex flex-col gap-5 p-4">
        <div className="flex justify-between gap-4">
          {/* Brand / Info Column */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="mb-1 size-5 rounded-sm bg-muted-foreground/40" />
            <IllustrationText className="w-[90%]" variant="secondary" />
            <IllustrationText className="w-[70%]" variant="secondary" />
          </div>

          {/* Navigation Links Column */}
          <div className="flex flex-1 flex-col items-end gap-2">
            <IllustrationText className="w-[60%]" variant="main" />
            <IllustrationText className="w-[50%]" variant="secondary" />
            <IllustrationText className="w-[40%]" variant="secondary" />
            <IllustrationText className="w-[45%]" variant="secondary" />
          </div>
        </div>

        {/* Bottom Bar (Copyright & Socials) */}
        <div className="flex items-center justify-between border-t border-border/50 pt-3">
          <IllustrationText className="w-[30%]" variant="secondary" />
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-muted-foreground/20" />
            <div className="size-3 rounded-full bg-muted-foreground/20" />
            <div className="size-3 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
      </IllustrationCardPanel>
    </IllustrationCard>
  );
}
