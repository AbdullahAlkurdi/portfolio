# Architecture

## Overview

Feature-first architecture following Next.js App Router conventions.

## Folder Structure

```
app/                    App Router — routes, layouts, pages
  layout.tsx            Root layout with theme provider
  page.tsx              Home page (stub)
  globals.css           Global styles and design tokens

components/             Reusable UI components
  ui/                   Primitive, atomic UI components
    button.tsx
    card.tsx
    badge.tsx
    tag.tsx
    icon.tsx
    tooltip.tsx
    accordion.tsx
    metric.tsx
    stat.tsx
    callout.tsx
    code-block.tsx
    theme-toggle.tsx
    typography/
      display.tsx
      heading.tsx
      title.tsx
      body.tsx
      caption.tsx
      code.tsx
      label.tsx
  layout/               Layout components
    container.tsx
    section.tsx
    stack.tsx
    grid.tsx
    divider.tsx
    spacer.tsx

features/               Feature-specific modules (pages, hooks, logic)

content/                MDX content and structured data
  projects/             Project write-ups as MDX
  data/                 JSON/YAML data files

lib/                    Shared utilities
  animations/           Framer Motion animation presets
  content/              MDX content processing helpers
  utils.ts              General utilities (cn, etc.)

types/                  Shared TypeScript type definitions

public/                 Static assets

docs/                   Project documentation
  ARCHITECTURE.md
  CONTRIBUTING.md
  ROADMAP.md
  content-authoring.md
  coding-standards.md
  component-guidelines.md
  deployment-guide.md
  branch-strategy.md

.github/                GitHub configuration
  workflows/ci.yml      CI pipeline
  ISSUE_TEMPLATE/       Issue templates
  pull_request_template.md
```

## Layers

### App Layer (`app/`)
Route definitions, layouts, and page components. Routes defined by file system conventions.

### Components Layer (`components/`)
Reusable UI components. `components/ui/` for atomic primitives, `components/layout/` for layout primitives.

### Features Layer (`features/`)
Feature-specific modules. Each feature encapsulates its own components, hooks, and logic.

### Content Layer (`content/`)
MDX files and JSON data for portfolio content.

### Lib Layer (`lib/`)
Shared utilities — animation presets, content processing helpers, the `cn()` utility.

### Types Layer (`types/`)
Shared TypeScript type definitions.

## Data Flow

1. Content authored in MDX/JSON within `content/`
2. Pages import and render content via React Server Components
3. Interactive elements use client components where necessary
4. Theme state managed by next-themes provider at root layout

## Key Decisions

- **@next/mdx** over next-mdx-remote: first-party integration, RSC support
- **Tailwind CSS v4**: CSS-first configuration with `@theme` directives
- **No src/**: config files at root, app code in top-level folders
- **Design tokens in CSS**: centralized in `globals.css` via CSS custom properties
- **cn() utility**: `clsx` + `tailwind-merge` for conditional class merging
