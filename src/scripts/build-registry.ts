/**
 * build-registry.ts
 *
 * Generates shadcn-compatible registry JSON files under public/r/.
 *
 * Usage:
 *   npx tsx src/scripts/build-registry.ts
 *
 * Output:
 *   public/r/<name>.json   — per-block registry item JSON
 *   public/r/footer.json   — combined block containing all footer variants
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ─── Paths ────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Root of the Next.js project */
const ROOT = path.resolve(__dirname, "../..");

/** Where component source files live */
const COMPONENTS_ROOT = path.join(ROOT, "src/components");

/** Where the generated JSON files are written */
const OUT_DIR = path.join(ROOT, "public/r");

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Pull the base URL from the constants file at build time.
 * Falls back to the production URL if the env var is not set.
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://fixel-ui.vercel.app";

// ─── Types (inline — no TS import needed at runtime) ─────────────────────────

type RegistryItemType =
  | "registry:block"
  | "registry:component"
  | "registry:ui"
  | "registry:hook"
  | "registry:lib"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme";

interface RegistryFile {
  path: string;
  type: RegistryItemType;
  target?: string;
  content?: string;
}

interface RegistryItem {
  name: string;
  type: RegistryItemType;
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  categories?: string[];
  tags?: string[];
  meta?: Record<string, unknown>;
  docs?: string;
}

// ─── Registry Definitions ─────────────────────────────────────────────────────

/**
 * All registry items.
 * Add new components/blocks here — no other changes needed.
 *
 * `files[].path` is relative to `src/components/` in the repo.
 */
function scanDirectory(dir: string): RegistryItem[] {
  const fullPath = path.join(COMPONENTS_ROOT, "registry", dir);

  if (!fs.existsSync(fullPath)) return [];

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  return entries
    .map((entry) => {
      const itemPath = path.join(fullPath, entry.name);

      // 🔹 Folder-based components (ui / blocks)
      if (entry.isDirectory()) {
        const files = fs
          .readdirSync(itemPath)
          .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
          .map((file) => ({
            path: `registry/${dir}/${entry.name}/${file}`,
            type:
              dir === "ui"
                ? "registry:ui"
                : dir === "hooks"
                  ? "registry:hook"
                  : "registry:block",
          }));

        return {
          name: entry.name,
          type:
            dir === "ui"
              ? "registry:component"
              : dir === "hooks"
                ? "registry:hook"
                : "registry:block",
          files,
          categories: [dir],
        };
      }

      // 🔹 Single file hooks (optional support)
      if (entry.isFile()) {
        return {
          name: entry.name.replace(/\.(ts|tsx)$/, ""),
          type: "registry:hook",
          files: [
            {
              path: `registry/${dir}/${entry.name}`,
              type: "registry:hook",
            },
          ],
          categories: ["hooks"],
        };
      }

      return null;
    })
    .filter(Boolean) as RegistryItem[];
}
const REGISTRY_ITEMS: RegistryItem[] = [
  ...scanDirectory("ui"),
  ...scanDirectory("hooks"),
  ...scanDirectory("blocks"),
  // manual overrides (optional)
];
// ─── Grouped entries ──────────────────────────────────────────────────────────

/**
 * Groups of registry items that should be published as a single combined JSON.
 *
 * Key     → output filename  (e.g. "footer" → public/r/footer.json)
 * Value   → array of item names to include
 */
const GROUPS: Record<string, string[]> = {
  footer: ["footer-01", "footer-02"],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Read a source file and return its content as a string. */
function readSourceFile(relativePath: string): string {
  const absolute = path.join(COMPONENTS_ROOT, relativePath);

  if (!fs.existsSync(absolute)) {
    throw new Error(
      `Source file not found: ${absolute}\n` +
      `  Make sure the file exists at src/components/${relativePath}`
    );
  }

  return fs.readFileSync(absolute, "utf-8");
}

/**
 * Resolve all file contents for a registry item.
 * Returns a new item with `content` populated on every file.
 */
function resolveItem(item: RegistryItem): RegistryItem {
  return {
    ...item,
    files: item.files.map((file) => ({
      ...file,
      content: readSourceFile(file.path),
    })),
  };
}

/** Write a registry item JSON to public/r/<name>.json */
function writeItemJson(name: string, payload: object): void {
  const outPath = path.join(OUT_DIR, `${name}.json`);
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf-8");
  console.log(`  ✔  public/r/${name}.json`);
}

/**
 * Build a combined block JSON that merges multiple registry items.
 * Files from all included items are merged into a single `files` array so
 * `shadcn add <url>/r/footer.json` installs every variant at once.
 */
function buildCombined(
  groupName: string,
  itemNames: string[],
  resolvedItems: Map<string, RegistryItem>
): object {
  const items = itemNames.map((n) => {
    const item = resolvedItems.get(n);
    if (!item) throw new Error(`Group "${groupName}" references unknown item "${n}"`);
    return item;
  });

  // Merge files, deps, categories
  // const files = items.flatMap((i) => i.files);
  const filesMap = new Map();

  items.flatMap(i => i.files).forEach(file => {
    filesMap.set(file.target ?? file.path, file);
  });

  const files = Array.from(filesMap.values());
  const dependencies = [
    ...new Set(items.flatMap((i) => i.dependencies ?? [])),
  ];
  const devDependencies = [
    ...new Set(items.flatMap((i) => i.devDependencies ?? [])),
  ];
  const registryDependencies = [
    ...new Set(items.flatMap((i) => i.registryDependencies ?? [])),
  ];
  const categories = [...new Set(items.flatMap((i) => i.categories ?? []))];

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: groupName,
    type: "registry:block",
    title: `${groupName.charAt(0).toUpperCase()}${groupName.slice(1)} Collection`,
    description: `All ${groupName} variants from Fixel UI.`,
    ...(dependencies.length && { dependencies }),
    ...(devDependencies.length && { devDependencies }),
    ...(registryDependencies.length && { registryDependencies }),
    files,
    categories,
    meta: {
      installCommands: {
        pnpm: `pnpm dlx shadcn@latest add ${BASE_URL}/r/${groupName}.json`,
        npm: `npx shadcn@latest add ${BASE_URL}/r/${groupName}.json`,
        yarn: `yarn shadcn@latest add ${BASE_URL}/r/${groupName}.json`,
        bun: `bunx --bun shadcn@latest add ${BASE_URL}/r/${groupName}.json`,
      },
    },
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log("\n🔨  Building Fixel UI registry...\n");
  console.log(`   Base URL : ${BASE_URL}`);
  console.log(`   Output   : ${OUT_DIR}\n`);

  // Ensure output directory exists
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Resolve all items (embed file contents)
  const resolvedItems = new Map<string, RegistryItem>();

  for (const item of REGISTRY_ITEMS) {
    try {
      resolvedItems.set(item.name, resolveItem(item));
    } catch (err) {
      console.error(`\n✖  Failed to resolve "${item.name}":`, err);
      process.exit(1);
    }
  }

  // Write individual item JSONs
  console.log("📦  Individual blocks:\n");
  for (const [name, item] of resolvedItems) {
    const payload = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      ...item,
      meta: {
        ...((item.meta as object) ?? {}),
        installCommands: {
          pnpm: `pnpm dlx shadcn@latest add ${BASE_URL}/r/${name}.json`,
          npm: `npx shadcn@latest add ${BASE_URL}/r/${name}.json`,
          yarn: `yarn shadcn@latest add ${BASE_URL}/r/${name}.json`,
          bun: `bunx --bun shadcn@latest add ${BASE_URL}/r/${name}.json`,
        },
      },
    };
    writeItemJson(name, payload);
  }

  // Write group (combined) JSONs
  console.log("\n📦  Combined groups:\n");
  for (const [groupName, itemNames] of Object.entries(GROUPS)) {
    try {
      const combined = buildCombined(groupName, itemNames, resolvedItems);
      writeItemJson(groupName, combined);
    } catch (err) {
      console.error(`\n✖  Failed to build group "${groupName}":`, err);
      process.exit(1);
    }
  }

  console.log("\n✅  Registry build complete!\n");
}

main();
