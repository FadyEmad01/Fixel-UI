"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function IllustrationIcon({
  icon: IconComponent,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <IconComponent
      className={cn("size-4 text-muted-foreground/88", className)}
    />
  );
}
