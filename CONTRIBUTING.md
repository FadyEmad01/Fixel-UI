# Contributing to Fixel UI

Thank you for considering a contribution! This guide explains everything you need to know to get started, add components, and open a pull request that will be merged quickly.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Adding a New Component](#adding-a-new-component)
- [Registry Rules](#registry-rules)
- [Pull Request Checklist](#pull-request-checklist)
- [Commit Style](#commit-style)

---

## Code of Conduct

Be kind, constructive, and patient. We are all here to build great open-source software.

---

## Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 20 |
| pnpm | ≥ 9 |

### Fork & clone

```bash
# 1 — fork the repo on GitHub, then:
git clone https://github.com/<your-username>/fixel-ui.git
cd fixel-ui

# 2 — install deps
pnpm install

# 3 — start the dev server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) — you should see the component showcase.

---

## Project Structure

```
fixel-ui/
├── public/r/                     # ← AUTO-GENERATED — do not edit by hand
│   ├── footer-01.json
│   └── footer.json
├── src/
│   ├── app/page.tsx              # Showcase page (update when adding components)
│   ├── components/
│   │   ├── registry/
│   │   │   ├── blocks/           # Page-level blocks (footers, heroes, etc.)
│   │   │   └── ui/               # Primitive components (button, input, etc.)
│   │   └── site/
│   │       └── components/       # Install tabs, Open in v0, etc.
│   ├── constants/site.ts         # `baseUrl` — used for install commands
│   ├── registry/
│   │   ├── schema.ts             # Registry TypeScript types
│   │   ├── <category>.ts         # Per-category registry definitions
│   │   └── index.ts              # Aggregates everything
│   └── scripts/
│       └── build-registry.ts     # Generates public/r/*.json
└── registry.json                 # shadcn CLI manifest
```

### Key rules

- **`public/r/`** is auto-generated. Never commit hand-edited JSON there.  
  Always run `pnpm registry:generate` to regenerate it.
- **`src/constants/site.ts`** exports `baseUrl` — the install commands pick this up automatically.
- **One component per file** inside `registry/blocks/<name>/page.tsx`.

---

## Adding a New Component

Follow these steps exactly (in order).

### 1 — Create the component file

Place your component at:

```
src/components/registry/blocks/<category>-<number>/page.tsx
```

**Example:** `src/components/registry/blocks/footer-03/page.tsx`

Rules:
- Default export **or** named export — both work.
- Only import from:
  - `react`
  - `next/*`
  - `@/lib/utils` (`cn` helper)
  - Other **registry** components (`@/components/registry/ui/…`)
  - npm packages already in `dependencies` (see `package.json`)
- **No server-only imports** (`fs`, `path`, etc.) — components must be renderable client-side.
- Keep the component self-contained — no external API calls.

### 2 — Register the component

Open the relevant category file (e.g. `src/registry/footer.ts`) and add an entry:

```ts
{
  name: "footer-03",
  type: "registry:block",
  title: "Footer 03",
  description: "Short description of what makes this footer unique.",
  files: [
    {
      path: "registry/blocks/footer-03/page.tsx",
      type: "registry:page",
      target: "components/fixel/footer-03.tsx",
    },
  ],
  // Add if your component uses other registry items (e.g. button):
  // registryDependencies: ["button"],
  categories: ["footer", "marketing"],
},
```

> If you are adding a **new category** (e.g. `hero`), create `src/registry/hero.ts` and import it in `src/registry/index.ts`.

### 3 — Update `registry.json`

Add a matching entry to `registry.json` at the root (used by the shadcn CLI):

```json
{
  "name": "footer-03",
  "type": "registry:block",
  "title": "Footer 03",
  "description": "…",
  "files": [
    {
      "path": "src/components/registry/blocks/footer-03/page.tsx",
      "type": "registry:page",
      "target": "components/fixel/footer-03.tsx"
    }
  ],
  "categories": ["footer", "marketing"]
}
```

### 4 — Add it to the showcase page

Open `src/app/page.tsx` and add your component to the `components` array:

```ts
{
  name: "footer-03",
  title: "Footer 03",
  description: "…",
  preview: <Footer_03 />,
},
```

Import the component at the top of the file.

### 5 — Add it to the right group in the build script

Open `src/scripts/build-registry.ts` and add your component name to the appropriate group in the `GROUPS` object:

```ts
const GROUPS: Record<string, string[]> = {
  footer: ["footer-01", "footer-02", "footer-03"], // ← add here
};
```

### 6 — Regenerate the registry

```bash
pnpm registry:generate
```

Check that new files appeared in `public/r/` and that they have `content` embedded inside each file entry.

### 7 — Verify locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and make sure your component renders correctly and the install tabs show the right commands.

---

## Registry Rules

These rules ensure every component installs cleanly for end users.

| Rule | Why |
|---|---|
| **No relative imports** between components | Users install individual files — relative paths break. |
| **No `.env` / secret usage** | Registry components are public. |
| **No hard-coded URLs** | Use `baseUrl` from `@/constants/site`. |
| **Tailwind only** (no custom CSS files) | Keeps the install clean and dependency-free. |
| **`"use client"`** if needed | Add at the top for interactive components. |
| **Self-contained** | Don't import local data files or images not hosted publicly. |

---

## Pull Request Checklist

Before opening your PR, make sure every item is checked:

- [ ] Component file lives at `src/components/registry/blocks/<name>/page.tsx`
- [ ] Entry added to the correct `src/registry/<category>.ts` file
- [ ] Entry added to `registry.json`
- [ ] Component added to the showcase in `src/app/page.tsx`
- [ ] Group updated in `src/scripts/build-registry.ts`
- [ ] `pnpm registry:generate` ran successfully
- [ ] `public/r/<name>.json` committed (with embedded `content`)
- [ ] `pnpm dev` shows the component rendering correctly
- [ ] No TypeScript / lint errors (`pnpm lint`)

---

## Commit Style

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(footer): add footer-03 with newsletter section
fix(registry): resolve missing content in footer-02.json
docs: update CONTRIBUTING with new group step
chore: regenerate registry JSONs
```

| Prefix | Use for |
|---|---|
| `feat` | New component or feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Tooling, scripts, registry rebuild |
| `style` | Formatting, no logic change |
| `refactor` | Refactoring without behavior change |

---

**Thank you for contributing to Fixel UI! 🎉**

If you have any questions, open a [GitHub Discussion](https://github.com/FadyEmad01/fixel-ui/discussions) or drop a comment on your PR.
