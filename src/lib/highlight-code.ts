import { createHighlighter } from "shiki";

let highlighterInstance: Awaited<ReturnType<typeof createHighlighter>> | null =
  null;
let highlighterPromise: Promise<
  Awaited<ReturnType<typeof createHighlighter>>
> | null = null;

async function getHighlighter() {
  if (highlighterInstance) return highlighterInstance;

  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      // themes: ["github-light", "github-dark"],
      themes: ["light-plus", "dark-plus"],
      langs: ["javascript", "typescript", "tsx", "jsx", "html", "css"],
    });
  }

  highlighterInstance = await highlighterPromise;
  return highlighterInstance;
}

export async function highlightCode(
  code: string,
  theme: "light" | "dark" = "dark",
  lang: string = "tsx",
) {
  const highlighter = await getHighlighter();

  const html = highlighter.codeToHtml(code, {
    lang,
    theme: theme === "dark" ? "dark-plus" : "light-plus",
    transformers: [
      {
        line(node) {
          node.properties = node.properties || {};
          node.properties["class"] = "line";
        },
      },
    ],
  });

  return html;
}
