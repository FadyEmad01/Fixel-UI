import { Footer } from '@/components/footer';
import { BlocksMetadata, categoryIds } from "./declarations";

export const blocksMetadata: BlocksMetadata[] = [
  {
    id: "on-hover-01",
    category: categoryIds.OnHover,
    name: "Apple Folder hover animation",
    iframeHeight: "500px",
    type: "file",
    hasAnimation: true,
  },

  {
    id: "footer-01",
    category: categoryIds.Footer,
    name: "Footer with background masked image and gradient",
    iframeHeight: "500px",
    type: "file",
    hasAnimation: false,
  },
];
