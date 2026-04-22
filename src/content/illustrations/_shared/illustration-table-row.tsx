"use client";

import { IllustrationText } from "./illustration-text";

export function IllustrationTableRow({ showCheckbox = true }: { showCheckbox?: boolean }) {
  return (
    <div className="flex items-center gap-2 p-3">
      {showCheckbox && <IllustrationText className="size-2.5 rounded-xs" />}
      <IllustrationText className="flex-1" />
      <IllustrationText className="flex-1" variant="secondary" />
      <IllustrationText className="flex-1" variant="secondary" />
      <IllustrationText className="flex-1" variant="secondary" />
      <IllustrationText className="flex-1" variant="secondary" />
    </div>
  );
}
