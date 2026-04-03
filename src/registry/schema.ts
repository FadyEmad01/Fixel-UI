/**
 * Registry schema types — mirrors the shadcn registry JSON schema.
 * https://ui.shadcn.com/schema/registry.json
 */

export type RegistryItemType =
  | "registry:block"
  | "registry:component"
  | "registry:ui"
  | "registry:hook"
  | "registry:lib"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme";

export interface RegistryFile {
  path: string;
  type: RegistryItemType;
  /** Where the file should land in the user's project (relative to cwd) */
  target?: string;
  content?: string;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  title?: string;
  description?: string;
  author?: string;
  /** npm package dependencies */
  dependencies?: string[];
  /** devDependencies */
  devDependencies?: string[];
  /** other registry items this block depends on */
  registryDependencies?: string[];
  files: RegistryFile[];
  categories?: string[];
  tags?: string[];
  meta?: Record<string, unknown>;
  docs?: string;
}

export interface Registry {
  $schema?: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}
