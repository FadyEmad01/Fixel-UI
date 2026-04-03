import type { Registry } from "./schema";
import { footer } from "./footer";

export const registry: Registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "fixel-ui",
  homepage: "https://fixel-ui.vercel.app",
  items: [...footer],
};
