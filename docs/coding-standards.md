# Coding Standards

## TypeScript

- Strict mode enabled
- Prefer `type` over `interface` for type definitions
- Use `Readonly<>` for props interfaces
- Avoid `any` — use `unknown` when type is uncertain

## React

- Default to Server Components; use `"use client"` only when needed
- Use `ReactNode` for children props
- Prefer composition over inheritance

## Styling

- Use Tailwind CSS utility classes
- Use `cn()` utility for conditional class merging
- Never hardcode design token values

## Imports

- Use `@/` path alias for all project imports
- Group: external → internal → styles
- No barrel exports that cause circular dependencies

## Naming

- Components: PascalCase
- Utilities: camelCase
- Files: kebab-case for pages, PascalCase for components
- Booleans: prefix with `is`, `has`, `should`
