# Agent Context for Fixel UI

This document provides context for AI assistants working on the Fixel UI project.

---

## Project Overview

**Fixel UI** is a shadcn/ui-compatible component registry — a curated collection of production-ready React components that users can install directly into their projects using the shadcn CLI.

### Key Characteristics

- **Registry-based architecture**: Components are distributed as JSON files, not npm packages
- **Copy-paste philosophy**: Users own the code, no runtime dependencies
- **Two component types**: Blocks (functional UI) and Illustrations (visual thumbnails)
- **Automatic dependency detection**: Registry generator extracts imports automatically
- **TypeScript-first**: All components are fully typed

---

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js 15 App Router
├── components/
│   ├── ui/                # shadcn/ui primitives
│   └── ...                # Site components
├── content/
│   ├── components/        # Block implementations
│   │   ├── footer/
│   │   ├── on-hover/
│   │   └── ...
│   ├── illustrations/     # Visual category thumbnails
│   ├── blocks-metadata.ts # Component registry metadata
│   ├── blocks-components.tsx # Component mappings
│   ├── blocks-categories.tsx # Category definitions
│   └── declarations.ts    # TypeScript types
├── lib/
│   ├── utils.ts           # Utility functions (cn helper)
│   └── thumbnails/        # Category thumbnail components
└── scripts/               # Build and generation scripts
    ├── generate-registry.ts
    ├── add-category.ts
    └── add-block.ts

public/r/                  # Generated registry JSON files
├── footer-01.json
├── on-hover-01.json
├── button-illustration.json
└── ...
```

### Key Files

| File | Purpose | When to Edit |
|------|---------|--------------|
| `src/content/declarations.ts` | Category IDs and types | Adding new category |
| `src/content/blocks-metadata.ts` | Component metadata | Adding new block |
| `src/content/blocks-components.tsx` | Component registry mapping | Adding new block |
| `src/content/blocks-categories.tsx` | Category definitions | Adding new category |
| `src/content/components/` | Block source files | Component implementation |
| `src/content/illustrations/` | Illustration source files | Category thumbnails |
| `src/lib/thumbnails/` | Category SVG thumbnails | Category visuals |

---

## Component Types Reference

### Blocks (`registry:block`)

**Purpose**: Full UI components for end users to install  
**Registry Type**: `registry:block`  
**Install Location**: User's `components/` directory  

**Structure Types:**

1. **File Type**: Single `.tsx` file
   - Path: `src/content/components/{category}/{id}.tsx`
   - Use when: Simple, self-contained component
   - Example: `footer-01.tsx`

2. **Directory Type**: Folder with multiple files
   - Path: `src/content/components/{category}/{id}/`
   - Use when: Complex component with sub-components
   - Example: `complex-dashboard/index.tsx`

### Illustrations (`registry:component`)

**Purpose**: Visual thumbnails for category previews  
**Registry Type**: `registry:component`  
**Install Location**: `components/illustrations/`  

**Structure:**
- Path: `src/content/illustrations/{category}/{category}-illustration.tsx`
- Used on: Registry homepage for category visualization
- Example: `button-illustration.tsx`

---

## Common Patterns

### Adding a Block (File Type)

```typescript
// 1. Create component file
// src/content/components/footer/footer-02.tsx

import { Button } from "@/components/ui/button";

export default function Footer02() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4">
        {/* Content */}
      </div>
    </footer>
  );
}

// 2. Register in blocks-metadata.ts
{
  id: "footer-02",
  category: categoryIds.Footer,
  name: "Minimal footer",
  type: "file",
  hasAnimation: false,
}

// 3. Export from category index.ts
// src/content/components/footer/index.ts
export { default as Footer02 } from "./footer-02";

// 4. Add to blocks-components.tsx
"footer-02": components.Footer02,

// 5. Generate registry
// npm run generate:registry
```

### Adding a Block (Directory Type)

```typescript
// 1. Create directory structure
// src/content/components/dashboard/dashboard-01/
// ├── index.tsx
// ├── header.tsx
// └── sidebar.tsx

// 2. Main component (index.tsx)
import { DashboardHeader } from "./header";
import { DashboardSidebar } from "./sidebar";

export default function Dashboard01() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
      </div>
    </div>
  );
}

// 3. Register metadata
{
  id: "dashboard-01",
  category: categoryIds.Dashboard,
  name: "Dashboard with sidebar",
  type: "directory",
}

// 4. Export from category index
export { default as Dashboard01 } from "./dashboard-01";

// 5. Add to blocks-components
"dashboard-01": components.Dashboard01,
```

### Adding a New Category

```typescript
// 1. Add category ID to declarations.ts
export const categoryIds = {
  // ... existing
  HeroSections: "hero-sections",
};

// 2. Create thumbnail component
// src/lib/thumbnails/hero-sections.tsx
export const HeroSectionsThumbnail = (props) => (
  <svg width="296" height="141" {...props}>
    {/* SVG content */}
  </svg>
);

// 3. Register in blocks-categories.tsx
import { HeroSectionsThumbnail } from "@/lib/thumbnails/hero-sections";

{
  id: categoryIds.HeroSections,
  name: "Hero Sections",
  thumbnail: HeroSectionsThumbnail,
  hasCharts: false,
}

// 4. Create directories
// src/content/components/hero-sections/
// src/content/markdown/hero-sections/

// 5. Update main index.ts
export * from "./hero-sections";
```

---

## Import Rules

### ✅ Allowed

```typescript
// React and Next.js
import { useState } from "react";
import Image from "next/image";

// UI primitives
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Utilities
import { cn } from "@/lib/utils";

// Other registry items
import { ButtonIllustration } from "@/components/illustrations/button";

// NPM dependencies (from package.json)
import { motion } from "motion/react";
import { IconBrandGithub } from "@tabler/icons-react";
```

### ❌ Not Allowed

```typescript
// Relative imports between components
import { OtherComponent } from "../other-component";

// Server-only modules
import fs from "fs";
import path from "path";

// Environment variables
const apiKey = process.env.API_KEY;

// Hard-coded paths
const data = await fetch("/api/data");
```

---

## Registry Generation Process

When `npm run generate:registry` runs:

1. **Metadata Loading**
   - Reads `src/content/blocks-metadata.ts`
   - Extracts component IDs and categories

2. **File Scanning**
   - Scans `src/content/components/` for source files
   - For directory type: finds all files in directory
   - For file type: reads single file

3. **Dependency Extraction**
   - Parses imports from component files
   - Categorizes as registry deps or npm deps
   - Registry deps: `@/components/ui/*`
   - NPM deps: packages from package.json

4. **Import Transformation**
   - Converts `@/` aliases to relative paths for registry
   - Preserves external package imports

5. **Registry Building**
   - Creates JSON structure per shadcn schema
   - Embeds file contents in JSON
   - Writes to `public/r/{id}.json`

6. **Validation**
   - Validates against shadcn registry schema
   - Checks for missing files or dependencies
   - Reports errors

---

## Agent Instructions

### When Adding a Component

1. **Check existing categories first**
   - Review `src/content/declarations.ts` for category IDs
   - Review `src/content/blocks-categories.tsx` for category names

2. **Decide component type**
   - Simple/single-purpose → File type
   - Complex/multiple sub-components → Directory type
   - Visual thumbnail → Illustration

3. **Follow naming conventions**
   - IDs: kebab-case (`footer-01`, `hero-sections`)
   - Keys: PascalCase (`Footer`, `HeroSections`)
   - Files: Match ID exactly

4. **Update all required files**
   - Component source file
   - `blocks-metadata.ts`
   - Category `index.ts`
   - `blocks-components.tsx`
   - Run `npm run generate:registry`

5. **Verify before completing**
   - Component renders without errors
   - Registry JSON generated correctly
   - No lint or TypeScript errors

### When Adding a Category

1. **Use the helper script if possible**
   ```bash
   npx tsx src/scripts/add-category.ts "Category Name"
   ```

2. **Or follow manual process:**
   - Add ID to `declarations.ts`
   - Create thumbnail in `src/lib/thumbnails/`
   - Update `blocks-categories.tsx`
   - Create directories
   - Update `index.ts`

3. **Test category appears correctly**
   - Homepage shows new category
   - Thumbnail renders
   - Click navigates to category page

### When Troubleshooting

1. **Registry generation errors**
   - Check all paths in `blocks-metadata.ts`
   - Verify component files exist
   - Ensure category IDs are correct

2. **Component not showing**
   - Check all 5 required files updated
   - Verify registry JSON exists in `public/r/`
   - Check browser console for errors

3. **Import errors**
   - Verify using `@/` aliases only
   - Check no relative imports between components
   - Ensure dependencies in package.json

---

## File Paths Quick Reference

```
Project Root
├── src/
│   ├── content/
│   │   ├── components/          # Block implementations
│   │   │   ├── {category}/
│   │   │   │   ├── {id}.tsx     # File type
│   │   │   │   └── {id}/        # Directory type
│   │   │   │       └── index.tsx
│   │   │   └── index.ts         # Category exports
│   │   │
│   │   ├── illustrations/       # Visual thumbnails
│   │   │   └── {category}/
│   │   │       └── {category}-illustration.tsx
│   │   │
│   │   ├── blocks-metadata.ts    # Component metadata
│   │   ├── blocks-components.tsx # Component mappings
│   │   ├── blocks-categories.tsx # Category definitions
│   │   └── declarations.ts       # TypeScript types
│   │
│   ├── lib/
│   │   ├── utils.ts              # cn helper
│   │   └── thumbnails/           # Category SVGs
│   │
│   └── scripts/
│       ├── generate-registry.ts  # Main generator
│       ├── add-category.ts       # Category helper
│       └── add-block.ts          # Block helper
│
└── public/r/                     # Generated JSONs
    ├── {block-id}.json
    └── registry.json
```

---

## Important Notes

1. **Always run `npm run generate:registry` after adding components**
   - The registry JSONs are not automatically updated
   - Required for components to appear in the UI

2. **Use `@/` imports exclusively**
   - Relative imports break the registry generation
   - `@/` aliases are transformed correctly

3. **Follow existing code style**
   - Use Tailwind CSS only (no custom CSS files)
   - Use `cn()` for conditional classes
   - Follow shadcn/ui patterns

4. **Test locally before committing**
   - Run `npm run dev` and verify rendering
   - Run `npm run lint` for code quality
   - Test install command in a fresh project

5. **When in doubt, check CONTRIBUTING.md**
   - Comprehensive guide for all processes
   - Troubleshooting section for common issues

---

## Registry Schema

Components must follow this structure in generated JSON:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "footer-01",
  "type": "registry:block",
  "title": "Footer with background masked image",
  "description": "A footer with background masked image and gradient block.",
  "author": "Fady Emad",
  "registryDependencies": ["button"],
  "dependencies": ["@tabler/icons-react"],
  "files": [
    {
      "path": "src/content/components/footer/footer-01.tsx",
      "type": "registry:component",
      "target": "components/footer-01.tsx",
      "content": "...embedded file content..."
    }
  ],
  "categories": ["footer"]
}
```

---

## Next.js 15 Notes

This project uses **Next.js 15** with breaking changes from previous versions:

- **App Router only** — No Pages Router
- **Server Components by default** — Add `"use client"` for interactivity
- **React 19** — New features and deprecations
- **Turbopack** — Enabled for dev server
- **React Compiler** — Enabled in production

When modifying app code, consult Next.js 15 documentation.

---

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

*This document is a companion to README.md and CONTRIBUTING.md. Refer to those for user-facing documentation.*
