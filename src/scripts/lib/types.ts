// Registry types based on the shadcn registry schema
export interface RegistryItem {
  $schema?: string;
  name: string;
  type: RegistryItemType;
  description?: string;
  title?: string;
  author?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  tailwind?: {
    config?: {
      content?: string[];
      theme?: Record<string, any>;
      plugins?: string[];
    };
  };
  cssVars?: {
    theme?: Record<string, string>;
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  css?: Record<string, any>;
  envVars?: Record<string, string>;
  meta?: Record<string, any>;
  docs?: string;
  categories?: string[];
  extends?: string;
}

export interface RegistryFile {
  path: string;
  content?: string;
  type: RegistryItemType;
  target?: string;
}

export type RegistryItemType =
  | "registry:lib"
  | "registry:block"
  | "registry:component"
  | "registry:ui"
  | "registry:hook"
  | "registry:theme"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:item";

export interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

export interface BlockMetadata {
  id: string;
  category: string;
  name: string;
  iframeHeight?: string;
  type: "file" | "directory";
}

export interface FileInfo {
  absolutePath: string;
  relativePath: string;
  sourcePathRelative: string;
  targetPath: string;
  type: RegistryItemType;
  content?: string;
}

export interface DependencyInfo {
  registryDependencies: string[];
  dependencies: string[];
}

export interface BlockInfo {
  id: string;
  title: string;
  description: string;
  category: string;
  files: FileInfo[];
  dependencies: DependencyInfo;
}

export interface GeneratorConfig {
  componentsDir: string;
  metadataFile: string;
  outputFile: string;
  individualOutputDir: string;
  author: string;
  schema: string;
  itemSchema: string;
  homepage: string;
  name: string;
}
