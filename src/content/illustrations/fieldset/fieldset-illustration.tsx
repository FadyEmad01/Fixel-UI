"use client";

import type { ReactNode } from "react";
import { IllustrationFormField } from "../_shared";

export function FieldsetIllustration(): ReactNode {
  return (
    <div className="flex max-w-50 flex-1 flex-col gap-4">
      <IllustrationFormField />
      <IllustrationFormField />
    </div>
  );
}
