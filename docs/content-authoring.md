# Content Authoring

## MDX Content

Project content is authored as MDX files in `content/projects/`.

### Note on Metadata

Project metadata (title, description, tags, date) is defined in `content/data/projects.ts`, not in the MDX files themselves. MDX files contain only the body content.

The MDX registry in `lib/content/mdx-registry.ts` maps each project slug to its MDX module.

### Custom Components

MDX files can use built-in components and custom React components through `mdx-components.tsx`.

## Structured Data

JSON/YAML files in `content/data/` for reusable structured data.
