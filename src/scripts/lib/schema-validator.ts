import { Registry, RegistryFile, RegistryItem } from "./types";

export class SchemaValidator {
  validateRegistry(registry: Registry): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    this.validateRegistryProperties(registry, errors, warnings);

    if (Array.isArray(registry.items)) {
      registry.items.forEach((item, index) => {
        this.validateRegistryItem(item, index, errors, warnings);
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      summary: {
        totalItems: registry.items?.length || 0,
        errorCount: errors.length,
        warningCount: warnings.length,
      },
    };
  }

  private validateRegistryProperties(
    registry: Registry,
    errors: string[],
    warnings: string[]
  ): void {
    if (!registry.$schema || typeof registry.$schema !== "string") {
      errors.push("Registry must have a valid $schema property");
    }

    if (!registry.name || typeof registry.name !== "string") {
      errors.push("Registry must have a valid name property");
    }

    if (!registry.homepage || typeof registry.homepage !== "string") {
      errors.push("Registry must have a valid homepage property");
    }

    if (!Array.isArray(registry.items)) {
      errors.push("Registry items must be an array");
    }

    if (registry.$schema && !registry.$schema.includes("registry.json")) {
      warnings.push(
        "Registry $schema should point to the shadcn registry schema"
      );
    }

    if (registry.homepage && !this.isValidUrl(registry.homepage)) {
      warnings.push("Registry homepage should be a valid URL");
    }
  }

  private validateRegistryItem(
    item: RegistryItem,
    index: number,
    errors: string[],
    warnings: string[]
  ): void {
    const itemContext = `Item "${item.name || `at index ${index}`}"`;

    if (!item.name || typeof item.name !== "string") {
      errors.push(`${itemContext}: name is required and must be a string`);
    }

    if (!item.type || typeof item.type !== "string") {
      errors.push(`${itemContext}: type is required and must be a string`);
    }

    const validTypes = [
      "registry:lib",
      "registry:block",
      "registry:component",
      "registry:ui",
      "registry:hook",
      "registry:theme",
      "registry:page",
      "registry:file",
      "registry:style",
      "registry:item",
    ];

    if (item.type && !validTypes.includes(item.type)) {
      errors.push(
        `${itemContext}: invalid type "${
          item.type
        }". Must be one of: ${validTypes.join(", ")}`
      );
    }

    if (!Array.isArray(item.files)) {
      errors.push(`${itemContext}: files must be an array`);
    } else if (item.files.length === 0) {
      errors.push(`${itemContext}: files array cannot be empty`);
    } else {
      item.files.forEach((file, fileIndex) => {
        this.validateRegistryFile(
          file,
          fileIndex,
          itemContext,
          errors,
          warnings
        );
      });
    }

    this.validateOptionalItemProperties(item, itemContext, errors, warnings);

    this.validateDependencies(item, itemContext, errors, warnings);
  }

  private validateRegistryFile(
    file: RegistryFile,
    fileIndex: number,
    itemContext: string,
    errors: string[],
    warnings: string[]
  ): void {
    const fileContext = `${itemContext} file at index ${fileIndex}`;

    if (!file.path || typeof file.path !== "string") {
      errors.push(`${fileContext}: path is required and must be a string`);
    }

    if (!file.type || typeof file.type !== "string") {
      errors.push(`${fileContext}: type is required and must be a string`);
    }

    const validFileTypes = [
      "registry:lib",
      "registry:block",
      "registry:component",
      "registry:ui",
      "registry:hook",
      "registry:theme",
      "registry:page",
      "registry:file",
      "registry:style",
      "registry:item",
    ];

    if (file.type && !validFileTypes.includes(file.type)) {
      errors.push(`${fileContext}: invalid type "${file.type}"`);
    }

    if (file.type === "registry:file" || file.type === "registry:page") {
      if (!file.target || typeof file.target !== "string") {
        errors.push(
          `${fileContext}: target is required for type "${file.type}"`
        );
      }
    }

    if (file.path) {
      if (file.path.includes("\\")) {
        warnings.push(
          `${fileContext}: path should use forward slashes, not backslashes`
        );
      }

      if (file.path.startsWith("/")) {
        warnings.push(
          `${fileContext}: path should not start with a forward slash`
        );
      }
    }

    if (file.content !== undefined && typeof file.content !== "string") {
      errors.push(`${fileContext}: content must be a string when provided`);
    }
  }

  private validateOptionalItemProperties(
    item: RegistryItem,
    itemContext: string,
    errors: string[],
    warnings: string[]
  ): void {
    const stringProps = ["description", "title", "author", "docs", "extends"];
    stringProps.forEach((prop) => {
      const value = (item as any)[prop];
      if (value !== undefined && typeof value !== "string") {
        errors.push(`${itemContext}: ${prop} must be a string when provided`);
      }
    });

    const arrayProps = [
      "dependencies",
      "devDependencies",
      "registryDependencies",
      "categories",
    ];
    arrayProps.forEach((prop) => {
      const value = (item as any)[prop];
      if (value !== undefined) {
        if (!Array.isArray(value)) {
          errors.push(`${itemContext}: ${prop} must be an array when provided`);
        } else {
          value.forEach((element, index) => {
            if (typeof element !== "string") {
              errors.push(`${itemContext}: ${prop}[${index}] must be a string`);
            }
          });
        }
      }
    });

    if (item.tailwind !== undefined && typeof item.tailwind !== "object") {
      errors.push(`${itemContext}: tailwind must be an object when provided`);
    }

    if (item.cssVars !== undefined && typeof item.cssVars !== "object") {
      errors.push(`${itemContext}: cssVars must be an object when provided`);
    }

    if (item.css !== undefined && typeof item.css !== "object") {
      errors.push(`${itemContext}: css must be an object when provided`);
    }

    if (item.envVars !== undefined && typeof item.envVars !== "object") {
      errors.push(`${itemContext}: envVars must be an object when provided`);
    }

    if (item.meta !== undefined && typeof item.meta !== "object") {
      errors.push(`${itemContext}: meta must be an object when provided`);
    }
  }

  private validateDependencies(
    item: RegistryItem,
    itemContext: string,
    errors: string[],
    warnings: string[]
  ): void {
    if (item.dependencies) {
      item.dependencies.forEach((dep) => {
        if (dep.startsWith("@/")) {
          warnings.push(
            `${itemContext}: dependency "${dep}" looks like an internal import, should be external package`
          );
        }

        if (dep.includes("./") || dep.includes("../")) {
          warnings.push(
            `${itemContext}: dependency "${dep}" looks like a relative import, should be external package`
          );
        }
      });
    }

    if (item.registryDependencies) {
      item.registryDependencies.forEach((dep) => {
        if (dep.startsWith("http://")) {
          warnings.push(
            `${itemContext}: registry dependency "${dep}" uses HTTP instead of HTTPS`
          );
        }
      });
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  generateReport(validation: ValidationResult): string {
    const lines: string[] = [];

    lines.push("Registry Validation Report");
    lines.push("=".repeat(25));
    lines.push("");

    lines.push(`Total Items: ${validation.summary.totalItems}`);
    lines.push(`Errors: ${validation.summary.errorCount}`);
    lines.push(`Warnings: ${validation.summary.warningCount}`);
    lines.push(`Status: ${validation.isValid ? "✅ VALID" : "❌ INVALID"}`);
    lines.push("");

    if (validation.errors.length > 0) {
      lines.push("Errors:");
      lines.push("-------");
      validation.errors.forEach((error) => {
        lines.push(`❌ ${error}`);
      });
      lines.push("");
    }

    if (validation.warnings.length > 0) {
      lines.push("Warnings:");
      lines.push("---------");
      validation.warnings.forEach((warning) => {
        lines.push(`⚠️  ${warning}`);
      });
      lines.push("");
    }

    if (validation.isValid) {
      lines.push("🎉 Registry is valid and ready to use!");
    } else {
      lines.push("❌ Registry has errors that must be fixed before use.");
    }

    return lines.join("\n");
  }
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  summary: {
    totalItems: number;
    errorCount: number;
    warningCount: number;
  };
}
