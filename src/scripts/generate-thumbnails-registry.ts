#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { categoryThumbnails } from "../lib/category-thumbnails.js";

const slugFile = "src/lib/category-slugs.ts";
const IllustrationsFile = "src/app/(blocks)/Illustrations/page.tsx";
const thumbnailFile = "src/lib/category-thumbnails.tsx";
const outputFile = "src/lib/thumbnails-registry.generated.json";

const slugs = Object.keys(categoryThumbnails).sort();

const categorySlugFileContent = `/**
 * Auto-generated list of category slugs from categoryThumbnails.
 * Do not edit manually. Run 'npm run generate:category-registry' to update.
 */
export const categorySlugs = ${JSON.stringify(slugs, null, 2)} as const;
`;

const existingSlugFile = readFileSync(slugFile, "utf8");
if (existingSlugFile !== categorySlugFileContent) {
  writeFileSync(slugFile, categorySlugFileContent);
  console.log(`Updated ${slugFile}`);
}

const IllustrationsText = readFileSync(IllustrationsFile, "utf8");
const thumbnailText = readFileSync(thumbnailFile, "utf8");

function extractImports(source: string): string[] {
  const imports = new Set<string>();
  const importRegex = /import\s+[\s\S]*?from\s+["']([^"']+)["']/g;
  let match;

  while ((match = importRegex.exec(source)) !== null) {
    imports.add(match[1]);
  }

  return Array.from(imports);
}

function normalizePackageName(moduleSpecifier: string): string {
  if (moduleSpecifier.startsWith("@")) {
    const parts = moduleSpecifier.split("/");
    return parts.slice(0, 2).join("/");
  }

  return moduleSpecifier.split("/")[0];
}

function buildDependencies(imports: string[]) {
  const componentDeps = new Set<string>();
  const utilityDeps = new Set<string>();
  const libraryDeps = new Set<string>();

  for (const moduleSpecifier of imports) {
    if (moduleSpecifier.startsWith("@/components/ui/")) {
      const componentName = moduleSpecifier.split("/").pop();
      if (componentName) {
        componentDeps.add(componentName);
      }
      continue;
    }

    if (moduleSpecifier.startsWith("@/lib/")) {
      const utilityName = moduleSpecifier.split("/").pop();
      if (utilityName) {
        utilityDeps.add(utilityName);
      }
      continue;
    }

    if (moduleSpecifier === "lucide-react" || moduleSpecifier === "motion/react") {
      libraryDeps.add(moduleSpecifier);
      continue;
    }

    if (moduleSpecifier === "react" || moduleSpecifier === "react-dom") {
      continue;
    }

    if (moduleSpecifier.startsWith(".") || moduleSpecifier.startsWith("/")) {
      continue;
    }

    if (moduleSpecifier.startsWith("@/")) {
      continue;
    }

    const pkg = normalizePackageName(moduleSpecifier);
    if (pkg) {
      libraryDeps.add(pkg);
    }
  }

  return {
    componentDeps: Array.from(componentDeps).sort(),
    utilityDeps: Array.from(utilityDeps).sort(),
    libraryDeps: Array.from(libraryDeps).sort(),
  };
}

const imports = [...extractImports(IllustrationsText), ...extractImports(thumbnailText)];
const { componentDeps, utilityDeps, libraryDeps } = buildDependencies(imports);

const dependencies = [
  ...componentDeps.map((name) => ({ type: "component", name })),
  ...utilityDeps.map((name) => ({ type: "utility", name })),
  ...libraryDeps.map((name) => ({ type: "library", name })),
];

const filePaths = [IllustrationsFile, thumbnailFile, slugFile];

const registry = Object.fromEntries(
  slugs.map((slug) => {
    const title = slug.replace(/-/g, " ");
    return [
      slug,
      {
        name: title,
        category: "Illustrations thumbnails",
        description: `Thumbnail preview for the ${title} category. Download the Illustrations page and thumbnail support files.`,
        code: `import { CategoryThumbnail } from "@/lib/category-thumbnails";

function Example() {
  return <CategoryThumbnail slug="${slug}" />;
}
`,
        dependencies,
        files: filePaths,
      },
    ];
  }),
);

writeFileSync(outputFile, JSON.stringify(registry, null, 2) + "\n");
console.log(`Generated ${outputFile} with ${slugs.length} entries`);
