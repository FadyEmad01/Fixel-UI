"use client";

import { IllustrationText } from "./illustration-text";

export function IllustrationCommandItem() {
  return (
    <div className="flex items-center justify-between gap-2">
      <IllustrationText className="w-[65%]" variant="secondary" />
      <IllustrationText className="w-4" variant="secondary" />
    </div>
  );
}
