"use client";

import type { ReactNode } from "react";
import { IllustrationCheckboxItem } from "../_shared";

export function CheckboxIllustration(): ReactNode {
  return (
    <div className="flex max-w-28 flex-1 flex-col gap-3">
      <IllustrationCheckboxItem />
      <IllustrationCheckboxItem checked />
    </div>
  );
}
