#!/usr/bin/env bun
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";

interface BlockArgs {
  category: string;
  id: string;
  name: string;
  type: "file" | "directory";
  height?: string;
}

function parseArgs(): BlockArgs {
  const args = process.argv.slice(2);
  const parsed: Partial<BlockArgs> = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace(/^--/, "");
    const value = args[i + 1];
    
    if (key && value) {
      if (key === "category") parsed.category = value;
      if (key === "id") parsed.id = value;
      if (key === "name") parsed.name = value;
      if (key === "type") parsed.type = value as "file" | "directory";
      if (key === "height") parsed.height = value;
    }
  }

  if (!parsed.category || !parsed.id || !parsed.name || !parsed.type) {
    console.error("Usage: bun run scripts/add-block.ts --category <category> --id <block-id> --name <display-name> --type <file|directory> [--height <height>]");
    console.error("Examples:");
    console.error("  bun run scripts/add-block.ts --category tables --id table-01 --name \"Basic Data Table\" --type file");
    console.error("  bun run scripts/add-block.ts --category forms --id form-01 --name \"Contact Form\" --type directory --height 600px");
    process.exit(1);
  }

  return parsed as BlockArgs;
}

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
}

function createFileTypeBlock(args: BlockArgs) {
  const { category, id, name } = args;
  const componentName = toPascalCase(id);
  const componentPath = join(process.cwd(), `content/components/${category}/${id}.tsx`);
  
  // Create basic component template
  const componentContent = `import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ${componentName}() {
  return (
    <div className="flex items-center justify-center p-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>${name}</CardTitle>
          <CardDescription>
            This is a placeholder component. Update with your implementation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            Example Button
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
`;

  writeFileSync(componentPath, componentContent);
  console.log(`✓ Created ${componentPath}`);
}

function createDirectoryTypeBlock(args: BlockArgs) {
  const { category, id, name } = args;
  const componentName = toPascalCase(id);
  const blockDir = join(process.cwd(), `content/components/${category}/${id}`);
  
  // Create directory
  mkdirSync(blockDir, { recursive: true });
  
  // Create main index.tsx
  const indexPath = join(blockDir, "index.tsx");
  const indexContent = `import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ${componentName}() {
  return (
    <div className="flex items-center justify-center p-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>${name}</CardTitle>
          <CardDescription>
            This is a placeholder component. Update with your implementation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            Example Button
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
`;

  writeFileSync(indexPath, indexContent);
  console.log(`✓ Created ${blockDir}/ with index.tsx`);
}

async function runGenerateMarkdown(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log("Running bun run generate:markdown...");
    const child = spawn("bun", ["run", "generate:markdown"], {
      stdio: "inherit",
      cwd: process.cwd()
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log("✓ Generated MDX documentation");
        resolve();
      } else {
        reject(new Error(`generate:markdown failed with code ${code}`));
      }
    });

    child.on("error", reject);
  });
}

const args = parseArgs();

console.log(`Adding ${args.type} block: ${args.name} (ID: ${args.id}) to category: ${args.category}`);

try {
  // 1. Create component files
  if (args.type === "file") {
    createFileTypeBlock(args);
  } else {
    createDirectoryTypeBlock(args);
  }

  // 2. Update blocks-metadata.ts
  const metadataPath = join(process.cwd(), "content/blocks-metadata.ts");
  let metadataContent = readFileSync(metadataPath, "utf8");
  
  const newEntry = `
  {
    id: "${args.id}",
    category: categoryIds.${toPascalCase(args.category)},
    name: "${args.name}",${args.height ? `\n    iframeHeight: "${args.height}",` : ""}
    type: "${args.type}",
  },`;
  
  // Find the end of the array and insert before the closing bracket
  const arrayEndMatch = metadataContent.match(/(\];)$/m);
  if (arrayEndMatch) {
    metadataContent = metadataContent.replace(arrayEndMatch[0], newEntry + "\n" + arrayEndMatch[0]);
  }
  
  writeFileSync(metadataPath, metadataContent);
  console.log("✓ Updated content/blocks-metadata.ts");

  // 3. Update blocks-components.tsx
  const componentsPath = join(process.cwd(), "content/blocks-components.tsx");
  let componentsContent = readFileSync(componentsPath, "utf8");
  
  const componentName = toPascalCase(args.id);
  const newComponentEntry = `  "${args.id}": components.${componentName},\n`;
  
  // Find the end of the object and insert before the closing brace
  const objectEndMatch = componentsContent.match(/(\};)$/m);
  if (objectEndMatch) {
    componentsContent = componentsContent.replace(objectEndMatch[0], newComponentEntry + objectEndMatch[0]);
  }
  
  writeFileSync(componentsPath, componentsContent);
  console.log("✓ Updated content/blocks-components.tsx");

  // 4. Update category index.ts
  const categoryIndexPath = join(process.cwd(), `content/components/${args.category}/index.ts`);
  let categoryIndexContent = readFileSync(categoryIndexPath, "utf8");
  
  const exportEntry = `export { default as ${componentName} } from "./${args.id}";\n`;
  categoryIndexContent += exportEntry;
  
  writeFileSync(categoryIndexPath, categoryIndexContent);
  console.log(`✓ Updated content/components/${args.category}/index.ts`);

  // 5. Generate markdown for file-type blocks
  if (args.type === "file") {
    await runGenerateMarkdown();
  }

  console.log(`\n🎉 Successfully added ${args.type} block "${args.name}"!`);
  console.log(`\nNext steps:`);
  if (args.type === "file") {
    console.log(`1. Update the component implementation in content/components/${args.category}/${args.id}.tsx`);
  } else {
    console.log(`1. Update the component implementation in content/components/${args.category}/${args.id}/`);
    console.log(`2. Add additional component files as needed in the directory`);
  }
  console.log(`3. Run 'bun run generate:registry' to update the registry`);
  
} catch (error) {
  console.error("Error adding block:", error);
  process.exit(1);
}