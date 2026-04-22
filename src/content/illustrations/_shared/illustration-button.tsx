"use client";

import { cn } from "@/lib/utils";

export function IllustrationButton({
  variant = "secondary",
  className,
}: {
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const height = variant === "primary" ? "h-4" : "h-1.5";
  const bgColor =
    variant === "primary"
      ? "bg-linear-to-b from-(--btn-from) to-(--btn-to)"
      : "bg-muted-foreground/20";
  return <div className={cn(height, "w-7 rounded-sm", bgColor, className)} />;
}
