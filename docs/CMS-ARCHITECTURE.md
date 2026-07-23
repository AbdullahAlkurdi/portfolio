# Portfolio CMS Architecture

## Overview

The portfolio CMS transforms the static portfolio into a living professional platform. Content is managed through a private admin dashboard and published to Firestore, with the public site consuming published content via cache revalidation.

## Architecture

```
Admin Dashboard (Client)
│
├── Firebase Auth (email/password)
├── Firestore (content CRUD, media metadata)
│
└── Publish Button
    │
    ▼
API Route (/api/media/upload)
    │
    ├── Google Drive API (file storage)
    └── Firestore (media metadata)
    │
    ▼
API Route (/api/publish)
    │
    ├── Write publish timestamp to Firestore
    └── revalidatePath() for public pages
        │
        ▼
Public Site (Server Components)
    │
    ├── Reads static content (default)
    └── Reads Firestore content (when published + configured)
```

## Routes

### Public (Static/SSG)
| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage with all sections |
| `/projects` | Static | Project listing |
| `/projects/[slug]` | SSG | Project detail pages |
| `/resume` | Static | Resume page |
| `/robots.txt` | Static | Robots rules |
| `/sitemap.xml` | Static | Sitemap |

### Admin (Dynamic - Protected)
| Route | Description |
|-------|-------------|
| `/admin` | Dashboard with publish status |
| `/admin/login` | Authentication |
| `/admin/identity` | Personal identity |
| `/admin/working` | Currently working on |
| `/admin/projects` | Projects list |
| `/admin/projects/new` | New project |
| `/admin/projects/[slug]` | Edit project |
| `/admin/skills` | Skill categories |
| `/admin/knowledge` | Knowledge domains |
| `/admin/experience` | Professional experience |
| `/admin/education` | Education |
| `/admin/certifications` | Certifications |
| `/admin/courses` | Courses & training |
| `/admin/learning` | Currently learning |
| `/admin/timeline` | Career timeline |
| `/admin/social` | Social links |
| `/admin/media` | Media library |

### API
| Route | Description |
|-------|-------------|
| `GET /api/publish` | Get publish status |
| `POST /api/publish` | Publish + revalidate |
| `POST /api/revalidate` | Revalidate path |
| `GET /api/admin/check` | Check Firebase config |
| `POST /api/media/upload` | Upload file to Google Drive |
| `GET /api/media/[id]` | Serve media file from Google Drive |
| `DELETE /api/media/[id]` | Delete media file from Google Drive |

## Firestore Schema

### Collections

```
site/
  publishing/          — Publish state (publishedAt, lastModified, publishedBy)

identity/
  main/                — Personal identity (name, title, social links)

projects/
  {slug}/              — Project data (title, description, tags, status, github, demo, etc.)

working/
  {id}/                — Currently working on items (name, description, status, order)

skills/
  {id}/                — Skill categories (category, skills[])

knowledge/
  {id}/                — Knowledge domains (name, level, description)

experience/
  {id}/                — Work experience (role, organization, description)

education/
  {id}/                — Education (degree, institution, description)

certifications/
  {id}/                — Certifications (name, issuer, date, url)

courses/
  {id}/                — Courses (name, issuer, completionDate)

learning/
  {id}/                — Learning topics (topic, reason, progress)

timeline/
  {id}/                — Timeline events (year, title, description, order)

social/
  {id}/                — Social links (label, href, icon)

media/
  {id}/                — Media metadata (name, driveFileId, mimeType, size, folder, alt, createdAt)
```

## Authentication

- Firebase Auth with email/password
- Admin check: `NEXT_PUBLIC_ADMIN_EMAIL` environment variable
- Auth context (`AdminAuthProvider`) wraps all admin pages
- Unauthenticated users redirected to `/admin/login`
- Non-admin users see nothing (null render)

## Security

- Admin routes are dynamic (`force-dynamic`) — not statically generated
- `robots.txt` disallows `/admin/`
- Admin metadata has `robots: { index: false, follow: false }`
- Firebase Admin SDK used server-side only (API routes)
- Firebase Client SDK used client-side only (admin dashboard)
- Google Drive service account credentials are server-only (never in client bundle)
- Media files are proxied through `/api/media/[driveFileId]` — Google Drive is not directly exposed
- Environment variables template provided

## Publishing

1. Admin edits content in dashboard
2. Content saved to Firestore as draft (`published: false`)
3. Admin clicks "Publish All" on dashboard
4. API route writes publish timestamp + calls `revalidatePath()`
5. Content service checks Firestore for published content on next request
6. Falls back to static content files if Firestore not configured

## Static Content Fallback

When Firebase is not configured:
- All public pages use existing `content/data/` files
- Admin dashboard gracefully degrades
- API routes return Firebase-not-configured messages

## Content Service

`lib/content/content-service.ts` provides:
- `getPublishStatus()` — Last published timestamp
- `getPublishedProjects()` — Published projects from Firestore
- `getPublishedProject(slug)` — Single published project
- `getPublishedContent(locale)` — Localized site content
- `getPublishedIdentity()` — Personal identity
- `getPublishedWorkingItems()` — Currently working on
- `getPublishedKnowledgeDomains()` — Knowledge domains
- `getPublishedResume()` — Resume data

## Setup

1. Copy `.env.template` to `.env.local`
2. Create a Firebase project
3. Enable Email/Password authentication
4. Set Firestore security rules (`firestore.rules`)
5. Fill in Firebase config values
6. Set admin email
7. Create a Google Cloud service account with Drive API enabled
8. Share a Google Drive folder with the service account or let it create its own
9. Set `GOOGLE_DRIVE_*` environment variables in `.env.local`
10. For production, set secrets via `wrangler secret put`
11. Start the dev server: `npm run dev`
12. Visit `/admin/login` to sign in
