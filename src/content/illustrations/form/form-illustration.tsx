"use client";

import type { ReactNode } from "react";
import {
  IllustrationCard,
  IllustrationCardPanel,
  IllustrationFormField,
} from "../_shared";

export function FormIllustration(): ReactNode {
  return (
    <div className="flex max-w-50 flex-1 flex-col gap-4">
      <IllustrationFormField />
      <IllustrationCard
        className="border-none bg-linear-to-b from-(--btn-from) to-(--btn-to) [--radius-2xl]"
        withGradient={false}
      >
        <IllustrationCardPanel className="py-3.5" />
      </IllustrationCard>
    </div>
  );
}
