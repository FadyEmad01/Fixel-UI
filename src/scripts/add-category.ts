#!/usr/bin/env npm
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const categoryName = process.argv[2];

if (!categoryName) {
  console.error("Usage: npm run scripts/add-category.ts <CategoryName>");
  console.error("Example: npm run scripts/add-category.ts \"Tables\"");
  process.exit(1);
}

// Generate category ID (e.g., "Tables" -> "tables")
const categoryId = categoryName.toLowerCase().replace(/\s+/g, "-");
const categoryKey = categoryName.replace(/\s+/g, "");
const categorySlug = categoryId;

console.log(`Adding category: ${categoryName} (ID: ${categoryId})`);

try {
  // 1. Update content/declarations.ts
  const declarationsPath = join(process.cwd(), "content/declarations.ts");
  let declarationsContent = readFileSync(declarationsPath, "utf8");
  
  // Add to categoryIds object
  const categoryIdsMatch = declarationsContent.match(/(export const categoryIds: \{ \[key: string\]: string \} = \{)([\s\S]*?)(\};)/);
  if (categoryIdsMatch) {
    const existingEntries = categoryIdsMatch[2];
    const newEntry = `\n  ${categoryKey}: "${categoryId}",`;
    const updatedCategoryIds = categoryIdsMatch[1] + existingEntries + newEntry + categoryIdsMatch[3];
    declarationsContent = declarationsContent.replace(categoryIdsMatch[0], updatedCategoryIds);
  }
  
  writeFileSync(declarationsPath, declarationsContent);
  console.log("✓ Updated content/declarations.ts");

  // 2. Create thumbnail component
  const thumbnailPath = join(process.cwd(), `components/thumbnails/${categorySlug}.tsx`);
  const thumbnailContent = `import { JSX, SVGProps } from "react";

export const ${categoryKey}Thumbnail = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg width="296" height="141" viewBox="0 0 296 141" fill="none" {...props}>
    {/* Add your custom SVG content here */}
    <rect x="50" y="40" width="196" height="61" rx="8" fill="#8952E0" />
    <rect x="70" y="60" width="156" height="21" rx="4" fill="white" />
  </svg>
);
`;
  writeFileSync(thumbnailPath, thumbnailContent);
  console.log(`✓ Created components/thumbnails/${categorySlug}.tsx`);

  // 3. Update content/blocks-categories.tsx
  const categoriesPath = join(process.cwd(), "content/blocks-categories.tsx");
  let categoriesContent = readFileSync(categoriesPath, "utf8");
  
  // Add import at the top
  const importMatch = categoriesContent.match(/(import[^;]*;\n)/g);
  if (importMatch) {
    const lastImport = importMatch[importMatch.length - 1];
    const newImport = `import { ${categoryKey}Thumbnail } from "@/components/thumbnails/${categorySlug}";\n`;
    categoriesContent = categoriesContent.replace(lastImport, lastImport + newImport);
  }
  
  // Add to preblocksCategoriesMetadata array
  const metadataMatch = categoriesContent.match(/(const preblocksCategoriesMetadata: Omit<BlocksCategoryMetadata, "count">\[\] = \[)([\s\S]*?)(\];)/);
  if (metadataMatch) {
    const existingEntries = metadataMatch[2];
    const newEntry = `
  {
    id: categoryIds.${categoryKey},
    name: "${categoryName}",
    thumbnail: ${categoryKey}Thumbnail,
    hasCharts: false,
  },`;
    const updatedMetadata = metadataMatch[1] + existingEntries + newEntry + metadataMatch[3];
    categoriesContent = categoriesContent.replace(metadataMatch[0], updatedMetadata);
  }
  
  writeFileSync(categoriesPath, categoriesContent);
  console.log("✓ Updated content/blocks-categories.tsx");

  // 4. Create directories
  const componentDir = join(process.cwd(), `content/components/${categorySlug}`);
  const markdownDir = join(process.cwd(), `content/markdown/${categorySlug}`);
  
  mkdirSync(componentDir, { recursive: true });
  mkdirSync(markdownDir, { recursive: true });
  console.log(`✓ Created directories: content/components/${categorySlug}/ and content/markdown/${categorySlug}/`);

  // 5. Create category index.ts
  const categoryIndexPath = join(componentDir, "index.ts");
  writeFileSync(categoryIndexPath, "// Export your components here\n");
  console.log(`✓ Created content/components/${categorySlug}/index.ts`);

  // 6. Update main components index.ts
  const mainIndexPath = join(process.cwd(), "content/components/index.ts");
  let mainIndexContent = readFileSync(mainIndexPath, "utf8");
  mainIndexContent += `export * from "./${categorySlug}";\n`;
  writeFileSync(mainIndexPath, mainIndexContent);
  console.log("✓ Updated content/components/index.ts");

  console.log(`\n🎉 Successfully added category "${categoryName}"!`);
  console.log(`\nNext steps:`);
  console.log(`1. Update the SVG content in components/thumbnails/${categorySlug}.tsx`);
  console.log(`2. Add blocks to this category using: npm run scripts/add-block.ts`);
  
} catch (error) {
  console.error("Error adding category:", error);
  process.exit(1);
}