# Architecture

## Overview

Feature-first architecture following Next.js App Router conventions.

## Layers

### App Layer (`app/`)

Route definitions, layouts, and page components. Routes are defined by the file system.

### Components Layer (`components/`)

Reusable UI components organized by domain:

- `components/ui/` - Primitive, atomic UI components (buttons, inputs, cards, etc.)
- `components/layout/` - Layout components (header, footer, navigation)

### Features Layer (`features/`)

Feature-specific modules. Each feature encapsulates its own components, hooks, and logic.

### Content Layer (`content/`)

MDX files and JSON data used for portfolio content:

- `content/projects/` - Project write-ups as MDX
- `content/data/` - Structured data (JSON/YAML)

### Lib Layer (`lib/`)

Shared utilities:

- `lib/animations/` - Framer Motion animation presets and utilities
- `lib/content/` - MDX content processing and helpers

### Types Layer (`types/`)

Shared TypeScript type definitions.

## Data Flow

1. Content is authored in MDX/JSON within `content/`
2. Pages import and render content via React Server Components
3. Interactive elements use client components where necessary
4. Theme state managed by next-themes provider at root layout

## Key Decisions

- **@next/mdx** over next-mdx-remote: First-party Next.js integration, supports React Server Components natively, and is the recommended approach per Next.js docs.
- **Tailwind CSS v4**: CSS-first configuration with `@theme` directives, no `tailwind.config.js` needed.
- **No src/ directory**: Configuration files remain at root, app code in top-level folders as recommended by Next.js docs for simpler project structure.
