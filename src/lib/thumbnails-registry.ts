import registry from "./thumbnails-registry.generated.json";

export type ComponentDependency =
  | { type: "component"; name: string }
  | { type: "library"; name: string }
  | { type: "utility"; name: string };

export type ComponentInfo = {
  name: string;
  category: string;
  description: string;
  code: string;
  dependencies: ComponentDependency[];
  files: string[];
};

const componentRegistry = registry as Record<string, ComponentInfo>;

export function getComponentInfo(slug: string): ComponentInfo | null {
  return componentRegistry[slug] ?? null;
}

export function getAllDependencies(slug: string): ComponentDependency[] {
  return componentRegistry[slug]?.dependencies ?? [];
}

export function getComponentFiles(slug: string): string[] {
  return componentRegistry[slug]?.files ?? [];
}
