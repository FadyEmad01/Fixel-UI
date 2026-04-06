<p align="center">
  <img src="./public/og-image.png" alt="Fixel UI Banner" width="100%" />
</p>

<h1 align="center">Fixel UI</h1>

<p align="center">
  Open-source React components built with TypeScript, Tailwind CSS, and the shadcn CLI.<br/>
  Copy, install, customize — no lock-in, no heavy deps.
</p>

<p align="center">
  <a href="https://fixel-ui.vercel.app"><strong>🌐 Live Demo</strong></a> ·
  <a href="#-quick-install"><strong>⚡ Quick Install</strong></a> ·
  <a href="#-components"><strong>📦 Components</strong></a> ·
  <a href="./CONTRIBUTING.md"><strong>🤝 Contributing</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/FadyEmad01/fixel-ui?style=flat&color=yellow" alt="GitHub Stars" />
  <img src="https://img.shields.io/github/forks/FadyEmad01/fixel-ui?style=flat" alt="GitHub Forks" />
  <img src="https://img.shields.io/github/license/FadyEmad01/fixel-ui" alt="License" />
</p>

---

## ✨ About

**Fixel UI** is a shadcn-compatible component registry — a curated collection of production-ready UI blocks you can install directly into your project with one command.

No wrappers. No runtime overhead. You own the code.

---

## 🚀 Features

| Feature | Details |
|---|---|
| 🧩 **shadcn CLI** | Install any component with one `add` command |
| 🎨 **Tailwind CSS v4** | Utility-first styling, fully themeable |
| 🧠 **TypeScript-first** | Every component is typed |
| ✏️ **Open in v0** | Edit any component directly in v0.dev |
| 📋 **Copy & paste** | Works without the CLI too |
| ⚡ **No lock-in** | Components live in *your* project |
| 🌍 **Open-source** | MIT licensed |

---

## ⚡ Quick Install

Make sure you have a project with [shadcn](https://ui.shadcn.com/docs/installation) initialized, then run:

```bash
# pnpm (recommended)
pnpm dlx shadcn@latest add https://fixel-ui.vercel.app/r/<component-name>.json

# npm
npx shadcn@latest add https://fixel-ui.vercel.app/r/<component-name>.json

# yarn
yarn shadcn@latest add https://fixel-ui.vercel.app/r/<component-name>.json

# bun
bunx --bun shadcn@latest add https://fixel-ui.vercel.app/r/<component-name>.json
```

Replace `<component-name>` with any component listed below.

---

## 📦 Components

### Footers

| Name | Install URL |
|---|---|
| **Footer 01** — nav sections, social links, branding | [`/r/footer-01.json`](https://fixel-ui.vercel.app/r/footer-01.json) |
| **Footer 02** — logo watermark, social icons, glow accent | [`/r/footer-02.json`](https://fixel-ui.vercel.app/r/footer-02.json) |

> Install all footer variants at once:
> ```bash
> pnpm dlx shadcn@latest add https://fixel-ui.vercel.app/r/footer.json
> ```

---

## 🗂️ Project Structure

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

---

## 🛠️ Local Development

```bash
# 1 — clone
git clone https://github.com/FadyEmad01/fixel-ui.git
cd fixel-ui

# 2 — install dependencies
npm install

# 3 — start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the component showcase.

### Regenerate the registry JSON

After adding or editing components, rebuild the registry:

```bash
npm run generate:registry
```

This reads all component sources and writes fresh `public/r/*.json` files.

---

## 🤝 Contributing

We welcome contributions of all kinds — new components, bug fixes, docs improvements, and more.

👉 Read the full guide: **[CONTRIBUTING.md](./CONTRIBUTING.md)**

---

## 📄 License

[MIT](./LICENSE) © Fixel UI
