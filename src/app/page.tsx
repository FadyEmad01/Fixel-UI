import { Footer_01 } from "@/components/registry/blocks/footer-01/page";
import Footer_02 from "@/components/registry/blocks/footer-02/page";
import { InstallTabs } from "@/components/site/components/install-tabs";
import { OpenInV0 } from "@/components/site/components/open-in-v0";
import { baseUrl } from "@/constants/site";

// ─── Component registry entries shown on this page ───────────────────────────

const components = [
  {
    name: "footer-01",
    title: "Footer 01",
    description:
      "A modern footer with navigation sections, social links, and branding.",
    preview: <Footer_01 />,
  },
  {
    name: "footer-02",
    title: "Footer 02",
    description:
      "A footer with social links, navigation columns, a large logo watermark, and a glowing accent.",
    preview: <Footer_02 />,
  },
];

function buildCommands(name: string) {
  const url = `${baseUrl}/r/${name}.json`;
  return {
    pnpm: `pnpm dlx shadcn@latest add ${url}`,
    npm: `npx shadcn@latest add ${url}`,
    yarn: `yarn shadcn@latest add ${url}`,
    bun: `bunx --bun shadcn@latest add ${url}`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Fixel UI</h1>
        <p className="text-muted-foreground">
          Open-source components you can drop straight into your project via the
          shadcn CLI.
        </p>
      </header>

      {/* Component list */}
      <main className="flex flex-col flex-1 gap-12">
        {components.map((comp) => {
          const commands = buildCommands(comp.name);
          const registryUrl = `${baseUrl}/r/${comp.name}.json`;

          return (
            <section
              key={comp.name}
              className="flex flex-col gap-4 border rounded-xl p-5"
            >
              {/* Title row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold">{comp.title}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {comp.description}
                  </p>
                </div>
                <OpenInV0 registryUrl={registryUrl} className="shrink-0 mt-0.5" />
              </div>

              {/* Install commands */}
              <InstallTabs commands={commands} />

              {/* Live preview */}
              <div className="border rounded-lg overflow-hidden bg-background min-h-[300px] flex items-center justify-center">
                {comp.preview}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
