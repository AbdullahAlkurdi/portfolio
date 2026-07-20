# Component Guidelines

## Structure

Each component should be a single file exporting a default function component.

```
components/ui/button.tsx
```

## Props

- Use `React.ComponentPropsWithoutRef` to extend native element props
- Use `cn()` to merge className props
- Provide sensible defaults for all optional props

## Accessibility

- All interactive elements must have focus styles
- Use semantic HTML elements
- Support `aria-*` attributes
- Support `prefers-reduced-motion`

## Client Components

Only add `"use client"` when:

- Using React hooks (useState, useEffect, etc.)
- Using browser APIs
- Using Framer Motion animations
- Using event handlers

## Performance

- Prefer Server Components by default
- Tree-shakeable exports (named exports, no side effects)
- Minimize client bundle
