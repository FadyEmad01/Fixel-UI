"use client";

import { cn } from "@/lib/utils";
import { IllustrationText } from "./illustration-text";

export function IllustrationRadioItem({
  checked = false,
  className,
}: {
  checked?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "size-4 shrink-0 rounded-full",
          checked
            ? "bg-linear-to-b from-(--btn-from) to-(--btn-to)"
            : "bg-muted-foreground/20",
        )}
      />
      <IllustrationText className="w-full" variant="secondary" />
    </div>
  );
}
