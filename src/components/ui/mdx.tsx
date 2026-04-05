import { cn } from "@/lib/utils";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

const components = {
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      data-line-numbers
      className={cn(
        "relative rounded-lg bg-muted/30 dark:border dark:border-accent py-4 font-mono text-base",
        className
      )}
      {...props}
    />
  ),
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, {}]],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
