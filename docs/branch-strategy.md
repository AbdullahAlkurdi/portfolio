# Branch Strategy

## Branches

| Branch   | Purpose                         |
| -------- | ------------------------------- |
| `main`   | Production-ready code           |
| `feature/*` | New features                |
| `fix/*`  | Bug fixes                       |
| `docs/*` | Documentation changes           |
| `chore/*`| Maintenance, tooling            |

## Workflow

1. Branch from `main`
2. Make changes with conventional commits
3. Open PR against `main`
4. CI must pass before merge
5. Squash merge recommended for feature branches

## Naming

- Use lowercase kebab-case
- Examples: `feature/hero-section`, `fix/mobile-nav`, `docs/api-guide`
