"use client";

import type { ReactNode } from "react";
import { IllustrationText } from "../_shared";

export function SliderIllustration(): ReactNode {
  return (
    <div className="flex w-full max-w-50 items-center gap-1">
      <IllustrationText
        className="w-[35%] bg-linear-to-b from-(--btn-from) to-(--btn-to)"
        variant="secondary"
      />
      <div className="size-4 rounded-full bg-linear-to-b from-(--btn-from) to-(--btn-to)" />
      <IllustrationText className="flex-1" variant="secondary" />
    </div>
  );
}
