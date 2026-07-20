# Deployment

## Build

```bash
npm run build
```

Output is in the `.next/` directory.

## Deploy

### Vercel (Recommended)

Connect the GitHub repository to Vercel. The framework preset is automatically detected.

### Static Export

```bash
next build && next export
```

Output in `out/` directory, deployable to any static host.

## Environment Variables

Copy `.env.template` to `.env.local` and fill in values.

## CI/CD

The CI pipeline (`.github/workflows/ci.yml`) runs on every push and PR to `main`:

1. Install dependencies
2. TypeScript check
3. ESLint
4. Production build
