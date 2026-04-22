<p align="center">
  <img src="./public/og-image.png" alt="Fixel UI Banner" width="100%" />
</p>

<h1 align="center">Fixel UI</h1>

<p align="center">
  <strong>Building blocks for the modern web</strong><br/>
  Production-ready React components built with TypeScript, Tailwind CSS, and shadcn/ui
</p>

<p align="center">
  <a href="https://fixel-ui.vercel.app"><strong>🌐 Live Demo</strong></a> ·
  <a href="#-quick-start"><strong>⚡ Quick Start</strong></a> ·
  <a href="#-documentation"><strong>📚 Docs</strong></a> ·
  <a href="./CONTRIBUTING.md"><strong>🤝 Contributing</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/FadyEmad01/fixel-ui?style=flat&color=yellow" alt="GitHub Stars" />
  <img src="https://img.shields.io/github/forks/FadyEmad01/fixel-ui?style=flat" alt="GitHub Forks" />
  <img src="https://img.shields.io/github/license/FadyEmad01/fixel-ui" alt="License" />
  <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss" alt="Tailwind CSS" />
</p>

---

## ✨ What is Fixel UI?

**Fixel UI** is a [shadcn/ui](https://ui.shadcn.com)-compatible component registry offering production-ready building blocks for modern web applications. Unlike traditional component libraries, Fixel UI provides:

- **No lock-in** — Components live in *your* project, not as npm dependencies
- **Full ownership** — Copy, modify, and extend every component
- **TypeScript-first** — Fully typed components with excellent DX
- **Zero runtime overhead** — No wrapper libraries or unnecessary abstractions
- **Automatic dependency detection** — Smart imports that just work

Install any component with a single command using the shadcn CLI, or copy-paste directly into your project.

---

## 📦 What's Included

Fixel UI contains **60+ components** organized into two distinct types:

### 🧩 Blocks (`registry:block`)

Full UI components that users install into their projects. These are the building blocks of your application.

| Category | Count | Description |
|----------|-------|-------------|
| **Footer** | 1 | Landing page footers with various layouts and styles |
| **On Hover** | 1 | Interactive hover animations and effects |

### 🎨 Illustrations (`registry:component`)

Visual category thumbnails used for the registry homepage. These provide visual representations of UI component categories.

**40+ illustrations available:**

- **Form Elements**: button-illustration, input-illustration, textarea-illustration, select-illustration, checkbox-illustration, radio-illustration, switch-illustration
- **Layout**: card-illustration, sheet-illustration, dialog-illustration, drawer-illustration, popover-illustration
- **Navigation**: breadcrumb-illustration, tabs-illustration, pagination-illustration, command-illustration, menu-illustration
- **Feedback**: alert-illustration, badge-illustration, toast-illustration, skeleton-illustration, spinner-illustration
- **Data Display**: table-illustration, avatar-illustration, calendar-illustration, chart-illustration
- **Overlays**: modal-illustration, tooltip-illustration, hover-card-illustration, preview-card-illustration
- **And more**: accordion-illustration, collapsible-illustration, separator-illustration, slider-illustration, progress-illustration

---

## 🚀 Quick Start

### Prerequisites

Ensure your project has [shadcn/ui](https://ui.shadcn.com/docs/installation) initialized:

```bash
npx shadcn@latest init
```

### Installation Examples

#### Example 1: Block (File Type)

Install a single-file component (like `footer-01`):

```bash
npx shadcn@latest add https://fixel-ui.vercel.app/r/footer-01.json
```

**What gets installed:**
- `components/footer-01.tsx` — The component file
- Automatically detects and installs dependencies (`@tabler/icons-react`)

**Usage:**

```tsx
import Footer01 from "@/components/footer-01";

export default function Page() {
  return (
    <main>
      <h1>My Page</h1>
      <Footer01 />
    </main>
  );
}
```

#### Example 2: Block (Directory Type)

Install a complex multi-file component:

```bash
npx shadcn@latest add https://fixel-ui.vercel.app/r/complex-dashboard.json
```

**What gets installed:**
- `components/complex-dashboard/` — Directory containing:
  - `index.tsx` — Main component
  - `header.tsx` — Sub-component
  - `sidebar.tsx` — Sub-component
  - `utils.ts` — Shared utilities

**When to use directory type:**
- Complex components with multiple sub-components
- Components that need shared utilities or hooks
- Large components that would be unwieldy in a single file

#### Example 3: Illustration

Install a visual thumbnail for category previews:

```bash
npx shadcn@latest add https://fixel-ui.vercel.app/r/button-illustration.json
```

**What gets installed:**
- `components/illustrations/button/button-illustration.tsx`

**Note:** Illustrations are visual components used for the registry homepage. Most users install **Blocks**, not illustrations.

---

## 📋 Available Components by Category

### Footer

| Component | Description | Install Command |
|-----------|-------------|-----------------|
| `footer-01` | Background masked image with gradient overlay | `npx shadcn@latest add https://fixel-ui.vercel.app/r/footer-01.json` |

### On Hover

| Component | Description | Install Command |
|-----------|-------------|-----------------|
| `on-hover-01` | Apple-inspired folder hover animation with smooth transitions | `npx shadcn@latest add https://fixel-ui.vercel.app/r/on-hover-01.json` |

### Illustrations (Visual Category Thumbnails)

Install any illustration to use in your own component showcase:

```bash
# Form elements
npx shadcn@latest add https://fixel-ui.vercel.app/r/button-illustration.json
npx shadcn@latest add https://fixel-ui.vercel.app/r/input-illustration.json
npx shadcn@latest add https://fixel-ui.vercel.app/r/checkbox-illustration.json

# Layout
npx shadcn@latest add https://fixel-ui.vercel.app/r/card-illustration.json
npx shadcn@latest add https://fixel-ui.vercel.app/r/dialog-illustration.json
npx shadcn@latest add https://fixel-ui.vercel.app/r/sheet-illustration.json

# Navigation
npx shadcn@latest add https://fixel-ui.vercel.app/r/tabs-illustration.json
npx shadcn@latest add https://fixel-ui.vercel.app/r/breadcrumb-illustration.json
npx shadcn@latest add https://fixel-ui.vercel.app/r/command-illustration.json

# See all available illustrations at https://fixel-ui.vercel.app
```

---

## 🛠️ Tech Stack

- **[Next.js](https://nextjs.org)** — React framework with App Router
- **[React](https://react.dev)** — UI library (v19 with React Compiler)
- **[TypeScript](https://typescriptlang.org)** — Type-safe development
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first styling (v4)
- **[shadcn/ui](https://ui.shadcn.com)** — Component architecture
- **[Base UI](https://base-ui.com)** — Headless UI primitives
- **[Biome](https://biomejs.dev)** — Linting and formatting
- **[Motion](https://motion.dev)** — Animations

---

## 🏗️ Project Structure

```
fixel-ui/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (blocks)/           # Block showcase pages
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── header.tsx          # Site header
│   │   ├── footer.tsx          # Site footer
│   │   └── ...
│   │
│   ├── content/
│   │   ├── components/         # Block implementations
│   │   │   ├── footer/
│   │   │   │   ├── footer-01.tsx
│   │   │   │   └── index.ts
│   │   │   ├── on-hover/
│   │   │   │   ├── on-hover-01.tsx
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   │
│   │   ├── illustrations/      # Visual category thumbnails
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   └── ...
│   │   │
│   │   ├── blocks-metadata.ts  # Block registry metadata
│   │   ├── blocks-components.tsx # Component mappings
│   │   ├── blocks-categories.tsx # Category definitions
│   │   └── declarations.ts     # TypeScript declarations
│   │
│   ├── lib/
│   │   ├── utils.ts            # Utility functions
│   │   ├── category-thumbnails.tsx # Category thumbnail components
│   │   └── thumbnails/         # Thumbnail SVG components
│   │
│   ├── scripts/                # Build and generation scripts
│   │   ├── generate-registry.ts
│   │   ├── add-category.ts
│   │   ├── add-block.ts
│   │   └── lib/
│   │
│   └── style/
│       └── globals.css         # Global styles
│
├── public/
│   └── r/                      # Registry JSON files (generated)
│       ├── footer-01.json
│       ├── on-hover-01.json
│       ├── button-illustration.json
│       └── ...
│
├── components.json             # shadcn/ui configuration
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies and scripts
├── README.md                 # This file
└── CONTRIBUTING.md           # Contribution guidelines
```

---

## 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/FadyEmad01/fixel-ui.git
cd fixel-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the component showcase.

### 4. Regenerate the registry (after making changes)

```bash
npm run generate:registry
```

This reads all component sources and generates fresh `public/r/*.json` registry files.

---

## 📚 Documentation

### For Users
- **[Installation Guide](#-quick-start)** — How to install components
- **[Component Reference](#-available-components-by-category)** — Available blocks and illustrations

### For Contributors
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — Comprehensive contribution guide
- **[Architecture Overview](./CONTRIBUTING.md#-understanding-component-types)** — How the registry works
- **[Adding Components](./CONTRIBUTING.md#-adding-a-new-block-existing-category)** — Step-by-step component creation

---

## 🤝 Contributing

We welcome contributions of all kinds — new blocks, bug fixes, documentation improvements, and more!

👉 **[Read the Contributing Guide](./CONTRIBUTING.md)**

### Quick contribution workflow:

```bash
# 1. Fork and clone
git clone https://github.com/your-username/fixel-ui.git
cd fixel-ui

# 2. Install and start dev server
npm install
npm run dev

# 3. Make your changes, then regenerate registry
npm run generate:registry

# 4. Run linting
npm run lint

# 5. Commit and push
git add .
git commit -m "feat(footer): add footer-02 with newsletter"
git push origin main
```

---

## 🎯 Roadmap

- [ ] Add more footer variants
- [ ] Hero section blocks
- [ ] Pricing table blocks
- [ ] Testimonial/carousel blocks
- [ ] Dashboard layout blocks
- [ ] Form layout blocks
- [ ] Authentication pages

Have a suggestion? [Open a discussion](https://github.com/FadyEmad01/fixel-ui/discussions)!

---

## 📄 License

[MIT](./LICENSE) © Fady Emad

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/FadyEmad01">Fady Emad</a>
</p>
<p align="center">
  <a href="https://fixel-ui.vercel.app">fixel-ui.vercel.app</a>
</p>
