# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal résumé site for Qiang Li, deployed as a static export to GitHub Pages at `qiang.li` (CNAME). Built with Next.js 15 (App Router) + React 19 + Tailwind CSS v4, with résumé content driven by Markdown via Contentlayer2 and a downloadable PDF rendered via `@react-pdf/renderer`. Package manager is pnpm (locked in `package.json` as `pnpm@10.12.1`); deploys are automated by `.github/workflows/deploy.yml` on push to `main`.

## Commands

```bash
pnpm install          # install deps
pnpm dev              # next dev (local development)
pnpm build            # next build → static export to out/ (runs contentlayer build implicitly via withContentlayer)
pnpm build:content    # rebuild only Contentlayer generated types/data (.contentlayer/generated)
pnpm format           # prettier write src/**/*.{json,js,ts,tsx} + syncpack format
pnpm lint             # next lint --fix + syncpack format + syncpack lint
pnpm types            # tsc --noEmit (typecheck only)
pnpm sync             # syncpack fix-mismatches (align dep versions)

# Serve the built static site locally (Go file server over out/)
go run server/main.go      # serves out/ on :18080 (override with PORT env)

# Justfile shortcuts: just install | just build | just run | just tidy
```

There is no test runner wired up despite the `@testing-library/*` and `bun-types` dev deps — do not assume `pnpm test` exists.

## Architecture

### Content pipeline (Contentlayer)

Résumé data lives as Markdown under `edit-me/content/` and is transformed into typed objects by `contentlayer.config.ts`. Document types: `PersonalInfo` (singleton `personal-info.md`), `ProfessionalExperience` (`professional-experiences/*.md`), `PersonalProjects` (`personal-projects/*.md`), `Achievement` (`achievements/*.md`), `AdditionalInfo` (`additional-items/*.md`), `PrivateField` (`private-fields/*.md`). Generated output lives in `.contentlayer/generated` and is imported throughout the app via the `@content` tsconfig path alias. `next-contentlayer2` wraps `next.config.ts` so a regular `next build` regenerates content.

When adding a new résumé section, the change usually spans three places: (1) a new document type in `contentlayer.config.ts`, (2) Markdown files under `edit-me/content/<section>/`, and (3) a corresponding article component in `src/components/articles/` rendered from `src/app/page.tsx`.

### App structure

- `src/app/` — Next.js App Router. `layout.tsx` sets up `next-themes` (dark default), Google fonts, and global styles. `page.tsx` composes the résumé from article components. `print/pdf/route.tsx` is a route handler that renders the PDF version with `@react-pdf/renderer` (uses `allPrivateFields` from contentlayer). All pages and routes set `export const dynamic = 'force-static'` because the build is a static export.
- `src/components/` — feature-grouped UI (articles, header/footer, pdf, dropdown, link, prose, theme-toggle, etc.).
- `src/helpers/` — shared utilities (`utilities.ts` has `cn` + `fullName`; `environment.ts` exposes `protocol`).
- `edit-me/` — the user-editable surface: `content/` (Markdown), `config/resume-config.ts` (theme + accent color via `@strum/colors`), `config/links.ts`, and TypeScript types in `types/`.
- `server/main.go` — tiny Go static file server used only for local previewing of `out/` (not part of the deployed artifact).

### Path aliases (tsconfig)

- `@config/*` → `edit-me/config/*`
- `@content` → `.contentlayer/generated` (must exist; produced by `pnpm build` or `pnpm build:content`)
- `@styles/*` → `src/app/styles/*`
- `@test-utils` → `src/test-utilities.tsx` (alias is declared but the file is not currently present)
- `src/...` imports are absolute from repo root (`baseUrl: "."`)

### Static export & GitHub Pages

`next.config.ts` sets `output: 'export'` and reads `basePath` from `PAGES_BASE_PATH`. The deploy workflow injects `PAGES_BASE_PATH` from `actions/configure-pages`, builds, and uploads `./out` as the Pages artifact. The site has a custom domain (`CNAME` = `qiang.li`), so in production `PAGES_BASE_PATH` is empty — keep that in mind when constructing internal URLs (use Next's `<Link>`/`next/image` rather than hardcoded paths).

### Styling

Tailwind CSS v4 (configured via `@tailwindcss/postcss` in `postcss.config.cjs`; no `tailwind.config.*` — config lives in `src/app/styles/*.css` using v4's CSS-first approach). Theme colors come from `@strum/colors` driven by `edit-me/config/resume-config.ts`. `prettier-plugin-tailwindcss` handles class ordering — run `pnpm format` after edits.

## Conventions worth knowing

- Always run `pnpm lint` and `pnpm types` before declaring frontend work done; the deploy workflow does not lint/typecheck, but a broken build will block the next push to `main`.
- `syncpack` is enforced — keep dependency versions consistent across any future workspaces (`pnpm-workspace.yaml` exists). Use `pnpm sync` to auto-fix mismatches; `.syncpackrc` defines the rules.
- Personal résumé content (names, employers, projects) is intentionally checked in under `edit-me/content/`. The README's MIT license excludes that personal info — do not refactor it away when forking the template.
