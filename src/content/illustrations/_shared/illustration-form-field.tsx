"use client";

import { IllustrationCard } from "./illustration-card";
import { IllustrationCardPanel } from "./illustration-card";
import { IllustrationText } from "./illustration-text";

export function IllustrationFormField({
  labelWidth = "w-16",
  showError = false,
}: {
  labelWidth?: string;
  showError?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <IllustrationText className={labelWidth} />
      <IllustrationCard className="[--radius-2xl]" withGradient={false}>
        <IllustrationCardPanel className="py-3.5" />
      </IllustrationCard>
      {showError && <IllustrationText className="w-[80%]" variant="secondary" />}
    </div>
  );
}
