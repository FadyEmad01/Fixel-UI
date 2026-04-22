# Contributing to Fixel UI

Thank you for your interest in contributing to Fixel UI! This guide will walk you through everything you need to know to contribute effectively.

## Table of Contents

- [Quick Start](#-quick-start)
- [Understanding Component Types](#-understanding-component-types)
- [Adding a New Block](#-adding-a-new-block-existing-category)
- [Adding a New Category](#-adding-a-new-category)
- [Code Style Guidelines](#-code-style-guidelines)
- [Available Scripts](#-available-scripts-reference)
- [Troubleshooting](#-troubleshooting)
- [Pull Request Checklist](#-pull-request-checklist)
- [Need Help?](#-need-help)

---

## 🎯 Quick Start

### Prerequisites

- **Node.js 18+** — Required for Next.js 15
- **npm** — Package manager (included with Node.js)
- **Git** — Version control

### Setup

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/fixel-ui.git
cd fixel-ui

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The development server will be available at [http://localhost:3000](http://localhost:3000).

---

## 📚 Understanding Component Types

Fixel UI has **three distinct component types**. Understanding these is crucial for contributing.

### Overview Table

| Type | Registry Type | Use Case | Output Location | Install Command |
|------|---------------|----------|-----------------|-----------------|
| **Block (File)** | `registry:block` | Single, self-contained component | `components/name.tsx` | `npx shadcn add .../name.json` |
| **Block (Directory)** | `registry:block` | Complex component with sub-components | `components/name/` folder | `npx shadcn add .../name.json` |
| **Illustration** | `registry:component` | Visual category thumbnail | `components/illustrations/` | `npx shadcn add .../name.json` |

---

### 🧩 Blocks (`registry:block`)

**What are Blocks?**

Blocks are full UI components that users install into their projects. These are the main product of Fixel UI — production-ready, copy-paste components.

**Examples:**
- Footer blocks
- Hero sections
- Pricing tables
- Dashboard layouts

**When users install a block:**
```bash
npx shadcn@latest add https://fixel-ui.vercel.app/r/footer-01.json
```

The component is copied to their project at `components/footer-01.tsx` (or `components/footer-01/` for directory type).

---

### 📁 Block: File Type

**When to use File Type:**

- Component is self-contained
- No shared utilities or sub-components needed
- Single export (default or named)
- Simple, focused functionality

**Example file structure:**
```
src/content/components/footer/footer-01.tsx
```

**Generated registry installs to:**
```
components/footer-01.tsx
```

**Use File Type when:**
✅ Component is under ~200 lines  
✅ No internal sub-components  
✅ No shared utilities needed  
✅ Single, focused purpose  

**Don't use File Type when:**
❌ Component has multiple logical parts  
❌ Needs shared hooks or utilities  
❌ Complex internal state management  

---

### 📂 Block: Directory Type

**When to use Directory Type:**

- Component has multiple sub-components
- Needs shared utilities, hooks, or types
- Complex internal architecture
- Multiple exports needed

**Example file structure:**
```
src/content/components/dashboard/
├── dashboard-01/
│   ├── index.tsx          # Main component
│   ├── header.tsx         # Sub-component
│   ├── sidebar.tsx        # Sub-component
│   ├── widgets/
│   │   ├── chart.tsx
│   │   └── stats.tsx
│   └── utils.ts           # Shared utilities
```

**Generated registry installs to:**
```
components/dashboard-01/
├── index.tsx
├── header.tsx
├── sidebar.tsx
├── widgets/
│   ├── chart.tsx
│   └── stats.tsx
└── utils.ts
```

**Use Directory Type when:**
✅ Component has clear sub-components  
✅ Needs shared utilities or hooks  
✅ Would be unwieldy as a single file (>300 lines)  
✅ Multiple exports from the same "concept"  

**Don't use Directory Type when:**
❌ It's a simple, single-purpose component  
❌ Would create unnecessary complexity  

---

### 🎨 Illustrations (`registry:component`)

**What are Illustrations?**

Illustrations are **visual category thumbnails** used on the Fixel UI homepage. They provide a visual representation of what each category contains.

**Example:** The "Button" category has a `button-illustration` that shows a stylized button preview.

**Key differences from Blocks:**

| Aspect | Blocks | Illustrations |
|--------|--------|---------------|
| **Purpose** | User installs into their project | Visual thumbnail for registry homepage |
| **Registry Type** | `registry:block` | `registry:component` |
| **Target Audience** | End users building apps | Registry browsers |
| **Install Location** | `components/` | `components/illustrations/` |
| **Usage** | Functional UI components | Visual previews |

**When contributing Illustrations:**

Most contributors focus on **Blocks**. Illustrations are typically added when:
- Creating a new category
- Updating category visuals
- Adding visual polish to the registry

**Illustration structure:**
```
src/content/illustrations/button/
├── button-illustration.tsx
└── index.ts
```

---

## 🆕 Adding a New Block (Existing Category)

Follow these steps to add a new block to an existing category.

### Step 1: Decide File vs Directory Type

**Decision flowchart:**

```
Is the component simple and self-contained?
├── YES → Use File Type
│         └── src/content/components/{category}/{id}.tsx
│
└── NO → Use Directory Type
          └── src/content/components/{category}/{id}/
              └── index.tsx
              └── (other files)
```

**Quick rules:**
- Under 200 lines → File type
- Multiple sub-components → Directory type
- Needs shared utilities → Directory type

---

### Step 2: Create Component

#### Option A: File Type Block

Create file: `src/content/components/{category}/{block-id}.tsx`

**Example:** Creating `footer-02` in the `footer` category

```bash
# File: src/content/components/footer/footer-02.tsx
```

**Template:**

```tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Footer02() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Your component content */}
          <p className="text-muted-foreground">
            © 2024 Your Company. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost">Privacy</Button>
            <Button variant="ghost">Terms</Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

#### Option B: Directory Type Block

Create directory: `src/content/components/{category}/{block-id}/`

**Example:** Creating `dashboard-01` in a `dashboard` category

```bash
# Directory: src/content/components/dashboard/dashboard-01/
```

**Structure:**

```
dashboard-01/
├── index.tsx          # Main component (REQUIRED)
├── header.tsx         # Sub-component
├── sidebar.tsx        # Sub-component
└── utils.ts           # Shared utilities (optional)
```

**index.tsx template:**

```tsx
import { DashboardHeader } from "./header";
import { DashboardSidebar } from "./sidebar";

export default function Dashboard01() {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          {/* Dashboard content */}
        </main>
      </div>
    </div>
  );
}
```

**header.tsx:**

```tsx
export function DashboardHeader() {
  return (
    <header className="h-16 border-b flex items-center px-6">
      <h1 className="font-semibold">Dashboard</h1>
    </header>
  );
}
```

**sidebar.tsx:**

```tsx
export function DashboardSidebar() {
  return (
    <aside className="w-64 border-r p-4">
      {/* Sidebar navigation */}
    </aside>
  );
}
```

---

### Step 3: Register Metadata

Edit: `src/content/blocks-metadata.ts`

Add a new entry to the `blocksMetadata` array:

```typescript
import { BlocksMetadata, categoryIds } from "./declarations";

export const blocksMetadata: BlocksMetadata[] = [
  // ... existing entries ...
  
  {
    id: "footer-02",           // Unique ID (kebab-case)
    category: categoryIds.Footer,  // Category reference
    name: "Minimal footer with newsletter",  // Display name
    iframeHeight: "400px",     // Preview height (optional)
    type: "file",              // "file" or "directory"
    hasAnimation: false,       // true if component has animations
  },
];
```

**Field reference:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier (kebab-case) |
| `category` | `string` | ✅ | Category ID from `categoryIds` |
| `name` | `string` | ✅ | Human-readable display name |
| `iframeHeight` | `string` | ❌ | Preview height (e.g., "400px") |
| `type` | `"file" \| "directory"` | ✅ | Component structure type |
| `hasAnimation` | `boolean` | ❌ | Whether component uses animations |

---

### Step 4: Export from Category

Edit: `src/content/components/{category}/index.ts`

Add an export for your new component:

```typescript
// Existing exports
export { default as Footer01 } from "./footer-01";

// Add new export
export { default as Footer02 } from "./footer-02";
// For directory type:
// export { default as Dashboard01 } from "./dashboard-01";
```

---

### Step 5: Update Components Registry

Edit: `src/content/blocks-components.tsx`

Add the component to the registry mapping:

```typescript
import * as components from "@/content/components";

export const blocksComponents: Record<string, React.ComponentType> = {
  // ... existing mappings ...
  "footer-02": components.Footer02,
  "dashboard-01": components.Dashboard01,
};
```

---

### Step 6: Generate Registry

Run the registry generator to create the JSON files:

```bash
npm run generate:registry
```

This will:
- Read all component sources
- Extract dependencies automatically
- Generate `public/r/{block-id}.json` files
- Validate against shadcn registry schema

**Expected output:**
```
🚀 Starting registry generation...
📁 Components directory: src/content/components
📋 Metadata file: src/content/blocks-metadata.ts
📤 Output file: public/r/registry.json
✅ Registry validation passed

📊 Generation Summary:
   • Total items: 65
   • Total files: 65
   • Duration: 2.45s

🎉 Registry generation completed successfully!
```

---

### Step 7: Verify Locally

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open [http://localhost:3000](http://localhost:3000)**

3. **Navigate to your category** and verify:
   - Component renders correctly
   - Preview shows properly
   - Installation tabs show correct commands

4. **Test the install command:**
   ```bash
   # In a test project
   npx shadcn@latest add http://localhost:3000/r/your-block.json
   ```

---

## 🗂️ Adding a New Category

Creating a new category involves more steps than adding a block. You can use the helper script or do it manually.

### Option 1: Using the Helper Script (Recommended)

```bash
npx tsx src/scripts/add-category.ts "Category Name"
```

**Example:**
```bash
npx tsx src/scripts/add-category.ts "Hero Sections"
```

**What the script does:**

1. **Updates `src/content/declarations.ts`**
   - Adds category ID to `categoryIds` object
   - Example: `HeroSections: "hero-sections"`

2. **Creates thumbnail file**
   - Creates: `src/lib/thumbnails/hero-sections.tsx`
   - Template SVG component for category preview

3. **Updates `src/content/blocks-categories.tsx`**
   - Adds import for new thumbnail
   - Adds category to `preblocksCategoriesMetadata` array

4. **Creates directories:**
   - `src/content/components/hero-sections/`
   - `src/content/markdown/hero-sections/`

5. **Creates category index.ts**
   - `src/content/components/hero-sections/index.ts`

6. **Updates main components index**
   - Adds export to `src/content/components/index.ts`

**After running the script:**

```bash
🎉 Successfully added category "Hero Sections"!

Next steps:
1. Update the SVG content in src/lib/thumbnails/hero-sections.tsx
2. Add blocks to this category using: npx tsx src/scripts/add-block.ts
```

---

### Option 2: Manual Setup

If you prefer full control, follow these manual steps:

#### Step 1: Add Category ID

Edit: `src/content/declarations.ts`

```typescript
export const categoryIds: { [key: string]: string } = {
  // ... existing categories ...
  OnHover: "on-hover",
  Footer: "footer",
  HeroSections: "hero-sections",  // Add your new category
};
```

**Naming convention:**
- Use PascalCase for the key: `HeroSections`
- Use kebab-case for the value: `"hero-sections"`

---

#### Step 2: Create Thumbnail Component

Create: `src/lib/thumbnails/hero-sections.tsx`

```typescript
import { JSX, SVGProps } from "react";

export const HeroSectionsThumbnail = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg width="296" height="141" viewBox="0 0 296 141" fill="none" {...props}>
    {/* Your custom SVG content */}
    <rect x="20" y="20" width="256" height="40" rx="8" fill="#8952E0" />
    <rect x="40" y="70" width="216" height="51" rx="4" fill="#E0E0E0" />
  </svg>
);
```

**Tips for thumbnails:**
- Keep it simple and representative
- Use the brand color (`#8952E0`) for primary elements
- Size: 296x141px

---

#### Step 3: Update Categories Registry

Edit: `src/content/blocks-categories.tsx`

Add import:
```typescript
import { HeroSectionsThumbnail } from "@/lib/thumbnails/hero-sections";
```

Add to metadata array:
```typescript
const preblocksCategoriesMetadata: Omit<BlocksCategoryMetadata, "count">[] = [
  // ... existing categories ...
  {
    id: categoryIds.HeroSections,
    name: "Hero Sections",
    thumbnail: HeroSectionsThumbnail,
    hasCharts: false,
    thumbnailCustomClasses: "w-8/12",
  },
];
```

---

#### Step 4: Create Directories

```bash
mkdir -p src/content/components/hero-sections
mkdir -p src/content/markdown/hero-sections
```

---

#### Step 5: Create Category Index

Create: `src/content/components/hero-sections/index.ts`

```typescript
// Export your components here
// Example:
// export { default as Hero01 } from "./hero-01";
// export { default as Hero02 } from "./hero-02";
```

---

#### Step 6: Update Main Index

Edit: `src/content/components/index.ts`

```typescript
export * from "./on-hover";
export * from "./footer";
export * from "./hero-sections";  // Add this line
```

---

#### Step 7: Regenerate Registry

```bash
npm run generate:registry
```

---

## 📝 Code Style Guidelines

### Component Structure

**File Organization:**
```tsx
// 1. Imports (React first, then Next.js, then libraries, then local)
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

// 2. Types (if needed)
interface Props {
  title: string;
}

// 3. Helper functions (optional)
function formatDate(date: Date) {
  return date.toLocaleDateString();
}

// 4. Main component (default export for blocks)
export default function Footer02() {
  // Component logic
  return (
    // JSX
  );
}
```

---

### Import Rules

**✅ Allowed imports:**
- `react` and `react/*`
- `next/*` (Next.js built-ins)
- `@/lib/utils` (the `cn` helper)
- `@/components/ui/*` (UI primitives)
- `@/components/illustrations/*` (other illustrations)
- Any npm package in `dependencies` (see `package.json`)

**❌ Not allowed:**
- Server-only imports (`fs`, `path`, `child_process`)
- Relative imports between components (`../other-component`)
- Hard-coded file paths or URLs
- `.env` variables or secrets

---

### Styling Rules

**✅ Use Tailwind CSS:**
```tsx
// ✅ Good
<div className="flex items-center gap-4 p-6 bg-background">

// ❌ Bad - no custom CSS files
<div className="custom-footer">
```

**✅ Use CSS variables for theming:**
```tsx
// ✅ Good
<div className="bg-background text-foreground border-border">

// ❌ Bad - hard-coded colors
<div className="bg-white text-black border-gray-200">
```

**✅ Use `cn()` for conditional classes:**
```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  size === "lg" && "text-lg"
)}>
```

---

### Export Rules

**Blocks must use default export:**
```tsx
// ✅ Correct for blocks
export default function Footer02() {
  return <footer>...</footer>;
}

// ❌ Don't use named exports for blocks
export function Footer02() { ... }
```

**Illustrations can use named exports:**
```tsx
// ✅ Correct for illustrations
export function ButtonIllustration() {
  return <svg>...</svg>;
}
```

---

### Animation Guidelines

**When to set `hasAnimation: true` in metadata:**
- Component uses `motion` from Motion
- Component uses CSS animations
- Component has hover/scroll-triggered animations
- Any non-static visual effects

**Performance tips:**
- Use `transform` and `opacity` for animations (GPU accelerated)
- Add `will-change` sparingly
- Respect `prefers-reduced-motion`:

```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  // Respects user's motion preferences
/>
```

---

## 🔧 Available Scripts Reference

| Script | Purpose | Usage |
|--------|---------|-------|
| `npm run dev` | Start development server | Daily development |
| `npm run build` | Build for production | Before deploying |
| `npm run generate:registry` | Generate registry JSONs | After adding/editing components |
| `npm run validate:registry` | Validate registry structure | CI/CD or troubleshooting |
| `npm run generate:markdown` | Generate MDX docs | After adding file-type blocks |
| `npm run generate:category-slugs` | Generate category slugs | Rarely needed |
| `npm run generate:thumbnails-registry` | Generate illustration registry | After adding illustrations |
| `npm run generate:rss` | Generate RSS feed | Before build |
| `npm run lint` | Lint with Biome | Before committing |
| `npm run format` | Format with Biome | Automatic on save (if configured) |

---

## 🐛 Troubleshooting

### Registry generation fails

**Error:** `Cannot find module` or path errors

**Solution:**
1. Verify all paths in `src/content/blocks-metadata.ts` are correct
2. Check that component files exist at specified paths
3. Ensure category IDs match those in `src/content/declarations.ts`

---

### Component not showing in UI

**Symptoms:** Component added but not visible on homepage

**Checklist:**
- [ ] Added to `src/content/blocks-metadata.ts`?
- [ ] Exported from `src/content/components/{category}/index.ts`?
- [ ] Added to `src/content/blocks-components.tsx`?
- [ ] Ran `npm run generate:registry`?
- [ ] Registry JSON exists in `public/r/`?

---

### Import errors after installation

**Error:** `Module not found` or import path issues

**Causes:**
1. Using relative imports (`../`) in component
2. Importing from non-registry components
3. Missing registry dependencies

**Solution:**
- Use `@/` aliases only
- Import only from `@/components/ui/*` or other registry items
- Add `registryDependencies` to metadata if needed

---

### Category thumbnail not rendering

**Check:**
- Thumbnail component exists in `src/lib/thumbnails/`
- Thumbnail is imported in `src/content/blocks-categories.tsx`
- Thumbnail is referenced in category metadata
- No TypeScript errors in thumbnail component

---

### Build fails with TypeScript errors

**Quick fixes:**
```bash
# Run linter to see all errors
npm run lint

# Fix formatting issues
npm run format

# Check TypeScript types
npx tsc --noEmit
```

---

## ✅ Pull Request Checklist

Before submitting your PR, ensure:

### For Blocks

- [ ] Component file exists at correct path
- [ ] Added to `src/content/blocks-metadata.ts`
- [ ] Exported from category `index.ts`
- [ ] Added to `src/content/blocks-components.tsx`
- [ ] Ran `npm run generate:registry` successfully
- [ ] `public/r/{block-id}.json` generated and committed
- [ ] Component renders correctly at `http://localhost:3000`
- [ ] No TypeScript or lint errors (`npm run lint`)
- [ ] Uses `@/` imports (no relative paths)
- [ ] Self-contained (no external API calls)

### For Categories

- [ ] Category ID added to `src/content/declarations.ts`
- [ ] Thumbnail component created
- [ ] Thumbnail imported in `src/content/blocks-categories.tsx`
- [ ] Category metadata added to `preblocksCategoriesMetadata`
- [ ] Directories created (`src/content/components/{category}/`)
- [ ] Category index.ts created
- [ ] Main index.ts updated
- [ ] Ran `npm run generate:registry`

### General

- [ ] Descriptive commit message following [Conventional Commits](https://www.conventionalcommits.org)
- [ ] PR description explains what and why
- [ ] Screenshots included (if UI changes)
- [ ] No unrelated changes in PR

---

## 💬 Need Help?

- **Questions?** Open a [GitHub Discussion](https://github.com/FadyEmad01/fixel-ui/discussions)
- **Bug reports?** [Create an issue](https://github.com/FadyEmad01/fixel-ui/issues)
- **Feature requests?** [Start a discussion](https://github.com/FadyEmad01/fixel-ui/discussions/categories/ideas)

---

## 🙏 Thank You

Your contributions make Fixel UI better for everyone. Whether it's:

- 🐛 Fixing a bug
- ✨ Adding a new block
- 📚 Improving documentation
- 🎨 Creating a new category
- 💡 Sharing ideas

Every contribution matters!

**Happy building! 🚀**
