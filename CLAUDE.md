# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **elijahbrown.info**, a personal brand website built with Next.js 15 and React 19. The project is a fresh Next.js starter with minimal configuration.

**Repository**: Part of the AdvancingTechnology Business Ecosystem
**Working Directory**: `/home/workbench/Development-env/repos/elijahbrown.info`

## Technology Stack

- **Next.js 15.3.5** with App Router
- **React 19** with Server Components
- **TypeScript** (strict mode)
- **Tailwind CSS v4** with PostCSS
- **Turbopack** for fast development
- **Geist Font Family** (Sans & Mono)

## Development Commands

```bash
# Development server (with Turbopack)
npm run dev
# or
pnpm dev

# Production build
npm run build
pnpm build

# Start production server
npm start
pnpm start

# Linting (ESLint with Next.js config)
npm run lint
pnpm lint
```

**Note**: While this repository is part of a pnpm monorepo, it can use either `npm` or `pnpm` for development.

## Architecture

### File Structure
```
src/
├── app/
│   ├── layout.tsx       # Root layout with Geist fonts
│   ├── page.tsx         # Home page (default Next.js starter)
│   ├── globals.css      # Global styles with Tailwind v4
│   └── favicon.ico
public/
├── next.svg
├── vercel.svg
└── *.svg               # UI icons
```

### Key Configuration Files

- **tsconfig.json**: Path alias `@/*` maps to `./src/*`
- **next.config.ts**: Minimal Next.js configuration (extensible)
- **eslint.config.mjs**: Uses Next.js recommended rules (`next/core-web-vitals`, `next/typescript`)
- **globals.css**: Tailwind v4 with custom CSS variables for theming

### Styling Approach

- **Tailwind CSS v4** imported directly via `@import "tailwindcss"`
- **Custom properties**: `--background`, `--foreground`, `--font-geist-sans`, `--font-geist-mono`
- **Dark mode**: Automatic via `prefers-color-scheme: dark`
- **Theme inline**: Using Tailwind v4's `@theme inline` directive

## Important Notes

- This is a **fresh Next.js 15 starter** - most code is boilerplate
- **No test setup** currently configured
- **No environment variables** or external services integrated yet
- **Default metadata**: Still shows "Create Next App" placeholder (needs customization)
- **App Router**: Uses Next.js 15 App Router (not Pages Router)
- **Server Components**: All components are Server Components by default unless marked with `'use client'`

## Business Context

Part of the **AdvancingTechnology Business Ecosystem**. This personal brand site is in early development and will serve as Elijah Brown's professional portfolio and online presence.

For monorepo-wide commands and architecture, see the root `/CLAUDE.md` at `/home/workbench/Development-env/CLAUDE.md`.






## Last Audit

**Date**: 11/8/2025
**Completion**: 63%
**Issues**: 1

