"use client";

import type { ReactNode } from "react";
import { IllustrationCheckboxItem } from "../_shared";

export function CheckboxGroupIllustration(): ReactNode {
  return (
    <div className="flex max-w-28 flex-1 flex-col gap-3">
      <IllustrationCheckboxItem checked />
      <IllustrationCheckboxItem className="ps-4" />
      <IllustrationCheckboxItem checked className="ps-4" />
      <IllustrationCheckboxItem />
    </div>
  );
}
