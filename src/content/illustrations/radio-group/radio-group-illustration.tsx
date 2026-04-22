"use client";

import type { ReactNode } from "react";
import { IllustrationRadioItem } from "../_shared";

export function RadioGroupIllustration(): ReactNode {
  return (
    <div className="flex max-w-28 flex-1 flex-col gap-3">
      <IllustrationRadioItem />
      <IllustrationRadioItem checked />
    </div>
  );
}
