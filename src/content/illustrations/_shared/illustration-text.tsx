"use client";

import { cn } from "@/lib/utils";

export function IllustrationText({
  className,
  variant = "main",
}: {
  className?: string;
  variant?: "main" | "secondary";
}) {
  const bgColor =
    variant === "main" ? "bg-muted-foreground/40" : "bg-muted-foreground/20";
  return <div className={cn("h-1.5 rounded-full", bgColor, className)} />;
}
