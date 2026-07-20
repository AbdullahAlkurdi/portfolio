# Portfolio

Production-grade engineering portfolio built with Next.js.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Content:** MDX with @next/mdx
- **Animation:** Framer Motion
- **Icons:** Lucide React

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run start`   | Start production server  |
| `npm run lint`    | Run ESLint               |
| `npm run format`  | Run Prettier             |

## Project Structure

```
app/              App Router pages and layouts
components/       Reusable UI components
  ui/             Primitive UI components
  layout/         Layout components (header, footer, etc.)
features/         Feature-specific modules
content/          MDX content and data
  data/           JSON/YAML data files
  projects/       Project MDX files
lib/              Utilities and helpers
  animations/     Animation utilities
  content/        Content processing utilities
types/            TypeScript type definitions
public/           Static assets
docs/             Project documentation
```
