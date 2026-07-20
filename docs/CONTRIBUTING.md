# Contributing

## Development

```bash
npm install
npm run dev
```

## Code Style

- TypeScript strict mode enabled
- ESLint with Next.js core web vitals and TypeScript rules
- Prettier for formatting

Run linting and formatting before committing:

```bash
npm run lint
npm run format
```

## Branch Strategy

- `main` — production-ready code
- `feature/<name>` — new features
- `fix/<name>` — bug fixes
- `docs/<name>` — documentation changes

## Commit Guidelines

Use conventional commit messages:

| Type       | Usage                    |
| ---------- | ------------------------ |
| `feat`     | New feature              |
| `fix`      | Bug fix                  |
| `refactor` | Code refactoring         |
| `docs`     | Documentation changes    |
| `chore`    | Maintenance tasks        |
| `style`    | Formatting, styling only |
| `perf`     | Performance improvement  |
| `ci`       | CI configuration         |

## Pull Request Process

1. Create a feature branch from `main`
2. Make changes and commit using conventional commits
3. Run `npm run build`, `npm run lint`, `npx tsc --noEmit`
4. Open a PR against `main`
5. Ensure CI passes

## Design System

All components must use design tokens. See [ARCHITECTURE.md](./ARCHITECTURE.md) and the design token documentation for details.
