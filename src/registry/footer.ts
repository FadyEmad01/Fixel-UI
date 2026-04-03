import type { Registry } from "./schema";

export const footer: Registry["items"] = [
  {
    name: "footer-01",
    type: "registry:block",
    title: "Footer 01",
    description:
      "A modern footer with navigation sections, social links, and branding.",
    files: [
      {
        path: "registry/blocks/footer-01/page.tsx",
        type: "registry:page",
        target: "components/fixel/footer-01.tsx",
      },
    ],
    categories: ["footer", "marketing"],
  },
  {
    name: "footer-02",
    type: "registry:block",
    title: "Footer 02",
    description:
      "A footer with social links, navigation columns, a large logo watermark, and a glowing accent.",
    files: [
      {
        path: "registry/blocks/footer-02/page.tsx",
        type: "registry:page",
        target: "components/fixel/footer-02.tsx",
      },
    ],
    registryDependencies: ["button"],
    categories: ["footer", "marketing"],
  },
];
