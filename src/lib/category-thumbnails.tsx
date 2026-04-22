"use client";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircleIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  TextCursorIcon,
  UserRoundIcon,
  XIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

// ============================================================================
// Base Components
// ============================================================================

function Icon({
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

function Text({
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

function Button({
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

// Standalone Card component for thumbnails - independent from registry Card
function Card({
  children,
  className,
  withGradient = true,
}: {
  children: ReactNode;
  className?: string;
  withGradient?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-72 flex-col rounded-2xl border not-dark:bg-clip-padding text-card-foreground shadow-md/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_-1px_--theme(--color-white/6%),0_1px_--theme(--color-black/6%)]",
        withGradient
          ? "bg-linear-to-b from-[color-mix(in_srgb,var(--card)_96%,var(--color-white))] to-[color-mix(in_srgb,var(--card)_99%,var(--color-black))] dark:to-[color-mix(in_srgb,var(--card)_98%,var(--color-white))]"
          : "bg-card/99 dark:bg-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

// Standalone CardPanel component for thumbnails - independent from registry CardPanel
function CardPanel({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 p-6", className)} {...props}>
      {children}
    </div>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

function CheckboxItem({
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
          "size-4 shrink-0 rounded",
          checked
            ? "bg-linear-to-b from-(--btn-from) to-(--btn-to)"
            : "bg-muted-foreground/20",
        )}
      />
      <Text className="w-full" variant="secondary" />
    </div>
  );
}

function RadioItem({
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
      <Text className="w-full" variant="secondary" />
    </div>
  );
}

function FormField({
  labelWidth = "w-16",
  showError = false,
}: {
  labelWidth?: string;
  showError?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Text className={labelWidth} />
      <Card className="[--radius-2xl]" withGradient={false}>
        <CardPanel className="py-3.5" />
      </Card>
      {showError && <Text className="w-[80%]" variant="secondary" />}
    </div>
  );
}

function TableRow({ showCheckbox = true }: { showCheckbox?: boolean }) {
  return (
    <div className="flex items-center gap-2 p-3">
      {showCheckbox && <Text className="size-2.5 rounded-xs" />}
      <Text className="flex-1" />
      <Text className="flex-1" variant="secondary" />
      <Text className="flex-1" variant="secondary" />
      <Text className="flex-1" variant="secondary" />
      <Text className="flex-1" variant="secondary" />
    </div>
  );
}

function CommandItem() {
  return (
    <div className="flex items-center justify-between gap-2">
      <Text className="w-[65%]" variant="secondary" />
      <Text className="w-4" variant="secondary" />
    </div>
  );
}

// ============================================================================
// Thumbnail Implementations
// ============================================================================

// Accordion
export const accordionThumbnail = (
  <Card className="max-w-50">
    <CardPanel className="divide-y divide-border p-0">
      <div className="p-3">
        <div className="flex items-center gap-2">
          <Icon icon={ChevronDownIcon} />
          <Text className="w-[60%]" />
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2">
          <Icon className="rotate-180" icon={ChevronDownIcon} />
          <div className="flex flex-1 flex-col gap-2">
            <Text className="w-[50%]" variant="main" />
            <Text className="w-[90%]" variant="secondary" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2">
          <Icon icon={ChevronDownIcon} />
          <Text className="w-[60%]" />
        </div>
      </div>
    </CardPanel>
  </Card>
);

// Alert
export const alertThumbnail = (
  <Card>
    <CardPanel className="flex items-center gap-2 p-3">
      <Icon icon={AlertCircleIcon} />
      <Text className="w-[70%]" variant="secondary" />
    </CardPanel>
  </Card>
);

// Alert Dialog
export const alertDialogThumbnail = (
  <Card className="max-w-50">
    <CardPanel className="flex flex-col gap-5 p-4">
      <div className="flex flex-col gap-2">
        <Text className="w-[50%]" variant="main" />
        <Text className="w-[90%]" variant="secondary" />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="secondary" />
        <Button variant="primary" />
      </div>
    </CardPanel>
  </Card>
);

// Autocomplete
export const autocompleteThumbnail = (
  <div className="flex max-w-50 flex-1 flex-col gap-2">
    <Card className="[--radius-2xl]" withGradient={false}>
      <CardPanel className="flex items-center gap-2 px-4 py-2">
        <Text className="w-[40%]" />
        <Icon icon={TextCursorIcon} />
      </CardPanel>
    </Card>
    <Card className="[--radius-2xl]">
      <CardPanel className="flex flex-col gap-4 p-4">
        <Text variant="secondary" />
        <Text variant="secondary" />
        <Text variant="secondary" />
      </CardPanel>
    </Card>
  </div>
);

// Avatar
export const avatarThumbnail = (
  <Card className="size-12 [--radius-2xl]">
    <CardPanel className="flex items-center justify-center p-0">
      <div className="flex size-full items-center justify-center rounded-full">
        <Icon icon={UserRoundIcon} />
      </div>
    </CardPanel>
  </Card>
);

// Badge
export const badgeThumbnail = (
  <Card className="max-w-24 [--radius-2xl]">
    <CardPanel className="flex items-center gap-2 px-2.5 py-2">
      <div className="size-2 rounded-full bg-muted-foreground/88" />
      <Text className="flex-1" />
    </CardPanel>
  </Card>
);

// Breadcrumb
export const breadcrumbThumbnail = (
  <Card>
    <CardPanel className="flex items-center gap-1 p-3">
      <Text className="flex-1" />
      <Icon icon={ChevronRightIcon} />
      <Text className="flex-1" variant="secondary" />
      <Icon icon={ChevronRightIcon} />
      <Text className="flex-1" variant="secondary" />
    </CardPanel>
  </Card>
);

// Button
export const buttonThumbnail = (
  <Card
    className="max-w-24 border-none bg-linear-to-b from-(--btn-from) to-(--btn-to) [--radius-2xl]"
    withGradient={false}
  >
    <CardPanel className="px-6 py-4">
      <Text className="bg-primary-foreground/40" />
    </CardPanel>
  </Card>
);

// Calendar
export const calendarThumbnail = (
  <Card className="max-w-36 [--radius-2xl]">
    <CardPanel className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Icon icon={ChevronLeftIcon} />
        <Text className="w-[60%]" variant="secondary" />
        <Icon icon={ChevronRightIcon} />
      </div>
      <div className="flex items-center gap-2">
        <Text className="flex-1" variant="secondary" />
        <Text className="flex-1" variant="secondary" />
        <Text className="flex-1" variant="main" />
        <Text className="flex-1 bg-transparent" variant="main" />
        <Text className="flex-1" variant="main" />
      </div>
      <div className="flex items-center gap-2">
        <Text className="flex-1" variant="main" />
        <Text className="flex-1 bg-transparent" variant="main" />
        <Text className="flex-1" variant="main" />
        <Text className="flex-1" variant="main" />
        <Text className="flex-1" variant="main" />
      </div>
      <div className="flex items-center gap-2">
        <Text className="flex-1 bg-transparent" variant="main" />
        <Text className="flex-1" variant="main" />
        <Text className="flex-1 bg-primary" variant="main" />
        <Text className="flex-1" variant="main" />
        <Text className="flex-1 bg-transparent" variant="main" />
      </div>
      <div className="flex items-center gap-2">
        <Text className="flex-1" variant="main" />
        <Text className="flex-1" variant="main" />
        <Text className="flex-1 bg-transparent" variant="main" />
        <Text className="flex-1" variant="secondary" />
        <Text className="flex-1" variant="secondary" />
      </div>
    </CardPanel>
  </Card>
);

// Card
export const cardThumbnail = (
  <Card className="max-w-36 [--radius-2xl]">
    <CardPanel className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Text className="w-[60%]" variant="main" />
        <Text className="w-[90%]" variant="secondary" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 rounded-sm bg-muted-foreground/8" />
        <div className="h-4 rounded-sm bg-muted-foreground/8" />
        <Button className="w-full rounded-sm" variant="primary" />
      </div>
    </CardPanel>
  </Card>
);

// Checkbox
export const checkboxThumbnail = (
  <div className="flex max-w-28 flex-1 flex-col gap-3">
    <CheckboxItem />
    <CheckboxItem checked />
  </div>
);

// Checkbox Group
export const checkboxGroupThumbnail = (
  <div className="flex max-w-28 flex-1 flex-col gap-3">
    <CheckboxItem checked />
    <CheckboxItem className="ps-4" />
    <CheckboxItem checked className="ps-4" />
    <CheckboxItem />
  </div>
);

// Collapsible
export const collapsibleThumbnail = (
  <Card>
    <CardPanel className="divide-y divide-border p-0">
      <div className="flex items-center justify-between px-4 py-3">
        <Text className="w-[60%]" />
        <Icon icon={ChevronDownIcon} />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Text className="w-[80%]" variant="secondary" />
        <Text className="w-[70%]" variant="secondary" />
      </div>
    </CardPanel>
  </Card>
);

// Combobox
export const comboboxThumbnail = (
  <Card className="[--radius-2xl]" withGradient={false}>
    <CardPanel className="flex items-center gap-2 px-3 py-[calc(--spacing(2.5)-1px)]">
      <div className="flex h-5 items-center gap-1 rounded-sm bg-muted-foreground/8 py-0.5 ps-2 pe-1">
        <Text className="w-6" />
        <Icon icon={XIcon} />
      </div>
      <div className="flex h-5 items-center gap-1 rounded-sm bg-muted-foreground/8 py-0.5 ps-2 pe-1">
        <Text className="w-6" />
        <Icon icon={XIcon} />
      </div>
    </CardPanel>
  </Card>
);

// Command
export const commandThumbnail = (
  <Card className="max-w-50">
    <CardPanel className="divide-y divide-border p-0">
      <div className="flex items-center gap-2 px-4 py-3">
        <Icon icon={SearchIcon} />
        <Text className="w-[40%]" />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <CommandItem />
        <CommandItem />
        <CommandItem />
      </div>
    </CardPanel>
  </Card>
);

// Date Picker
export const datePickerThumbnail = (
  <Card className="[--radius-2xl]" withGradient={false}>
    <CardPanel className="flex items-center gap-2 p-3">
      <Icon icon={CalendarIcon} />
      <Text className="w-[60%]" />
    </CardPanel>
  </Card>
);

// Drawer
export const drawerThumbnail = (
  <div className="flex h-full w-full flex-1 flex-col justify-end gap-2">
    <div className="flex-1 rounded-xl border border-input border-dashed" />
    <Card className="max-w-none shrink-0 [--radius-2xl]">
      <CardPanel className="pt-1 pb-12">
        <div className="flex justify-center py-2">
          <div className="h-1 w-12 rounded-full bg-muted-foreground/30" />
        </div>
      </CardPanel>
    </Card>
  </div>
);

// Dialog
export const dialogThumbnail = (
  <Card className="max-w-36 [--radius-2xl]">
    <CardPanel className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Text className="w-[60%]" variant="main" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 rounded-sm bg-muted-foreground/8" />
        <div className="h-4 rounded-sm bg-muted-foreground/8" />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="secondary" />
        <Button variant="primary" />
      </div>
    </CardPanel>
  </Card>
);

// Empty
export const emptyThumbnail = (
  <Card className="border-input border-dashed bg-none shadow-none before:hidden">
    <CardPanel className="flex flex-col items-center gap-2">
      <div className="size-8 rounded-full bg-muted-foreground/20" />
      <Text className="w-[60%]" />
      <Text className="w-[80%]" variant="secondary" />
    </CardPanel>
  </Card>
);

// Field
export const fieldThumbnail = (
  <div className="flex max-w-50 flex-1 flex-col gap-3">
    <FormField showError />
  </div>
);

// Fieldset
export const fieldsetThumbnail = (
  <div className="flex max-w-50 flex-1 flex-col gap-4">
    <FormField />
    <FormField />
  </div>
);

// Form
export const formThumbnail = (
  <div className="flex max-w-50 flex-1 flex-col gap-4">
    <FormField />
    <Card
      className="border-none bg-linear-to-b from-(--btn-from) to-(--btn-to) [--radius-2xl]"
      withGradient={false}
    >
      <CardPanel className="py-3.5" />
    </Card>
  </div>
);

// Frame
export const frameThumbnail = (
  <div className="flex-1 rounded-[calc(var(--radius-2xl)+2px)] bg-muted/72 p-1">
    <div className="flex flex-col gap-2 p-4">
      <Text className="w-[70%]" />
    </div>
    <Card className="max-w-none">
      <CardPanel className="p-5">
        <div className="flex flex-col gap-2">
          <Text className="w-[70%]" />
          <Text className="w-[90%]" variant="secondary" />
        </div>
      </CardPanel>
    </Card>
  </div>
);

// Group
export const groupThumbnail = (
  <Card className="max-w-48 flex-row divide-x [--radius-2xl]">
    <CardPanel className="px-6 py-4">
      <Text />
    </CardPanel>
    <CardPanel className="px-6 py-4">
      <Text />
    </CardPanel>
  </Card>
);

// Input
export const inputThumbnail = (
  <Card className="[--radius-2xl]" withGradient={false}>
    <CardPanel className="px-6 py-4">
      <Text className="w-[60%]" />
    </CardPanel>
  </Card>
);

// Input Group
export const inputGroupThumbnail = (
  <Card className="[--radius-2xl]" withGradient={false}>
    <CardPanel className="flex gap-2 p-0">
      <div className="flex flex-1 items-center gap-2 py-2.5 ps-4">
        <Icon icon={SearchIcon} />
        <Text className="w-[60%]" />
      </div>
      <div className="flex items-center py-2.5 pe-4">
        <div className="size-4 shrink-0 rounded bg-muted-foreground/20" />
      </div>
    </CardPanel>
  </Card>
);

// Input OTP
export const inputOtpThumbnail = (
  <div className="flex max-w-50 flex-1 items-center gap-2">
    <Card className="size-10 [--radius-2xl]" withGradient={false}>
      <CardPanel className="flex items-center justify-center p-0">
        <Text className="size-1.5" />
      </CardPanel>
    </Card>
    <Card className="size-10 [--radius-2xl]" withGradient={false}>
      <CardPanel className="flex items-center justify-center p-0">
        <Text className="size-1.5" />
      </CardPanel>
    </Card>
    <Card className="size-10 [--radius-2xl]" withGradient={false}>
      <CardPanel className="flex items-center justify-center p-0">
        <Text className="size-1.5" />
      </CardPanel>
    </Card>
    <Card className="size-10 [--radius-2xl]" withGradient={false}>
      <CardPanel className="flex items-center justify-center p-0">
        <Icon icon={TextCursorIcon} />
      </CardPanel>
    </Card>
  </div>
);

// Kbd
export const kbdThumbnail = (
  <div className="flex items-center justify-center gap-2">
    <Card className="size-10 [--radius-2xl]">
      <CardPanel className="flex items-center justify-center p-0 text-muted-foreground/88 leading-none">
        ⌘
      </CardPanel>
    </Card>
    <Card className="size-10 [--radius-2xl]">
      <CardPanel className="flex items-center justify-center p-0 text-muted-foreground/88 leading-none">
        K
      </CardPanel>
    </Card>
  </div>
);

// Label
export const labelThumbnail = (
  <div className="flex max-w-50 flex-1 flex-col gap-3">
    <Text className="w-16 bg-primary" />
    <Card className="[--radius-2xl]" withGradient={false}>
      <CardPanel className="py-3.5" />
    </Card>
  </div>
);

// Menu
export const menuThumbnail = (
  <div className="flex max-w-50 flex-1 flex-col items-end gap-2">
    <Card className="w-fit [--radius-2xl]">
      <CardPanel className="flex items-center gap-2 p-2">
        <Icon icon={EllipsisIcon} />
      </CardPanel>
    </Card>
    <Card className="[--radius-2xl]">
      <CardPanel className="flex flex-col gap-4 p-4">
        <div className="me-6">
          <Text className="w-full" variant="secondary" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Text variant="secondary" />
          </div>
          <Icon className="-m-1" icon={ChevronRightIcon} />
        </div>
        <div className="me-6">
          <Text className="w-full" variant="secondary" />
        </div>
      </CardPanel>
    </Card>
  </div>
);

// Meter
export const meterThumbnail = (
  <div className="flex max-w-50 flex-1 flex-col gap-2">
    <div className="flex items-center justify-between">
      <Text className="w-[50%]" />
      <Text className="w-8" />
    </div>
    <div className="h-2 w-full rounded-full bg-muted-foreground/20">
      <div className="h-2 w-[65%] rounded-s-full bg-linear-to-b from-(--btn-from) to-(--btn-to)" />
    </div>
  </div>
);

// Number Field
export const numberFieldThumbnail = (
  <Card className="[--radius-2xl]">
    <CardPanel className="flex items-center gap-2 px-4 py-2.5">
      <Icon className="shrink-0" icon={MinusIcon} />
      <div className="flex flex-1 justify-center">
        <Text className="w-12" />
      </div>
      <Icon className="shrink-0" icon={PlusIcon} />
    </CardPanel>
  </Card>
);

// Pagination
export const paginationThumbnail = (
  <div className="flex flex-1 items-center gap-4">
    <Card className="w-fit [--radius-2xl]">
      <CardPanel className="flex items-center gap-2 p-2">
        <Icon icon={ChevronLeftIcon} />
      </CardPanel>
    </Card>
    <div className="flex flex-1 gap-2">
      <Text className="flex-1" variant="secondary" />
      <Text className="flex-1" variant="secondary" />
      <Text className="flex-1" variant="secondary" />
    </div>
    <Card className="w-fit [--radius-2xl]">
      <CardPanel className="flex items-center gap-2 p-2">
        <Icon icon={ChevronRightIcon} />
      </CardPanel>
    </Card>
  </div>
);

// Popover
export const popoverThumbnail = (
  <div className="flex max-w-50 flex-1 flex-col items-center gap-2">
    <Card className="w-fit [--radius-2xl]">
      <CardPanel className="flex items-center gap-2 px-4 py-3">
        <Text className="w-12" variant="main" />
      </CardPanel>
    </Card>
    <Card className="[--radius-2xl]">
      <CardPanel className="flex flex-col gap-3 p-4">
        <Text className="w-[70%]" variant="main" />
        <div className="flex flex-col gap-1.5">
          <Text className="w-[80%]" variant="secondary" />
          <Text className="w-[60%]" variant="secondary" />
        </div>
      </CardPanel>
    </Card>
  </div>
);

// Preview Card
export const previewCardThumbnail = (
  <Card className="max-w-50">
    <CardPanel className="flex items-center gap-3 p-4">
      <div className="size-9 shrink-0 rounded-full bg-muted-foreground/20" />
      <div className="flex flex-1 flex-col gap-2">
        <Text className="w-[70%]" variant="main" />
        <Text variant="secondary" />
        <Text className="w-[90%]" variant="secondary" />
      </div>
    </CardPanel>
  </Card>
);

// Progress
export const progressThumbnail = (
  <div className="flex max-w-50 flex-1 flex-col gap-2">
    <div className="h-2 w-full rounded-full bg-muted-foreground/20">
      <div className="h-2 w-[45%] rounded-s-full bg-linear-to-b from-(--btn-from) to-(--btn-to)" />
    </div>
  </div>
);

// Radio Group
export const radioGroupThumbnail = (
  <div className="flex max-w-28 flex-1 flex-col gap-3">
    <RadioItem />
    <RadioItem checked />
  </div>
);

// Scroll Area
export const scrollAreaThumbnail = (
  <Card className="max-w-36 [--radius-2xl]">
    <CardPanel className="relative p-0">
      <div className="flex flex-col gap-2 p-3">
        <Text className="w-[80%]" variant="secondary" />
        <Text className="w-[90%]" variant="secondary" />
        <Text className="w-[70%]" variant="secondary" />
        <Text className="w-[85%]" variant="secondary" />
        <Text className="w-[90%]" variant="secondary" />
        <Text className="w-[80%]" variant="secondary" />
      </div>
      <div className="absolute top-2 right-1 h-8 w-1 rounded-full bg-muted-foreground/40" />
    </CardPanel>
  </Card>
);

// Select
export const selectThumbnail = (
  <Card className="[--radius-2xl]" withGradient={false}>
    <CardPanel className="flex gap-2 p-0">
      <div className="flex flex-1 items-center justify-between gap-2 py-2.5 ps-4 pe-2.5">
        <Text className="w-[60%]" />
        <Icon icon={ChevronDownIcon} />
      </div>
    </CardPanel>
  </Card>
);

// Separator
export const separatorThumbnail = (
  <div className="max-w-50 flex-1 divide-y">
    <div className="flex flex-col gap-2 py-3">
      <Text className="w-[60%]" />
      <Text variant="secondary" />
    </div>
    <div className="flex items-center gap-2 divide-x py-3">
      <div className="-mx-2 flex-1 px-2 py-1">
        <Text variant="secondary" />
      </div>
      <div className="flex-1 px-2 py-1">
        <Text variant="secondary" />
      </div>
      <div className="-mx-2 flex-1 px-2 py-1">
        <Text variant="secondary" />
      </div>
      <div className="flex-1 px-2 py-1">
        <Text variant="secondary" />
      </div>
    </div>
  </div>
);

// Sheet
export const sheetThumbnail = (
  <div className="flex h-full flex-1 gap-2">
    <div className="flex-1 rounded-xl border border-input border-dashed" />
    <Card className="h-full max-w-1/3 [--radius-2xl]">
      <CardPanel className="flex flex-col gap-4 p-3">
        <div className="flex flex-1 flex-col gap-2">
          <Text className="w-[60%]" variant="main" />
          <Text variant="secondary" />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant="primary" />
        </div>
      </CardPanel>
    </Card>
  </div>
);

// Skeleton
export const skeletonThumbnail = (
  <div className="mask-[linear-gradient(100deg,black_0%,rgba(0,0,0,0.2)_20%,rgba(0,0,0,0.2)_80%,rgba(0,0,0,0.6)_100%)] flex max-w-50 flex-1 items-center gap-3">
    <div className="size-8 rounded-full bg-muted-foreground/20" />
    <div className="flex flex-1 flex-col gap-2">
      <Text className="w-full" variant="secondary" />
      <Text className="w-full" variant="secondary" />
    </div>
  </div>
);

// Slider
export const sliderThumbnail = (
  <div className="flex w-full max-w-50 items-center gap-1">
    <Text
      className="w-[35%] bg-linear-to-b from-(--btn-from) to-(--btn-to)"
      variant="secondary"
    />
    <div className="size-4 rounded-full bg-linear-to-b from-(--btn-from) to-(--btn-to)" />
    <Text className="flex-1" variant="secondary" />
  </div>
);

// Spinner
export const spinnerThumbnail = (
  <div className="size-8 rotate-45 rounded-full border-3 border-muted-foreground/20 border-t-primary" />
);

// Switch
export const switchThumbnail = (
  <div className="h-6 w-10 rounded-full bg-muted-foreground/20 p-0.5">
    <div className="size-5 rounded-full bg-linear-to-b from-card to-card/90 shadow-xs/5 dark:from-background/90 dark:to-background" />
  </div>
);

// Table
export const tableThumbnail = (
  <Card>
    <CardPanel className="p-0">
      <div className="divide-y divide-border">
        <TableRow />
        <TableRow />
        <TableRow />
      </div>
    </CardPanel>
  </Card>
);

// Tabs
export const tabsThumbnail = (
  <div className="flex max-w-50 flex-col gap-4">
    <div className="flex rounded-lg bg-muted-foreground/12 p-0.5">
      <div className="rounded-[calc(var(--radius-lg)-1px)] bg-linear-to-b from-card to-card/90 p-3 shadow-xs/5 dark:from-background/90 dark:to-background">
        <Text className="w-6 bg-primary" />
      </div>
      <div className="rounded-[calc(var(--radius-lg)-1px)] p-3">
        <Text className="w-6" variant="secondary" />
      </div>
      <div className="rounded-[calc(var(--radius-lg)-1px)] p-3">
        <Text className="w-6" variant="secondary" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <Text className="w-[70%]" />
      <Text variant="secondary" />
    </div>
  </div>
);

// Textarea
export const textareaThumbnail = (
  <Card className="[--radius-2xl]" withGradient={false}>
    <CardPanel className="flex flex-col gap-2 px-6 py-4">
      <Text className="w-[60%]" />
      <Text className="opacity-0" />
      <Text className="opacity-0" />
    </CardPanel>
  </Card>
);

// Toast
export const toastThumbnail = (
  <div className="relative flex flex-1 justify-center">
    <Card className="absolute -top-6 scale-80">
      <CardPanel className="flex items-center gap-2 p-3" />
    </Card>
    <Card className="absolute -top-3 scale-90">
      <CardPanel className="flex items-center gap-2 p-3" />
    </Card>
    <Card>
      <CardPanel className="flex items-start gap-2 p-3">
        <Icon icon={AlertCircleIcon} />
        <div className="flex flex-1 flex-col gap-2">
          <Text className="w-[40%]" />
          <Text className="w-[70%]" variant="secondary" />
        </div>
      </CardPanel>
    </Card>
  </div>
);

// Toggle
export const toggleThumbnail = (
  <div className="flex flex-1 flex-col items-center justify-center gap-2">
    <Card className="max-w-12 [--radius-2xl]">
      <CardPanel className="rounded-[inherit] p-4">
        <Text />
      </CardPanel>
    </Card>
    <Card className="max-w-12 shadow-none [--radius-2xl] before:hidden">
      <CardPanel className="rounded-[inherit] bg-muted-foreground/8 p-4">
        <Text className="bg-primary" />
      </CardPanel>
    </Card>
  </div>
);

// Toggle Group
export const toggleGroupThumbnail = (
  <Card className="w-auto flex-row divide-x [--radius-2xl]">
    <CardPanel className="bg-clip-padding p-4">
      <Text className="w-4" />
    </CardPanel>
    <CardPanel className="bg-muted-foreground/8 bg-clip-padding p-4">
      <Text className="w-4 bg-foreground" />
    </CardPanel>
    <CardPanel className="bg-clip-padding p-4">
      <Text className="w-4" />
    </CardPanel>
  </Card>
);

// Toolbar
export const toolbarThumbnail = (
  <div className="flex items-center gap-1 rounded-xl border p-1">
    <Card className="w-fit [--radius-2xl]">
      <CardPanel className="p-3.5">
        <Text className="w-4" />
      </CardPanel>
    </Card>
    <Card className="w-fit [--radius-2xl]">
      <CardPanel className="p-3.5">
        <Text className="w-4" />
      </CardPanel>
    </Card>
    <Card className="w-fit [--radius-2xl]">
      <CardPanel className="p-3.5">
        <Text className="w-4" />
      </CardPanel>
    </Card>
  </div>
);

// Tooltip
export const tooltipThumbnail = (
  <div className="flex max-w-32 flex-1 flex-col items-center gap-2">
    <Card className="[--radius-2xl]">
      <CardPanel className="p-4">
        <Text />
      </CardPanel>
    </Card>
    <Icon icon={InfoIcon} />
  </div>
);

// On Hover
export const onHoverThumbnail = (
  <div className="relative flex max-w-50 flex-1 items-center justify-center p-6">
    {/* Target Element (The Card that gets "hovered") */}
    <motion.div
      animate={{
        y: [0, 0, -6, -6, 0, 0],
        scale: [1, 1, 1.03, 1.03, 1, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        // These times dictate WHEN the animation happens (matches cursor arrival)
        times: [0, 0.35, 0.45, 0.55, 0.65, 1],
      }}
      className="relative z-0 w-full"
    >
      <Card className="w-full [--radius-2xl]" withGradient={false}>
        <CardPanel className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <Text className="w-[80%]" variant="main" />
            <Text className="w-[60%]" variant="secondary" />
          </div>
          <Button className="w-full" variant="primary" />
        </CardPanel>
      </Card>
    </motion.div>

    {/* Cursor Element */}
    <motion.div
      className="pointer-events-none absolute z-10"
      animate={{
        x: [70, 70, 15, 15, 70, 70], // Moves from bottom-right to the card's button
        y: [70, 70, 20, 20, 70, 70],
        opacity: [0, 1, 1, 1, 1, 0], // Fades in, does the action, fades out
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        // Coordinates exactly with the Card's reaction
        times: [0, 0.1, 0.4, 0.6, 0.9, 1],
      }}
    >
      {/* OS Pointer Cursor (Works natively on Light & Dark modes) */}
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_426_3)">
          <path
            d="M4.07866 12.2682C3.79866 11.9082 3.44866 11.1782 2.83866 10.2682C2.48866 9.76822 1.62866 8.81822 1.36866 8.32822C1.18123 8.03045 1.12685 7.66788 1.21866 7.32822C1.37562 6.68243 1.98822 6.25404 2.64866 6.32822C3.15946 6.43083 3.62888 6.68119 3.99866 7.04822C4.25684 7.2914 4.49433 7.55564 4.70866 7.83822C4.86866 8.03822 4.90866 8.11822 5.08866 8.34822C5.26866 8.57822 5.38866 8.80822 5.29866 8.46822C5.22866 7.96822 5.10866 7.12822 4.93866 6.37822C4.80866 5.80822 4.77866 5.71822 4.65866 5.28822C4.53866 4.85822 4.46866 4.49822 4.33866 4.00822C4.21983 3.5268 4.12637 3.03946 4.05866 2.54822C3.93261 1.91993 4.02431 1.26744 4.31866 0.698224C4.66805 0.369594 5.18059 0.282857 5.61866 0.478224C6.05926 0.80356 6.38776 1.25788 6.55866 1.77822C6.82073 2.41861 6.99562 3.09129 7.07866 3.77822C7.23866 4.77822 7.54866 6.23822 7.55866 6.53822C7.55866 6.16822 7.48866 5.38822 7.55866 5.03822C7.62801 4.67335 7.88162 4.37054 8.22866 4.23822C8.52647 4.14685 8.84151 4.1263 9.14866 4.17822C9.4587 4.24304 9.73332 4.42137 9.91866 4.67822C10.1503 5.26162 10.2789 5.88082 10.2987 6.50822C10.3254 5.95881 10.4195 5.41475 10.5787 4.88822C10.7458 4.65277 10.9898 4.48301 11.2687 4.40822C11.5993 4.34778 11.9381 4.34778 12.2687 4.40822C12.5398 4.49886 12.7769 4.66974 12.9487 4.89822C13.1604 5.42857 13.2886 5.98857 13.3287 6.55822C13.3287 6.69822 13.3987 6.16822 13.6187 5.81822C13.733 5.47882 14.0197 5.22619 14.3708 5.1555C14.7219 5.08481 15.084 5.20679 15.3208 5.4755C15.5576 5.74421 15.633 6.11882 15.5187 6.45822C15.5187 7.10822 15.5187 7.07822 15.5187 7.51822C15.5187 7.95822 15.5187 8.34822 15.5187 8.71822C15.4822 9.3034 15.402 9.88503 15.2787 10.4582C15.1046 10.9653 14.8624 11.4464 14.5587 11.8882C14.0731 12.4282 13.6719 13.0384 13.3687 13.6982C13.2934 14.026 13.2598 14.362 13.2687 14.6982C13.2677 15.0089 13.308 15.3182 13.3887 15.6182C12.9798 15.6614 12.5675 15.6614 12.1587 15.6182C11.7687 15.5582 11.2887 14.7782 11.1587 14.5382C11.0943 14.4094 10.9627 14.3279 10.8187 14.3279C10.6746 14.3279 10.543 14.4094 10.4787 14.5382C10.2587 14.9182 9.76866 15.6082 9.42866 15.6482C8.75866 15.7282 7.37866 15.6482 6.28866 15.6482C6.28866 15.6482 6.46866 14.6482 6.05866 14.2882C5.64866 13.9282 5.22866 13.5082 4.91866 13.2282L4.07866 12.2682Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="..." /* IMPORTANT: Keep your original massive d-path here */
            stroke="black"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5587 12.8141V9.36233C12.5587 9.15571 12.3908 8.98822 12.1837 8.98822C11.9766 8.98822 11.8087 9.15571 11.8087 9.36233V12.8141C11.8087 13.0207 11.9766 13.1882 12.1837 13.1882C12.3908 13.1882 12.5587 13.0207 12.5587 12.8141Z"
            fill="black"
          />
          <path
            d="M10.5787 12.8128L10.5587 9.35929C10.5575 9.15317 10.3886 8.98704 10.1815 8.98823C9.97439 8.98941 9.80747 9.15747 9.80866 9.36359L9.82866 12.8171C9.82986 13.0233 9.99872 13.1894 10.2058 13.1882C10.4129 13.187 10.5798 13.019 10.5787 12.8128Z"
            fill="black"
          />
          <path
            d="M7.80867 9.36721L7.82867 12.8136C7.82987 13.0217 7.99874 13.1894 8.20585 13.1882C8.41295 13.187 8.57986 13.0173 8.57865 12.8092L8.55865 9.36282C8.55744 9.15472 8.38858 8.98701 8.18147 8.98823C7.97437 8.98944 7.80746 9.15912 7.80867 9.36721Z"
            fill="black"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_426_3"
            x="-7.7486e-07"
            y="0"
            width="16.7461"
            height="17.8588"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="0.4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_426_3"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_426_3"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </motion.div>
  </div>
);

// Footer
export const footerThumbnail = (
  <Card className="w-full max-w-64 [--radius-2xl]">
    <CardPanel className="flex flex-col gap-5 p-4">
      <div className="flex justify-between gap-4">
        {/* Brand / Info Column */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="mb-1 size-5 rounded-sm bg-muted-foreground/40" />
          <Text className="w-[90%]" variant="secondary" />
          <Text className="w-[70%]" variant="secondary" />
        </div>

        {/* Navigation Links Column */}
        <div className="flex flex-1 flex-col items-end gap-2">
          <Text className="w-[60%]" variant="main" />
          <Text className="w-[50%]" variant="secondary" />
          <Text className="w-[40%]" variant="secondary" />
          <Text className="w-[45%]" variant="secondary" />
        </div>
      </div>

      {/* Bottom Bar (Copyright & Socials) */}
      <div className="flex items-center justify-between border-t border-border/50 pt-3">
        <Text className="w-[30%]" variant="secondary" />
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-muted-foreground/20" />
          <div className="size-3 rounded-full bg-muted-foreground/20" />
          <div className="size-3 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    </CardPanel>
  </Card>
);

// Profile Card Morph
export const profileMorphThumbnail = (
  <div className="relative flex max-w-50 flex-1 items-center justify-center p-4">
    {/* Morphing container: circle → profile card */}
    <motion.div
      animate={{
        width: [64, 64, 224, 224, 64, 64],
        height: [64, 64, 190, 190, 64, 64],
        borderRadius: [50, 50, 18, 18, 50, 50],
      }}
      transition={{
        times: [0, 0.12, 0.38, 0.62, 0.88, 1],
        ease: "easeInOut",
        duration: 4.2,
        repeat: Infinity,
        repeatDelay: 0.4,
      }}
      className="relative overflow-hidden border border-border bg-card shadow-sm"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Cover photo */}
      <motion.div
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={{
          times: [0, 0.12, 0.38, 0.62, 0.88, 1],
          duration: 4.2, repeat: Infinity, repeatDelay: 0.4,
        }}
        className="absolute inset-x-0 top-0 h-[72px] bg-linear-to-br from-blue-200 via-indigo-200 to-violet-200 dark:from-blue-900/60 dark:via-indigo-900/60 dark:to-violet-900/60"
      >
        {/* Decorative dots on cover */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="size-1.5 rounded-full bg-white/50" />
          ))}
        </div>
      </motion.div>

      {/* Avatar circle */}
      <motion.div
        animate={{
          y: [0, 0, 52, 52, 0, 0],
          scale: [1, 1, 0.72, 0.72, 1, 1],
        }}
        transition={{
          times: [0, 0.12, 0.38, 0.62, 0.88, 1],
          ease: "easeInOut",
          duration: 4.2, repeat: Infinity, repeatDelay: 0.4,
        }}
        className="absolute top-3 z-10 flex size-10 items-center justify-center rounded-full border-[2.5px] border-card bg-linear-to-br from-violet-300 to-purple-400 dark:from-violet-700 dark:to-purple-800"
      >
        <div className="size-4 rounded-full bg-white/60" />
      </motion.div>

      {/* Card body: name + stats */}
      <motion.div
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={{
          times: [0, 0.12, 0.38, 0.62, 0.88, 1],
          duration: 4.2, repeat: Infinity, repeatDelay: 0.4,
        }}
        className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-3 pb-2.5"
      >
        {/* Name line */}
        <div className="mt-1 flex flex-col gap-1">
          <Text className="w-20" variant="main" />
          <Text className="w-14" variant="secondary" />
        </div>
        {/* Stat pills */}
        <div className="flex gap-1.5">
          <div className="h-3.5 w-12 rounded-full bg-violet-100 dark:bg-violet-900/40" />
          <div className="h-3.5 w-9 rounded-full bg-violet-100 dark:bg-violet-900/40" />
          <div className="h-3.5 w-14 rounded-full bg-violet-100 dark:bg-violet-900/40" />
        </div>
      </motion.div>
    </motion.div>
  </div>
);

// Card to Spinner Morph
export const cardSpinnerThumbnail = (
  <div className="relative flex max-w-50 flex-1 items-center justify-center p-4">
    <div className="relative flex h-[100px] w-[160px] items-center justify-center">
      {/* Morphing shell: card rectangle → circle */}
      <motion.div
        animate={{
          width: [160, 160, 56, 56, 160, 160],
          height: [100, 100, 56, 56, 100, 100],
          borderRadius: [14, 14, 50, 50, 14, 14],
        }}
        transition={{
          times: [0, 0.15, 0.40, 0.60, 0.85, 1],
          ease: "easeInOut",
          duration: 4.2,
          repeat: Infinity,
          repeatDelay: 0.4,
        }}
        className="absolute overflow-hidden border border-border bg-card shadow-sm"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* Card content */}
        <motion.div
          animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
          transition={{
            times: [0, 0.15, 0.40, 0.60, 0.85, 1],
            duration: 4.2, repeat: Infinity, repeatDelay: 0.4,
          }}
          className="absolute flex w-full flex-col gap-2 px-3.5 py-2.5"
        >
          <Text className="w-20" variant="main" />
          <Text className="w-[90%]" variant="secondary" />
          <Text className="w-[65%]" variant="secondary" />
          <div className="flex gap-1.5 pt-0.5">
            <div className="h-4 flex-1 rounded-md bg-muted-foreground/8" />
            <Button variant="primary" className="w-10" />
          </div>
        </motion.div>

        {/* Spinner arc */}
        <motion.div
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{
            times: [0, 0.15, 0.40, 0.60, 0.85, 1],
            duration: 4.2, repeat: Infinity, repeatDelay: 0.4,
          }}
          className="absolute flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            className="size-9 rounded-full"
            style={{
              border: "3.5px solid",
              borderColor:
                "hsl(var(--muted-foreground)/18%) hsl(var(--muted-foreground)/18%) hsl(var(--muted-foreground)/18%) hsl(var(--primary))",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  </div>
);

// Animation
export const animationThumbnail = (
  <div className="flex max-w-50 flex-1 flex-col gap-2">
    <Card className="[--radius-2xl]">
      <CardPanel className="flex flex-col gap-3 p-3">

        {/* Preview canvas */}
        <div className="relative flex h-16 items-center justify-center overflow-hidden rounded-lg bg-muted-foreground/5">
          <div className="absolute left-3 size-5 rounded-md bg-muted-foreground/10" />
          <div className="absolute right-3 size-5 rounded-md bg-muted-foreground/10" />
          <motion.div
            animate={{ x: [-32, 32, -32], scale: [1, 0.72, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute size-5 rounded-md bg-primary"
          />
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-2 px-0.5">

          {/* Track 1 — active */}
          <div className="flex items-center gap-2">
            <div className="size-1.5 shrink-0 rounded-full bg-primary" />
            <div className="relative flex-1">
              <div className="h-[3px] w-full rounded-full bg-muted-foreground/15" />
              {/* Keyframe diamonds */}
              {["left-0", "left-1/2", "right-0"].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute top-1/2 ${pos} size-1.5 -translate-y-1/2 rotate-45 ${i === 1 ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                />
              ))}
              {/* Playhead */}
              <motion.div
                animate={{ left: ["0%", "50%", "100%", "50%", "0%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 z-10 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-primary shadow-[0_0_0_1px] shadow-primary"
              />
            </div>
          </div>

          {/* Track 2 */}
          <div className="flex items-center gap-2">
            <div className="size-1.5 shrink-0 rounded-full bg-muted-foreground/25" />
            <div className="relative flex-1">
              <div className="h-[3px] w-full rounded-full bg-muted-foreground/15" />
              {["left-0", "right-0"].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute top-1/2 ${pos} size-1.5 -translate-y-1/2 rotate-45 bg-muted-foreground/25`}
                />
              ))}
            </div>
          </div>

          {/* Track 3 */}
          <div className="flex items-center gap-2">
            <div className="size-1.5 shrink-0 rounded-full bg-muted-foreground/25" />
            <div className="relative flex-1">
              <div className="h-[3px] w-full rounded-full bg-muted-foreground/15" />
              {["left-[20%]", "left-[70%]"].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute top-1/2 ${pos} size-1.5 -translate-y-1/2 rotate-45 bg-muted-foreground/25`}
                />
              ))}
            </div>
          </div>

          {/* Footer labels */}
          <div className="flex gap-1.5 pt-0.5">
            <Text className="w-6" variant="secondary" />
            <Text className="w-4" variant="secondary" />
            <Text className="w-8" variant="secondary" />
          </div>
        </div>

      </CardPanel>
    </Card>
  </div>
);

// ============================================================================
// Category Thumbnails Map
// ============================================================================

/**
 * Map of category slugs to their thumbnail components.
 * Add new thumbnails here as they are created.
 */
export const categoryThumbnails: Record<string, ReactNode> = {
  accordion: accordionThumbnail,
  alert: alertThumbnail,
  "alert-dialog": alertDialogThumbnail,
  autocomplete: autocompleteThumbnail,
  avatar: avatarThumbnail,
  badge: badgeThumbnail,
  breadcrumb: breadcrumbThumbnail,
  button: buttonThumbnail,
  calendar: calendarThumbnail,
  card: cardThumbnail,
  checkbox: checkboxThumbnail,
  "checkbox-group": checkboxGroupThumbnail,
  collapsible: collapsibleThumbnail,
  combobox: comboboxThumbnail,
  command: commandThumbnail,
  "date-picker": datePickerThumbnail,
  dialog: dialogThumbnail,
  drawer: drawerThumbnail,
  empty: emptyThumbnail,
  field: fieldThumbnail,
  fieldset: fieldsetThumbnail,
  form: formThumbnail,
  frame: frameThumbnail,
  group: groupThumbnail,
  input: inputThumbnail,
  "input-otp": inputOtpThumbnail,
  "input-group": inputGroupThumbnail,
  kbd: kbdThumbnail,
  label: labelThumbnail,
  menu: menuThumbnail,
  meter: meterThumbnail,
  "number-field": numberFieldThumbnail,
  pagination: paginationThumbnail,
  popover: popoverThumbnail,
  "preview-card": previewCardThumbnail,
  progress: progressThumbnail,
  "radio-group": radioGroupThumbnail,
  "scroll-area": scrollAreaThumbnail,
  select: selectThumbnail,
  separator: separatorThumbnail,
  sheet: sheetThumbnail,
  skeleton: skeletonThumbnail,
  slider: sliderThumbnail,
  spinner: spinnerThumbnail,
  switch: switchThumbnail,
  table: tableThumbnail,
  tabs: tabsThumbnail,
  textarea: textareaThumbnail,
  toast: toastThumbnail,
  toggle: toggleThumbnail,
  "toggle-group": toggleGroupThumbnail,
  toolbar: toolbarThumbnail,
  tooltip: tooltipThumbnail,
  "on-hover": onHoverThumbnail,
  footer: footerThumbnail,
  "profile-morph": profileMorphThumbnail,
  "card-spinner": cardSpinnerThumbnail,
  animation: animationThumbnail
};

/**
 * Get the thumbnail for a category by slug.
 * Returns undefined if no thumbnail exists for the given slug.
 */
export function getCategoryThumbnail(slug: string): ReactNode | undefined {
  return categoryThumbnails[slug];
}

function UnknownThumbnail({ slug }: { slug: string }) {
  return (
    <Card className="max-w-50 [--radius-2xl] border-dashed border-border bg-muted/5">
      <CardPanel className="flex flex-col items-center justify-center gap-2 p-4 text-center">
        <div className="text-sm font-semibold text-foreground capitalize">
          {slug.replace(/-/g, " ")}
        </div>
        <div className="text-xs text-muted-foreground">
          Thumbnail unavailable
        </div>
      </CardPanel>
    </Card>
  );
}

/**
 * Client component wrapper for animated thumbnails that can be used in server components.
 * This prevents the "createMotionComponent() from server" error.
 */
export function CategoryThumbnail({ slug }: { slug: string }) {
  const thumbnail = categoryThumbnails[slug];
  return thumbnail || <UnknownThumbnail slug={slug} />;
}
