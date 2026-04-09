export type BlocksCategoryMetadata = {
  id: string;
  name: string;
  thumbnail?: string;
  thumbnailCustomClasses?: string;
  count: string;
  hasCharts?: boolean;
};

export type BlocksMetadata = {
  id: string;
  category: string;
  name: string;
  iframeHeight?: string;
  type: "file" | "directory";
  hasAnimation?: boolean;
};

export const categoryIds: { [key: string]: string } = {
  // FormLayout: "form-layout",
  // Login: "login",
  // GridList: "grid-list",
  OnHover: "on-hover",
  Footer: "footer",
};
