# Contributing

We welcome contributions to our project! This guide will help you get started with development and contributing to the blocks registry.

## Development

### Prerequisites

- **Node.js 18+** - Required for Next.js

### Getting Started

1. Fork the repository on GitHub.

2. Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/blocks.git
   cd blocks
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The development server will be available at `http://localhost:3000`.

### Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Build the project
npm run start            # Start production server

# Registry Management
npm run generate:registry    # Generate registry.json
npm run generate:markdown    # Generate MDX documentation
npm run validate:registry    # Validate registry structure

# Code Quality
npm run lint         # Lint codebase with Biome
```

### Project Structure

```
fixel-ui/
├── app/                    # Next.js app router pages
├── components/             # Shared UI components
├── content/
│   ├── components/         # Block implementations
│   ├── markdown/           # Generated MDX docs
│   ├── blocks-metadata.ts  # Block registry metadata
│   └── blocks-categories.tsx # Category definitions
├── lib/                    # Utility functions
├── public/
│   └── r/                  # Registry JSON files
├── scripts/                # Build and generation scripts
└── registry.json           # Main registry file
```

### Adding New Block

We'd love your block contributions! To keep the library well-organized, we ask that you **add blocks to existing categories** rather than creating new ones. If you have ideas for a new category, feel free to open an issue to discuss it with the maintainers.

Existing categories can be found in `content/blocks-categories.tsx`.

1. **Create the component** in `content/components/{category}/{block-id}.tsx`
2. **Register metadata** in `content/blocks-metadata.ts`
3. **Map the component** in `content/blocks-components.tsx`
4. **Export from category** in `content/components/{category}/index.ts`
5. **Generate registry** with `npm run generate:registry`

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines.

## Contributing Process

1. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b your-branch-name
   ```

2. Make your changes to the codebase.

3. Build and test the project:

   ```bash
   npm run build
   ```

4. Test the application to ensure your changes work as expected.

5. Run linting to ensure code quality:

   ```bash
   npm run lint
   ```

6. Commit your changes:

   ```bash
   git commit -m "Your descriptive commit message"
   ```

7. Push your changes to your fork:

   ```bash
   git push -u origin your-branch-name
   ```

8. Open a pull request on the original repository.

Thank you for contributing to our project!
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
