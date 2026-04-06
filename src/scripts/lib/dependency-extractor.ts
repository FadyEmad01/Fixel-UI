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
    if (moduleSpecifier.startsWith("@src/components/ui/")) {
      const componentName = moduleSpecifier.split("/").pop();
      if (componentName) {
        registryDeps.add(componentName);
      }
      return;
    }

    if (moduleSpecifier.startsWith("./") || moduleSpecifier.startsWith("../")) {
      return;
    }

    if (moduleSpecifier.startsWith("@/")) {
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

  cleanup(): void {
    for (const sourceFile of this.project.getSourceFiles()) {
      this.project.removeSourceFile(sourceFile);
    }
  }
}
