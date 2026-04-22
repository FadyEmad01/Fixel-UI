import { Project, SourceFile } from "ts-morph";
import { DependencyInfo } from "./types.js";

export class DependencyExtractor {
  private project: Project;

  constructor() {
    this.project = new Project();
  }

  extractDependencies(filePath: string): DependencyInfo {
    const registryDeps = new Set<string>();
    const externalDeps = new Set<string>();

    try {
      let sourceFile: SourceFile;

      const existingFile = this.project.getSourceFile(filePath);
      if (existingFile) {
        sourceFile = existingFile;
      } else {
        sourceFile = this.project.addSourceFileAtPath(filePath);
      }

      const importDeclarations = sourceFile.getImportDeclarations();

      for (const importDecl of importDeclarations) {
        const moduleSpecifier = importDecl.getModuleSpecifierValue();

        this.categorizeImport(moduleSpecifier, registryDeps, externalDeps);
      }
    } catch (error) {
      console.warn(
        `Warning: Failed to parse ${filePath} for dependencies:`,
        error instanceof Error ? error.message : String(error),
      );
    }

    return {
      registryDependencies: Array.from(registryDeps).sort(),
      dependencies: Array.from(externalDeps).sort(),
    };
  }

  private categorizeImport(
    moduleSpecifier: string,
    registryDeps: Set<string>,
    externalDeps: Set<string>,
  ): void {
    // Fix: @/components/ui/ -> shadcn/ui registry component dependency
    if (moduleSpecifier.startsWith("@/components/ui/")) {
      const componentName = moduleSpecifier.split("/").pop();
      if (componentName) {
        registryDeps.add(componentName);
      }
      return;
    }

    // Legacy: @src/components/ui/ (for backwards compatibility)
    if (moduleSpecifier.startsWith("@src/components/ui/")) {
      const componentName = moduleSpecifier.split("/").pop();
      if (componentName) {
        registryDeps.add(componentName);
      }
      return;
    }

    // Shared illustration components -> registry dependency (illustration- prefix)
    if (moduleSpecifier.includes("illustrations/_shared")) {
      // Extract the component name from the import, e.g.:
      // import { IllustrationCard } from "../_shared"
      // This will be handled by scanning imports more carefully
      return;
    }

    // Cross-illustration dependencies -> registry dependency
    if (moduleSpecifier.startsWith("@/content/illustrations/")) {
      // Extract category, e.g.: @/content/illustrations/accordion
      const parts = moduleSpecifier.split("/");
      const categoryIndex = parts.indexOf("illustrations");
      if (categoryIndex !== -1 && parts[categoryIndex + 1]) {
        const category = parts[categoryIndex + 1];
        registryDeps.add(`${category}-illustration`);
      }
      return;
    }

    // Relative imports within illustrations (e.g., "../_shared")
    if (moduleSpecifier.includes("/_shared") || moduleSpecifier.includes("/_shared/")) {
      // These will be resolved by the FileScanner to determine exact deps
      return;
    }

    if (moduleSpecifier.startsWith("./") || moduleSpecifier.startsWith("../")) {
      return;
    }

    if (moduleSpecifier.startsWith("@/") && !moduleSpecifier.startsWith("@/content/illustrations/")) {
      return;
    }

    if (this.isBuiltinModule(moduleSpecifier)) {
      return;
    }

    if (!moduleSpecifier.startsWith(".") && !moduleSpecifier.startsWith("/")) {
      const packageName = this.extractPackageName(moduleSpecifier);
      if (packageName) {
        externalDeps.add(packageName);
      }
    }
  }

  private isBuiltinModule(moduleSpecifier: string): boolean {
    const builtinModules = new Set([
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",

      "next",
      "next/app",
      "next/document",
      "next/head",
      "next/image",
      "next/link",
      "next/navigation",
      "next/router",
      "next/script",

      ...Array.from({ length: 20 }, (_, i) => `next/dist/${i}`),

      "fs",
      "fs/promises",
      "path",
      "crypto",
      "util",
      "os",
      "stream",
      "events",
      "buffer",
      "url",
      "querystring",
      "http",
      "https",
      "zlib",
      "assert",
    ]);

    if (builtinModules.has(moduleSpecifier)) {
      return true;
    }

    const builtinPrefixes = ["@next/", "react/", "next/"];

    return builtinPrefixes.some((prefix) => moduleSpecifier.startsWith(prefix));
  }

  private extractPackageName(moduleSpecifier: string): string | null {
    if (moduleSpecifier.startsWith("@")) {
      const parts = moduleSpecifier.split("/");
      if (parts.length >= 2) {
        return `${parts[0]}/${parts[1]}`;
      }
      return parts[0];
    }

    const parts = moduleSpecifier.split("/");
    return parts[0];
  }

  extractFromFiles(filePaths: string[]): DependencyInfo {
    const allRegistryDeps = new Set<string>();
    const allExternalDeps = new Set<string>();

    for (const filePath of filePaths) {
      const deps = this.extractDependencies(filePath);

      deps.registryDependencies.forEach((dep) => allRegistryDeps.add(dep));
      deps.dependencies.forEach((dep) => allExternalDeps.add(dep));
    }

    return {
      registryDependencies: Array.from(allRegistryDeps).sort(),
      dependencies: Array.from(allExternalDeps).sort(),
    };
  }

  /**
   * Extract illustration dependencies from a file.
   * This looks for imports from _shared directory and cross-illustration imports.
   */
  extractIllustrationDependencies(filePath: string): DependencyInfo {
    const registryDeps = new Set<string>();
    const externalDeps = new Set<string>();

    try {
      let sourceFile: SourceFile;

      const existingFile = this.project.getSourceFile(filePath);
      if (existingFile) {
        sourceFile = existingFile;
      } else {
        sourceFile = this.project.addSourceFileAtPath(filePath);
      }

      const importDeclarations = sourceFile.getImportDeclarations();

      for (const importDecl of importDeclarations) {
        const moduleSpecifier = importDecl.getModuleSpecifierValue();

        // Handle shared illustration components
        if (moduleSpecifier.includes("/_shared") || moduleSpecifier.includes("/_shared/")) {
          const namedImports = importDecl.getNamedImports();
          for (const namedImport of namedImports) {
            const name = namedImport.getName();
            // Map IllustrationXxx -> illustration-xxx shared component
            if (name.startsWith("Illustration")) {
              const baseName = name.replace("Illustration", "").toLowerCase();
              registryDeps.add(`illustration-${baseName}`);
            }
          }
          continue;
        }

        // Handle lucide-react icons
        if (moduleSpecifier === "lucide-react") {
          const namedImports = importDecl.getNamedImports();
          for (const namedImport of namedImports) {
            externalDeps.add("lucide-react");
          }
          continue;
        }

        // Handle cross-illustration imports
        if (moduleSpecifier.startsWith("@/content/illustrations/")) {
          const parts = moduleSpecifier.split("/");
          const categoryIndex = parts.indexOf("illustrations");
          if (categoryIndex !== -1 && parts[categoryIndex + 1]) {
            const category = parts[categoryIndex + 1];
            // Add the illustration as a registry dependency
            registryDeps.add(`${category}-illustration`);
          }
          continue;
        }

        // Handle relative imports from other illustrations (e.g., "../accordion")
        if (moduleSpecifier.startsWith("../") && !moduleSpecifier.includes("/_shared")) {
          const category = moduleSpecifier.replace("../", "").replace("/", "");
          if (category && category !== "..") {
            registryDeps.add(`${category}-illustration`);
          }
          continue;
        }

        // Fall back to standard categorization
        this.categorizeImport(moduleSpecifier, registryDeps, externalDeps);
      }
    } catch (error) {
      console.warn(
        `Warning: Failed to parse ${filePath} for illustration dependencies:`,
        error instanceof Error ? error.message : String(error),
      );
    }

    return {
      registryDependencies: Array.from(registryDeps).sort(),
      dependencies: Array.from(externalDeps).sort(),
    };
  }

  cleanup(): void {
    for (const sourceFile of this.project.getSourceFiles()) {
      this.project.removeSourceFile(sourceFile);
    }
  }
}
