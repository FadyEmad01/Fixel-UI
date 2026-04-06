import { writeFileSync } from "fs";
import { categoryThumbnails } from "../lib/category-thumbnails.js";

const slugs = Object.keys(categoryThumbnails).sort();

const content = `/**
 * Auto-generated list of category slugs from categoryThumbnails.
 * Do not edit manually. Run 'npm run generate:category-slugs' to update.
 */
export const categorySlugs = ${JSON.stringify(slugs, null, 2)} as const;
`;

writeFileSync("src/lib/category-slugs.ts", content);

console.log("Generated category-slugs.ts with", slugs.length, "slugs");