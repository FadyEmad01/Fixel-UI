"use client";

import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";
import { CategoryThumbnail } from "@/lib/category-thumbnails";
import { categorySlugs } from "@/lib/category-slugs";

// ============================================
// Types
// ============================================
type Breakpoint = "mobile" | "sm" | "md" | "lg";

interface GridConfig {
  columns: Record<Breakpoint, number>;
}

// ============================================
// Constants
// ============================================
const GRID_CONFIG: GridConfig = {
  columns: {
    mobile: 1,
    sm: 2,
    md: 3,
    lg: 3,
  },
};

// ============================================
// CrossSVG Component
// ============================================
function CrossSVG({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "absolute rounded-full",
        "size-5 sm:size-6",
        "stroke-muted-foreground bg-background",
        "z-10",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 14h14" />
      <path d="M14 7v14" />
    </svg>
  );
}

// ============================================
// GridCell Component
// ============================================
interface GridCellProps {
  children: ReactNode;
  index: number;
  total: number;
  className?: string;
}

function GridCell({ children, index, total, className }: GridCellProps) {
  // Position calculations for each breakpoint
  const positions = useMemo(() => {
    const calc = (cols: number) => ({
      isFirstRow: index < cols,
      isLastRow: index >= total - (total % cols || cols),
      isFirstCol: index % cols === 0,
      isLastCol: (index + 1) % cols === 0 || index === total - 1,
    });

    return {
      mobile: calc(GRID_CONFIG.columns.mobile),
      sm: calc(GRID_CONFIG.columns.sm),
      md: calc(GRID_CONFIG.columns.md),
      lg: calc(GRID_CONFIG.columns.lg),
    };
  }, [index, total]);

  return (
    <div
      className={cn(
        "relative",
        "p-3 sm:p-4 md:p-5 lg:p-6",
        "aspect-square",
        "flex items-center justify-center",
        "border-b border-r border-border",
        "hover:bg-muted/50 transition-colors duration-200",
        "cursor-pointer",
        className
      )}
    >
      {/* Top-Left Cross - Show only for first row and first column items */}
      <CrossSVG
        className={cn(
          "-left-2.5 -top-2.5 sm:-left-3 sm:-top-3",
          // Mobile visibility
          positions.mobile.isFirstRow || positions.mobile.isFirstCol
            ? "block"
            : "hidden",
          // SM visibility
          positions.sm.isFirstRow || positions.sm.isFirstCol
            ? "sm:block"
            : "sm:hidden",
          // MD visibility
          positions.md.isFirstRow || positions.md.isFirstCol
            ? "md:block"
            : "md:hidden",
          // LG visibility
          positions.lg.isFirstRow || positions.lg.isFirstCol
            ? "lg:block"
            : "lg:hidden"
        )}
      />

      {/* Top-Right Cross - Show for first row and last column items */}
      <CrossSVG
        className={cn(
          "-right-2.5 -top-2.5 sm:-right-3 sm:-top-3",
          // Mobile
          positions.mobile.isFirstRow || positions.mobile.isLastCol
            ? "block"
            : "",
          // SM
          positions.sm.isFirstRow || positions.sm.isLastCol
            ? "sm:block"
            : "sm:",
          // MD
          positions.md.isFirstRow || positions.md.isLastCol
            ? "md:block"
            : "md:",
          // LG
          positions.lg.isFirstRow || positions.lg.isLastCol
            ? "lg:block"
            : "lg:"
        )}
      />

      {/* Bottom-Left Cross - Show for last row and first column items */}
      <CrossSVG
        className={cn(
          "-left-2.5 -bottom-2.5 sm:-left-3 sm:-bottom-3",
          // Mobile
          positions.mobile.isLastRow || positions.mobile.isFirstCol
            ? "block"
            : "hidden",
          // SM
          positions.sm.isLastRow || positions.sm.isFirstCol
            ? "sm:block"
            : "sm:hidden",
          // MD
          positions.md.isLastRow || positions.md.isFirstCol
            ? "md:block"
            : "md:hidden",
          // LG
          positions.lg.isLastRow || positions.lg.isFirstCol
            ? "lg:block"
            : "lg:hidden"
        )}
      />

      {/* Bottom-Right Cross - Show for last row and last column items */}
      <CrossSVG
        className={cn(
          "-right-2.5 -bottom-2.5 sm:-right-3 sm:-bottom-3",
          // Mobile
          positions.mobile.isLastRow || positions.mobile.isLastCol
            ? "block"
            : "hidden",
          // SM
          positions.sm.isLastRow || positions.sm.isLastCol
            ? "sm:block"
            : "sm:hidden",
          // MD
          positions.md.isLastRow || positions.md.isLastCol
            ? "md:block"
            : "md:hidden",
          // LG
          positions.lg.isLastRow || positions.lg.isLastCol
            ? "lg:block"
            : "lg:hidden"
        )}
      />

      {children}
    </div>
  );
}

// ============================================
// CategoryCard Component
// ============================================
interface CategoryCardProps {
  slug: string;
}

function CategoryCard({ slug }: CategoryCardProps) {
  const title = slug.replace(/-/g, " ");

  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 h-full w-full">
      {/* Thumbnail */}
      <div className="flex-1 flex items-center justify-center w-full min-h-0 max-h-[60%]">
        <CategoryThumbnail slug={slug} />
      </div>

      {/* Title */}
      <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground text-center capitalize leading-tight line-clamp-2 px-1">
        {title}
      </h3>
    </div>
  );
}

// ============================================
// Section Header Component
// ============================================
interface SectionHeaderProps {
  title: string;
  description?: string;
}

function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header className="space-y-3 sm:space-y-4 pb-6 sm:pb-8 md:pb-10 lg:pb-12 flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl px-4">
          {description}
        </p>
      )}
    </header>
  );
}

// ============================================
// Main CategoriesGrid Component
// ============================================
interface CategoriesGridProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function CategoriesGrid({
  title = "Explore Fixel UI Illustrations",
  description = "Discover our wide range of coded Illustrations tailored for your needs.",
  className,
}: CategoriesGridProps) {
  const totalItems = categorySlugs.length;

  return (
    <section
      id="categories"
      className={cn("bg-background py-8 sm:py-10 md:py-12 lg:py-16", className)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader title={title} description={description} />

        {/* Grid Container */}
        <div className="relative border-t border-l border-border rounded-lg overflow-visible">
          {/* Responsive Grid */}
          <div
            className={cn(
              "grid",
              "grid-cols-1", // Mobile: 1 column
              "sm:grid-cols-2", // Small: 2 columns
              "md:grid-cols-3", // Medium: 3 columns
              "lg:grid-cols-3" // Large: 3 columns
            )}
          >
            {categorySlugs.map((slug, index) => (
              <GridCell key={slug} index={index} total={totalItems}>
                <CategoryCard slug={slug} />
              </GridCell>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// "use client";

// import { ReactNode, useState } from "react";
// import { cn } from "@/lib/utils";
// import { CategoryThumbnail } from "@/lib/category-thumbnails";
// import { categorySlugs } from "@/lib/category-slugs";
// import { getComponentInfo, getAllDependencies, type ComponentDependency } from "@/lib/thumbnails-registry";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerDescription,
//   DrawerHeader,
//   DrawerTitle,
// } from "@/components/ui/drawer";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Copy, Check, Package, Code2, Boxes } from "lucide-react";

// // ============================================
// // Code Block Component
// // ============================================
// function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
//   const [copied, setCopied] = useState(false);

//   const copyToClipboard = async () => {
//     await navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="relative">
//       <Button
//         size="icon"
//         variant="ghost"
//         className="absolute top-2 right-2 z-10 h-8 w-8"
//         onClick={copyToClipboard}
//       >
//         {copied ? (
//           <Check className="h-4 w-4 text-green-500" />
//         ) : (
//           <Copy className="h-4 w-4" />
//         )}
//       </Button>
//       <ScrollArea className="h-[400px] w-full rounded-md border bg-muted/30">
//         <pre className="p-4">
//           <code className="text-sm font-mono">{code}</code>
//         </pre>
//       </ScrollArea>
//     </div>
//   );
// }

// // ============================================
// // Dependency Badge Component
// // ============================================
// function DependencyBadge({ dependency }: { dependency: ComponentDependency }) {
//   const getIcon = () => {
//     switch (dependency.type) {
//       case 'component':
//         return <Boxes className="h-3 w-3" />;
//       case 'library':
//         return <Package className="h-3 w-3" />;
//       case 'utility':
//         return <Code2 className="h-3 w-3" />;
//     }
//   };

//   const getVariant = () => {
//     switch (dependency.type) {
//       case 'component':
//         return 'default';
//       case 'library':
//         return 'secondary';
//       case 'utility':
//         return 'outline';
//     }
//   };

//   return (
//     <Badge variant={getVariant()} className="gap-1.5">
//       {getIcon()}
//       {dependency.name}
//     </Badge>
//   );
// }

// // ============================================
// // Component Details Dialog
// // ============================================
// interface ComponentDialogProps {
//   slug: string;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// // function ComponentDialog({ slug, open, onOpenChange }: ComponentDialogProps) {
// //   const componentInfo = getComponentInfo(slug);
// //   const allDependencies = getAllDependencies(slug);

// //   if (!componentInfo) {
// //     return (
// //       <Drawer open={open} onOpenChange={onOpenChange}>
// //         <DrawerContent>
// //           <DrawerHeader>
// //             <DrawerTitle>Component Not Found</DrawerTitle>
// //             <DrawerDescription>
// //               No information available for <code className="text-sm font-mono">{slug}</code> yet.
// //             </DrawerDescription>
// //           </DrawerHeader>
// //         </DrawerContent>
// //       </Drawer>
// //     );
// //   }

// //   // Group dependencies by type
// //   const componentDeps = allDependencies.filter(d => d.type === 'component');
// //   const libraryDeps = allDependencies.filter(d => d.type === 'library');
// //   const utilityDeps = allDependencies.filter(d => d.type === 'utility');

// //   return (
// //     <Drawer open={open} onOpenChange={onOpenChange}>
// //       <DrawerContent className="max-h-[90vh] overflow-hidden">
// //         <div className="flex h-full min-h-0 flex-col max-w-4xl mx-auto">
// //           <DrawerHeader>
// //             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
// //               <DrawerTitle className="text-2xl font-bold capitalize">
// //                 {componentInfo.name}
// //               </DrawerTitle>
// //               <Badge variant="outline">{componentInfo.category}</Badge>
// //             </div>
// //             <DrawerDescription className="text-base">
// //               {componentInfo.description}
// //             </DrawerDescription>
// //           </DrawerHeader>

// //           <Tabs defaultValue="preview" className="flex-1 min-h-0 overflow-hidden flex flex-col">
// //             <TabsList className="grid w-full grid-cols-3">
// //               <TabsTrigger value="preview">Preview</TabsTrigger>
// //               <TabsTrigger value="code">Code</TabsTrigger>
// //               <TabsTrigger value="dependencies">
// //                 Dependencies ({allDependencies.length})
// //               </TabsTrigger>
// //             </TabsList>

// //             <div className="flex-1 min-h-0 overflow-hidden mt-4">
// //               {/* Preview Tab */}
// //               <TabsContent value="preview" className="h-full min-h-0 mt-0 overflow-hidden">
// //                 <div className="flex h-full min-h-[420px] w-full items-center justify-center p-6 border rounded-lg bg-muted/20">
// //                   <div className="w-full max-w-[520px]">
// //                     <CategoryThumbnail slug={slug} />
// //                   </div>
// //                 </div>
// //               </TabsContent>

// //               {/* Code Tab */}
// //               <TabsContent value="code" className="h-full min-h-0 mt-0 overflow-hidden">
// //                 <div className="h-full flex flex-col gap-4">
// //                   <div>
// //                     <h3 className="text-sm font-semibold mb-2">Component Code</h3>
// //                     <CodeBlock code={componentInfo.code} />
// //                   </div>
// //                 </div>
// //               </TabsContent>

// //               {/* Dependencies Tab */}
// //               <TabsContent value="dependencies" className="h-full min-h-0 mt-0 overflow-hidden">
// //                 <ScrollArea className="h-full min-h-[400px]">
// //                   <div className="space-y-6 p-1">
// //                     {/* Component Dependencies */}
// //                     {componentDeps.length > 0 && (
// //                       <div>
// //                         <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
// //                           <Boxes className="h-4 w-4" />
// //                           Component Dependencies ({componentDeps.length})
// //                         </h3>
// //                         <div className="flex flex-wrap gap-2">
// //                           {componentDeps.map((dep) => (
// //                             <DependencyBadge key={dep.name} dependency={dep} />
// //                           ))}
// //                         </div>
// //                         <p className="text-xs text-muted-foreground mt-2">
// //                           These are internal components used to build this component.
// //                         </p>
// //                       </div>
// //                     )}

// //                     {/* Library Dependencies */}
// //                     {libraryDeps.length > 0 && (
// //                       <div>
// //                         <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
// //                           <Package className="h-4 w-4" />
// //                           External Libraries ({libraryDeps.length})
// //                         </h3>
// //                         <div className="space-y-2">
// //                           {libraryDeps.map((dep) => (
// //                             <div
// //                               key={dep.name}
// //                               className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
// //                             >
// //                               <div className="flex items-center gap-2">
// //                                 <DependencyBadge dependency={dep} />
// //                                 <code className="text-xs text-muted-foreground">
// //                                   npm install {dep.name}
// //                                 </code>
// //                               </div>
// //                               <Button
// //                                 size="sm"
// //                                 variant="ghost"
// //                                 onClick={() =>
// //                                   navigator.clipboard.writeText(`npm install ${dep.name}`)
// //                                 }
// //                               >
// //                                 <Copy className="h-3 w-3" />
// //                               </Button>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}

// //                     {/* Utility Dependencies */}
// //                     {utilityDeps.length > 0 && (
// //                       <div>
// //                         <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
// //                           <Code2 className="h-4 w-4" />
// //                           Utilities ({utilityDeps.length})
// //                         </h3>
// //                         <div className="flex flex-wrap gap-2">
// //                           {utilityDeps.map((dep) => (
// //                             <DependencyBadge key={dep.name} dependency={dep} />
// //                           ))}
// //                         </div>
// //                         <p className="text-xs text-muted-foreground mt-2">
// //                           Utility functions and helpers required by this component.
// //                         </p>
// //                       </div>
// //                     )}

// //                     {/* All Dependencies Install Command */}
// //                     {libraryDeps.length > 0 && (
// //                       <div className="pt-4 border-t">
// //                         <h3 className="text-sm font-semibold mb-2">Install All</h3>
// //                         <div className="relative">
// //                           <code className="block p-3 bg-muted rounded-md text-sm break-all">
// //                             npm install {libraryDeps.map(d => d.name).join(' ')}
// //                           </code>
// //                           <Button
// //                             size="icon"
// //                             variant="ghost"
// //                             className="absolute top-1 right-1 h-8 w-8"
// //                             onClick={() =>
// //                               navigator.clipboard.writeText(
// //                                 `npm install ${libraryDeps.map(d => d.name).join(' ')}`
// //                               )
// //                             }
// //                           >
// //                             <Copy className="h-3 w-3" />
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </ScrollArea>
// //               </TabsContent>
// //             </div>
// //           </Tabs>
// //         </div>
// //       </DrawerContent>
// //     </Drawer>
// //   );
// // }

// // ============================================
// // CrossSVG Component
// // ============================================

// function ComponentDialog({ slug, open, onOpenChange }: ComponentDialogProps) {
//   const componentInfo = getComponentInfo(slug);
//   const allDependencies = getAllDependencies(slug);

//   if (!componentInfo) {
//     return (
//       <Drawer open={open} onOpenChange={onOpenChange}>
//         <DrawerContent>
//           <DrawerHeader>
//             <DrawerTitle>Component Not Found</DrawerTitle>
//             <DrawerDescription>
//               No information available for <code className="text-sm font-mono">{slug}</code> yet.
//             </DrawerDescription>
//           </DrawerHeader>
//         </DrawerContent>
//       </Drawer>
//     );
//   }

//   // Group dependencies by type
//   const componentDeps = allDependencies.filter(d => d.type === 'component');
//   const libraryDeps = allDependencies.filter(d => d.type === 'library');
//   const utilityDeps = allDependencies.filter(d => d.type === 'utility');

//   return (
//     <Drawer open={open} onOpenChange={onOpenChange}>
//       <DrawerContent className="max-h-[90vh]">
//         {/* Main container with fixed height */}
//         <div className="flex flex-col h-[85vh] max-w-4xl mx-auto w-full">
//           {/* Header - fixed height */}
//           <DrawerHeader className="shrink-0">
//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <DrawerTitle className="text-2xl font-bold capitalize">
//                 {componentInfo.name}
//               </DrawerTitle>
//               <Badge variant="outline">{componentInfo.category}</Badge>
//             </div>
//             <DrawerDescription className="text-base">
//               {componentInfo.description}
//             </DrawerDescription>
//           </DrawerHeader>

//           {/* Tabs - flex grow to fill remaining space */}
//           <div className="flex-1 flex flex-col min-h-0 px-4 pb-4">
//             <Tabs defaultValue="preview" className="flex-1 flex flex-col min-h-0">
//               <TabsList className="grid w-full grid-cols-3 shrink-0">
//                 <TabsTrigger value="preview">Preview</TabsTrigger>
//                 <TabsTrigger value="code">Code</TabsTrigger>
//                 <TabsTrigger value="dependencies">
//                   Dependencies ({allDependencies.length})
//                 </TabsTrigger>
//               </TabsList>

//               {/* Tab content container - this is the scrollable area */}
//               <div className="flex-1 min-h-0 mt-4">
//                 {/* Preview Tab */}
//                 <TabsContent value="preview" className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col">
//                   <ScrollArea className="flex-1 h-full">
//                     <div className="flex min-h-[400px] w-full items-center justify-center p-6 border rounded-lg bg-muted/20">
//                       <div className="w-full max-w-[520px]">
//                         <CategoryThumbnail slug={slug} />
//                       </div>
//                     </div>
//                   </ScrollArea>
//                 </TabsContent>

//                 {/* Code Tab */}
//                 <TabsContent value="code" className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col">
//                   <ScrollArea className="flex-1 h-full">
//                     <div className="space-y-4 pr-4">
//                       <div>
//                         <h3 className="text-sm font-semibold mb-2">Component Code</h3>
//                         <CodeBlock code={componentInfo.code} />
//                       </div>
//                     </div>
//                   </ScrollArea>
//                 </TabsContent>

//                 {/* Dependencies Tab */}
//                 <TabsContent value="dependencies" className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col">
//                   <ScrollArea className="flex-1 h-full pb-20">
//                     <div className="space-y-6 pr-4">
//                       {/* Component Dependencies */}
//                       {componentDeps.length > 0 && (
//                         <div>
//                           <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
//                             <Boxes className="h-4 w-4" />
//                             Component Dependencies ({componentDeps.length})
//                           </h3>
//                           <div className="flex flex-wrap gap-2">
//                             {componentDeps.map((dep) => (
//                               <DependencyBadge key={dep.name} dependency={dep} />
//                             ))}
//                           </div>
//                           <p className="text-xs text-muted-foreground mt-2">
//                             These are internal components used to build this component.
//                           </p>
//                         </div>
//                       )}

//                       {/* Library Dependencies */}
//                       {libraryDeps.length > 0 && (
//                         <div>
//                           <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
//                             <Package className="h-4 w-4" />
//                             External Libraries ({libraryDeps.length})
//                           </h3>
//                           <div className="space-y-2">
//                             {libraryDeps.map((dep) => (
//                               <div
//                                 key={dep.name}
//                                 className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
//                               >
//                                 <div className="flex items-center gap-2">
//                                   <DependencyBadge dependency={dep} />
//                                   <code className="text-xs text-muted-foreground">
//                                     npm install {dep.name}
//                                   </code>
//                                 </div>
//                                 <Button
//                                   size="sm"
//                                   variant="ghost"
//                                   onClick={() =>
//                                     navigator.clipboard.writeText(`npm install ${dep.name}`)
//                                   }
//                                 >
//                                   <Copy className="h-3 w-3" />
//                                 </Button>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Utility Dependencies */}
//                       {utilityDeps.length > 0 && (
//                         <div>
//                           <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
//                             <Code2 className="h-4 w-4" />
//                             Utilities ({utilityDeps.length})
//                           </h3>
//                           <div className="flex flex-wrap gap-2">
//                             {utilityDeps.map((dep) => (
//                               <DependencyBadge key={dep.name} dependency={dep} />
//                             ))}
//                           </div>
//                           <p className="text-xs text-muted-foreground mt-2">
//                             Utility functions and helpers required by this component.
//                           </p>
//                         </div>
//                       )}

//                       {/* All Dependencies Install Command */}
//                       {libraryDeps.length > 0 && (
//                         <div className="pt-4 border-t">
//                           <h3 className="text-sm font-semibold mb-2">Install All</h3>
//                           <div className="relative">
//                             <code className="block p-3 bg-muted rounded-md text-sm break-all">
//                               npm install {libraryDeps.map(d => d.name).join(' ')}
//                             </code>
//                             <Button
//                               size="icon"
//                               variant="ghost"
//                               className="absolute top-1 right-1 h-8 w-8"
//                               onClick={() =>
//                                 navigator.clipboard.writeText(
//                                   `npm install ${libraryDeps.map(d => d.name).join(' ')}`
//                                 )
//                               }
//                             >
//                               <Copy className="h-3 w-3" />
//                             </Button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </ScrollArea>
//                 </TabsContent>
//               </div>
//             </Tabs>
//           </div>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }

// function CrossSVG({ className }: { className?: string }) {
//   return (
//     <svg
//       className={cn(
//         "absolute rounded-full size-5 sm:size-6 stroke-muted-foreground bg-background z-10",
//         className
//       )}
//       xmlns="http://www.w3.org/2000/svg"
//       width="28"
//       height="28"
//       viewBox="0 0 28 28"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M7 14h14" />
//       <path d="M14 7v14" />
//     </svg>
//   );
// }

// // ============================================
// // GridCell Component
// // ============================================
// function GridCell({
//   children,
//   className,
//   onClick,
// }: {
//   children: ReactNode;
//   className?: string;
//   onClick?: () => void;
// }) {
//   return (
//     <div
//       className={cn(
//         "relative",
//         "p-3 sm:p-4 md:p-5 lg:p-6",
//         "aspect-square",
//         "flex items-center justify-center",
//         "border-b border-r border-border",
//         "hover:bg-muted/50 transition-colors duration-200",
//         "cursor-pointer group",
//         className
//       )}
//       onClick={onClick}
//     >
//       <CrossSVG className="-left-2.5 -top-2.5 sm:-left-3 sm:-top-3" />
//       <CrossSVG className="-right-2.5 -top-2.5 sm:-right-3 sm:-top-3" />
//       <CrossSVG className="-left-2.5 -bottom-2.5 sm:-left-3 sm:-bottom-3" />
//       <CrossSVG className="-right-2.5 -bottom-2.5 sm:-right-3 sm:-bottom-3" />
//       {children}
//     </div>
//   );
// }

// // ============================================
// // CategoryCard Component
// // ============================================
// function CategoryCard({ slug }: { slug: string }) {
//   return (
//     <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 h-full w-full">
//       <div className="flex-1 flex items-center justify-center w-full min-h-0">
//         <div className="group-hover:scale-110 transition-transform duration-200">
//           <CategoryThumbnail slug={slug} />
//         </div>
//       </div>
//       <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground text-center capitalize leading-tight line-clamp-2">
//         {slug.replace(/-/g, " ")}
//       </h3>
//     </div>
//   );
// }

// // ============================================
// // Section Header Component
// // ============================================
// function SectionHeader({
//   title,
//   description,
// }: {
//   title: string;
//   description?: string;
// }) {
//   return (
//     <header className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
//       <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
//         {title}
//       </h2>
//       {description && (
//         <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
//           {description}
//         </p>
//       )}
//     </header>
//   );
// }

// // ============================================
// // Main CategoriesGrid Component
// // ============================================
// export default function CategoriesGrid() {
//   const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleCardClick = (slug: string) => {
//     setSelectedComponent(slug);
//     setIsDialogOpen(true);
//   };

//   return (
//     <>
//       <section id="categories" className="bg-background">
//         <div className="max-w-6xl mx-auto py-10 sm:py-12 md:py-16 lg:py-20">
//           <SectionHeader
//             title="Explore Fixel UI Illustrations"
//             description="Discover our wide range of coded Illustrations tailored for your needs."
//           />

//           <div className="border-t border-l border-border rounded-lg overflow-visible">
//             <div
//               className={cn(
//                 "grid",
//                 "grid-cols-1",
//                 "sm:grid-cols-2",
//                 "md:grid-cols-3",
//                 "lg:grid-cols-3"
//               )}
//             >
//               {categorySlugs.map((slug) => (
//                 <GridCell key={slug} onClick={() => handleCardClick(slug)}>
//                   <CategoryCard slug={slug} />
//                 </GridCell>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {selectedComponent && (
//         <ComponentDialog
//           slug={selectedComponent}
//           open={isDialogOpen}
//           onOpenChange={setIsDialogOpen}
//         />
//       )}
//     </>
//   );
// }