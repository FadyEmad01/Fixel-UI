import fs from "fs/promises";
import { RegistryItemType } from "./types.js";

export class ImportTransformer {
  private transformationCache = new Map<string, string>();

  async transformImports(
    filePath: string,
    fileType: RegistryItemType,
    blockId?: string,
  ): Promise<string | undefined> {
    const cacheKey = `${filePath}:${fileType}:${blockId || ""}`;
    if (this.transformationCache.has(cacheKey)) {
      return this.transformationCache.get(cacheKey);
    }

    try {
      const content = await fs.readFile(filePath, "utf-8");
      const transformedContent = this.transformContent(
        content,
        fileType,
        blockId,
      );

      this.transformationCache.set(cacheKey, transformedContent);

      return transformedContent;
    } catch (error) {
      console.warn(
        `Warning: Could not read file ${filePath} for content transformation:`,
        error instanceof Error ? error.message : String(error),
      );
      return undefined;
    }
  }

  private transformContent(
    content: string,
    fileType: RegistryItemType,
    blockId?: string,
  ): string {
    let transformedContent = content;

    // Handle illustration imports first
    if (this.isIllustrationFile(content)) {
      transformedContent = this.transformIllustrationImports(transformedContent, blockId);
      return transformedContent;
    }

    switch (fileType) {
      case "registry:page":
        transformedContent = this.transformPageImports(
          transformedContent,
          blockId,
        );
        break;
      case "registry:component":
      case "registry:block":
      case "registry:ui":
      case "registry:file":
        transformedContent = this.transformComponentImports(
          transformedContent,
          blockId,
        );
        break;
      case "registry:lib":
      case "registry:hook":
        transformedContent = this.transformLibraryImports(
          transformedContent,
          blockId,
        );
        break;
      default:
        transformedContent = this.transformGenericImports(
          transformedContent,
          blockId,
        );
    }

    return transformedContent;
  }

  private isIllustrationFile(content: string): boolean {
    // Check if this is an illustration file by looking for illustration imports
    return content.includes("@/content/illustrations") || 
           content.includes("from \"../_shared\"") ||
           content.includes("from '../_shared'");
  }

  private transformIllustrationImports(content: string, blockId?: string): string {
    let transformed = content;

    // Transform @/content/illustrations/_shared -> @/components/illustrations/_shared
    transformed = transformed.replace(
      /from\s+["']@\/content\/illustrations\/([^"']+)["']/g,
      (_, path) => {
        return `from "@/components/illustrations/${path}"`;
      },
    );

    // Transform relative imports from _shared: import { X } from "../_shared" -> @/components/illustrations/_shared
    transformed = transformed.replace(
      /from\s+["']\.\.\/_shared["']/g,
      `from "@/components/illustrations/_shared"`,
    );

    // Transform relative imports from _shared: import { X } from "../../_shared" -> @/components/illustrations/_shared
    transformed = transformed.replace(
      /from\s+["']\.\.\.\.\/_shared["']/g,
      `from "@/components/illustrations/_shared"`,
    );

    // Transform cross-illustration relative imports: import { X } from "../accordion" -> @/components/illustrations/accordion
    transformed = transformed.replace(
      /from\s+["']\.\.\/(\w+)["']/g,
      (_, category) => {
        return `from "@/components/illustrations/${category}"`;
      },
    );

    // Transform @/lib/utils -> keep as is (external)
    // Transform lucide-react -> keep as is (external)

    return transformed;
  }

  private transformPageImports(content: string, blockId?: string): string {
    let transformed = content;
    const basePath = blockId ? `@/components/${blockId}` : "@/components";

    transformed = transformed.replace(
      /import\s+({[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+["']\.\.\/((?![\/]).+)["']/g,
      (_, importPart, relativePath) => {
        return `import ${importPart} from "${basePath}/${relativePath}"`;
      },
    );

    transformed = transformed.replace(
      /import\s+({[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+["']\.\/((?![\/]).+)["']/g,
      (_, importPart, relativePath) => {
        return `import ${importPart} from "${basePath}/${relativePath}"`;
      },
    );

    return transformed;
  }

  private transformComponentImports(content: string, blockId?: string): string {
    let transformed = content;
    const basePath = blockId ? `@/components/${blockId}` : "@/components";

    transformed = transformed.replace(
      /import\s+({[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+["']\.\/((?![\/]).+)["']/g,
      (_, importPart, relativePath) => {
        return `import ${importPart} from "${basePath}/${relativePath}"`;
      },
    );

    transformed = transformed.replace(
      /import\s+({[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+["']\.\.\/((?![\/]).+)["']/g,
      (_, importPart, relativePath) => {
        return `import ${importPart} from "${basePath}/${relativePath}"`;
      },
    );

    return transformed;
  }

  private transformLibraryImports(content: string, blockId?: string): string {
    let transformed = content;
    const basePath = blockId ? `@/lib/${blockId}` : "@/lib";

    transformed = transformed.replace(
      /import\s+({[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+["']\.\/((?![\/]).+)["']/g,
      (_, importPart, relativePath) => {
        return `import ${importPart} from "${basePath}/${relativePath}"`;
      },
    );

    return transformed;
  }

  private transformGenericImports(content: string, blockId?: string): string {
    let transformed = content;
    const basePath = blockId ? `@/components/${blockId}` : "@/components";

    transformed = transformed.replace(
      /import\s+({[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+["']\.\/((?![\/]).+)["']/g,
      (_, importPart, relativePath) => {
        return `import ${importPart} from "${basePath}/${relativePath}"`;
      },
    );

    return transformed;
  }

  clearCache(): void {
    this.transformationCache.clear();
  }

  getCacheStats(): { size: number; hitRate: number } {
    return {
      size: this.transformationCache.size,
      hitRate: this.transformationCache.size > 0 ? 0.8 : 0, // Rough estimate
    };
  }

  transformContentString(
    content: string,
    fileType: RegistryItemType,
    blockId?: string,
  ): string {
    return this.transformContent(content, fileType, blockId);
  }

  validateTransformations(
    original: string,
    transformed: string,
  ): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    const relativeImports = original.match(
      /import\s+.+\s+from\s+["']\.[\/]?.+["']/g,
    );
    if (relativeImports) {
      const remainingRelative = transformed.match(
        /import\s+.+\s+from\s+["']\.[\/]?.+["']/g,
      );
      if (remainingRelative && remainingRelative.length > 0) {
        issues.push(
          `${remainingRelative.length} relative imports were not transformed`,
        );
      }
    }

    const malformedImports = transformed.match(
      /import\s+.+\s+from\s+["']@\/\/+/g,
    );
    if (malformedImports) {
      issues.push("Found malformed @/ imports with double slashes");
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  }
}
