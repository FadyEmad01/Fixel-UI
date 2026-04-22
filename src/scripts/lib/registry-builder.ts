import fs from "fs/promises";
import path from "path";
import { DependencyExtractor } from "./dependency-extractor";
import { FileScanner } from "./file-scanner";
import { MetadataLoader } from "./metadata-loader";
import {
  BlockInfo,
  BlockMetadata,
  FileInfo,
  GeneratorConfig,
  Registry,
  RegistryItem,
} from "./types";

export class RegistryBuilder {
  private config: GeneratorConfig;
  private metadataLoader: MetadataLoader;
  private fileScanner: FileScanner;
  private dependencyExtractor: DependencyExtractor;

  constructor(
    config: GeneratorConfig,
    metadataLoader: MetadataLoader,
    fileScanner: FileScanner,
    dependencyExtractor: DependencyExtractor,
  ) {
    this.config = config;
    this.metadataLoader = metadataLoader;
    this.fileScanner = fileScanner;
    this.dependencyExtractor = dependencyExtractor;
  }

  async buildRegistry(): Promise<Registry> {
    console.log("Building registry...");

    const metadataMap = await this.metadataLoader.loadMetadata();
    const blocks = await this.discoverBlocks(metadataMap);
    const illustrations = await this.discoverIllustrations();
    
    const blockItems = await this.buildRegistryItems(blocks, metadataMap);
    const illustrationItems = await this.buildIllustrationRegistryItems(illustrations);
    
    const allItems = [...blockItems, ...illustrationItems];

    const registry: Registry = {
      $schema: this.config.schema,
      name: this.config.name,
      homepage: this.config.homepage,
      items: allItems.sort((a, b) => a.name.localeCompare(b.name)),
    };

    console.log(`✓ Built registry with ${allItems.length} items (${blockItems.length} blocks, ${illustrationItems.length} illustrations)`);
    return registry;
  }

  private async discoverBlocks(
    metadataMap: Map<string, BlockMetadata>,
  ): Promise<BlockInfo[]> {
    console.log("Discovering blocks...");

    const blocks: BlockInfo[] = [];
    const categories = await this.fileScanner.listCategories();

    console.log(
      `Found ${categories.length} categories: ${categories.join(", ")}`,
    );

    for (const category of categories) {
      const categoryPath = path.join(
        path.resolve(this.config.componentsDir),
        category,
      );
      const entries = await this.fileScanner.listCategoryEntries(categoryPath);

      console.log(`  ${category}: ${entries.length} entries`);

      for (const entryName of entries) {
        try {
          const { blockId, entryPath, isDirectory } =
            await this.fileScanner.getBlockEntry(categoryPath, entryName);

          const { title, metadata } = this.metadataLoader.getBlockMetadata(
            blockId,
            metadataMap,
          );
          const description = `A ${title.toLowerCase()} block.`;

          const files = await this.fileScanner.scanBlock(
            entryPath,
            isDirectory,
            blockId,
          );

          if (files.length === 0) {
            console.warn(`Warning: No files found for block ${blockId}`);
            continue;
          }

          const filePaths = files.map((f) => f.absolutePath);
          const dependencies =
            this.dependencyExtractor.extractFromFiles(filePaths);

          const blockInfo: BlockInfo = {
            id: blockId,
            title,
            description,
            category,
            files,
            dependencies,
          };

          blocks.push(blockInfo);
        } catch (error) {
          console.error(
            `Error processing block ${entryName} in category ${category}:`,
            error instanceof Error ? error.message : String(error),
          );
        }
      }
    }

    console.log(`✓ Discovered ${blocks.length} blocks`);
    return blocks;
  }

  private async discoverIllustrations(): Promise<BlockInfo[]> {
    console.log("Discovering illustrations...");

    const illustrations: BlockInfo[] = [];
    const illustrationsDir = path.join(process.cwd(), "src/content/illustrations");
    
    try {
      const categories = await this.fileScanner.listCategories();
      const categoriesSet = new Set(categories);
      
      const illustrationFiles = await this.fileScanner.scanIllustrations(illustrationsDir);
      
      // Group files by category
      const filesByCategory = new Map<string, FileInfo[]>();
      for (const file of illustrationFiles) {
        const parts = file.targetPath.split("/");
        const categoryIndex = parts.indexOf("illustrations");
        if (categoryIndex !== -1 && parts[categoryIndex + 1]) {
          const category = parts[categoryIndex + 1];
          if (!filesByCategory.has(category)) {
            filesByCategory.set(category, []);
          }
          filesByCategory.get(category)!.push(file);
        }
      }
      
      for (const [category, files] of filesByCategory) {
        if (category === "_shared") {
          // Shared components get their own registry items
          for (const file of files) {
            const fileName = path.basename(file.absolutePath, path.extname(file.absolutePath));
            const illustrationId = `illustration-${fileName.replace("illustration-", "").replace("-illustration", "")}`;
            
            const filePaths = files.map((f) => f.absolutePath);
            const dependencies = this.dependencyExtractor.extractFromFiles(filePaths);
            
            const illustrationInfo: BlockInfo = {
              id: illustrationId,
              title: this.formatIllustrationName(illustrationId),
              description: `A shared illustration component for ${illustrationId.replace("illustration-", "")}.`,
              category: "illustration-shared",
              files: [file],
              dependencies,
            };
            
            illustrations.push(illustrationInfo);
          }
        } else {
          // Category illustrations
          const illustrationId = `${category}-illustration`;
          
          // Use the illustration-specific dependency extraction for each file
          const allRegistryDeps = new Set<string>();
          const allExternalDeps = new Set<string>();
          
          for (const file of files) {
            const deps = this.dependencyExtractor.extractIllustrationDependencies(file.absolutePath);
            deps.registryDependencies.forEach((dep) => allRegistryDeps.add(dep));
            deps.dependencies.forEach((dep) => allExternalDeps.add(dep));
          }
          
          const dependencies = {
            registryDependencies: Array.from(allRegistryDeps).sort(),
            dependencies: Array.from(allExternalDeps).sort(),
          };
          
          const illustrationInfo: BlockInfo = {
            id: illustrationId,
            title: this.formatIllustrationName(category),
            description: `An illustration for the ${category} category.`,
            category: category,
            files,
            dependencies,
          };
          
          illustrations.push(illustrationInfo);
        }
      }
    } catch (error) {
      console.warn(
        "Warning: Failed to scan illustrations:",
        error instanceof Error ? error.message : String(error),
      );
    }

    console.log(`✓ Discovered ${illustrations.length} illustration items`);
    return illustrations;
  }

  private formatIllustrationName(category: string): string {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private async buildIllustrationRegistryItems(
    illustrations: BlockInfo[],
  ): Promise<RegistryItem[]> {
    console.log("Building illustration registry items...");

    const registryItems: RegistryItem[] = [];

    for (const illustration of illustrations) {
      try {
        const registryItem = this.buildIllustrationRegistryItem(illustration);
        registryItems.push(registryItem);
      } catch (error) {
        console.error(
          `Error building registry item for illustration ${illustration.id}:`,
          error instanceof Error ? error.message : String(error),
        );
      }
    }

    console.log(`✓ Built ${registryItems.length} illustration registry items`);
    return registryItems;
  }

  private buildIllustrationRegistryItem(illustration: BlockInfo): RegistryItem {
    const registryFiles = illustration.files.map((file) =>
      this.buildRegistryFile(file),
    );

    const isShared = illustration.category === "illustration-shared";
    const type = isShared ? "registry:component" : "registry:component";
    const categories = isShared ? ["illustration-shared"] : ["illustration", illustration.category];

    // Transform registry dependencies for category illustrations
    let registryDependencies = illustration.dependencies.registryDependencies;
    if (!isShared) {
      // Convert illustration-* dependencies to full URLs for category illustrations
      registryDependencies = registryDependencies.map((dep) => {
        if (dep.startsWith("illustration-")) {
          return `${this.config.homepage}/r/${dep}.json`;
        }
        return dep;
      });
    }

    const registryItem: RegistryItem = {
      name: illustration.id,
      type,
      title: illustration.title,
      description: illustration.description,
      author: this.config.author,
      registryDependencies,
      dependencies: illustration.dependencies.dependencies,
      files: registryFiles,
      categories,
    };

    return registryItem;
  }

  private async buildRegistryItems(
    blocks: BlockInfo[],
    metadataMap: Map<string, BlockMetadata>,
  ): Promise<RegistryItem[]> {
    console.log("Building registry items...");

    const registryItems: RegistryItem[] = [];

    for (const block of blocks) {
      try {
        const registryItem = this.buildRegistryItem(block, metadataMap);
        registryItems.push(registryItem);
      } catch (error) {
        console.error(
          `Error building registry item for block ${block.id}:`,
          error instanceof Error ? error.message : String(error),
        );
      }
    }

    return registryItems;
  }

  private buildRegistryItem(
    block: BlockInfo,
    metadataMap: Map<string, BlockMetadata>,
  ): RegistryItem {
    const registryFiles = block.files.map((file) =>
      this.buildRegistryFile(file),
    );

    const registryItem: RegistryItem = {
      name: block.id,
      type: "registry:block",
      title: block.title,
      description: block.description,
      author: this.config.author,
      registryDependencies: block.dependencies.registryDependencies,
      dependencies: block.dependencies.dependencies,
      files: registryFiles,
    };

    const metadata = metadataMap.get(block.id);
    if (metadata) {
      if (metadata.category) {
        registryItem.categories = [metadata.category];
      }
    }

    return registryItem;
  }

  private buildRegistryFile(fileInfo: FileInfo) {
    const registryFile: any = {
      path: fileInfo.sourcePathRelative,
      type: fileInfo.type,
      target: fileInfo.targetPath,
    };

    if (fileInfo.content !== undefined) {
      registryFile.content = fileInfo.content;
    }

    return registryFile;
  }

  async writeRegistry(registry: Registry): Promise<void> {
    console.log("Writing registry files...");

    await fs.writeFile(
      this.config.outputFile,
      JSON.stringify(registry, null, 2),
    );

    console.log(`✓ Wrote main registry to ${this.config.outputFile}`);

    await fs.mkdir(this.config.individualOutputDir, { recursive: true });

    let writtenCount = 0;
    for (const item of registry.items) {
      try {
        const individualItem = {
          $schema: this.config.itemSchema,
          ...item,
        };

        const filename = `${item.name}.json`;
        const filepath = path.join(this.config.individualOutputDir, filename);

        await fs.writeFile(filepath, JSON.stringify(individualItem, null, 2));
        writtenCount++;
      } catch (error) {
        console.error(
          `Error writing individual registry file for ${item.name}:`,
          error instanceof Error ? error.message : String(error),
        );
      }
    }

    console.log(
      `✓ Wrote ${writtenCount} individual registry files to ${this.config.individualOutputDir}/`,
    );
  }

  validateRegistry(registry: Registry): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!registry.name) {
      errors.push("Registry name is required");
    }

    if (!registry.homepage) {
      errors.push("Registry homepage is required");
    }

    if (!Array.isArray(registry.items)) {
      errors.push("Registry items must be an array");
      return { isValid: false, errors, warnings };
    }

    const itemNames = new Set<string>();

    for (const [index, item] of registry.items.entries()) {
      if (itemNames.has(item.name)) {
        errors.push(`Duplicate item name "${item.name}" found`);
      } else {
        itemNames.add(item.name);
      }

      if (!item.name) {
        errors.push(`Item at index ${index} is missing name`);
      }

      if (!item.type) {
        errors.push(`Item "${item.name}" is missing type`);
      }

      if (!Array.isArray(item.files) || item.files.length === 0) {
        errors.push(`Item "${item.name}" has no files`);
      }

      for (const [fileIndex, file] of (item.files || []).entries()) {
        if (!file.path) {
          errors.push(
            `Item "${item.name}" file at index ${fileIndex} is missing path`,
          );
        }

        if (!file.type) {
          errors.push(
            `Item "${item.name}" file at index ${fileIndex} is missing type`,
          );
        }
      }

      if (!item.description) {
        warnings.push(`Item "${item.name}" is missing description`);
      }

      if (
        !item.registryDependencies ||
        item.registryDependencies.length === 0
      ) {
        if (!item.dependencies || item.dependencies.length === 0) {
          warnings.push(
            `Item "${item.name}" has no dependencies - this might be unusual`,
          );
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}
