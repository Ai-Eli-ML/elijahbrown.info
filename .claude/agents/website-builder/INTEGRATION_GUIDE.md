# Phase 4 Polish Agents - Integration Guide

This guide walks you through integrating Phase 4 polish agents into your Next.js 15 application.

## Prerequisites

- Next.js 15.3.5 installed
- Framer Motion 12.23.24+ installed (already in package.json)
- TypeScript configured
- Tailwind CSS configured

## Step 1: Generate Components

### Option A: Complete Workflow (Recommended)
```bash
cd .claude/agents/website-builder
node polish-orchestrator.js --complete
```

This will:
1. Analyze existing code
2. Create all animation components (5 files)
3. Create all interaction components (3 files)
4. Create hooks and utilities (3 files)
5. Run performance optimizations
6. Generate documentation

### Option B: Quick Polish (Essentials Only)
```bash
node polish-orchestrator.js --quick
```

Creates only:
- PageTransition
- RevealText
- EasterEggs
- RippleEffect

### Option C: Individual Agents
```bash
# Animation components only
node animation-agent.js --create-all

# Interaction components only
node interaction-agent.js --create-all

# Performance analysis only
node performance-agent.js --full
```

## Step 2: Verify Generated Files

Check that files were created:
```bash
# From project root
tree src/components/animations
tree src/components/interactions
tree src/hooks
tree src/utils
```

Expected structure:
```
src/
├── components/
│   ├── animations/
│   │   ├── PageTransition.tsx
│   │   ├── RevealText.tsx
│   │   ├── StaggerContainer.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── ScaleOnHover.tsx
│   └── interactions/
│       ├── EasterEggs.tsx
│       ├── RippleEffect.tsx
│       └── CursorGlow.tsx
├── hooks/
│   ├── useKonami.ts
│   └── useClickCounter.ts
└── utils/
    └── consoleArt.ts
```

## Step 3: Add to Root Layout

Edit `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Phase 4 Polish Components
import PageTransition from "@/components/animations/PageTransition";
import EasterEggs from "@/components/interactions/EasterEggs";
import { initConsoleArt, trackClicks } from "@/utils/consoleArt";
import { useEffect } from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elijah Brown - Developer Portfolio",
  description: "Personal portfolio and blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize console art on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initConsoleArt();
      trackClicks();
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Easter eggs - click counters, Konami code */}
        <EasterEggs />

        {/* Page transitions for smooth navigation */}
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
```

**Note**: If you get errors about `useEffect` in Server Components, you may need to:
1. Create a separate client component for the initialization
2. Or move the initialization to a client-only component

### Alternative: Client Component Wrapper

Create `src/components/ClientProviders.tsx`:
```tsx
'use client';

import { useEffect } from 'react';
import EasterEggs from '@/components/interactions/EasterEggs';
import { initConsoleArt, trackClicks } from '@/utils/consoleArt';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initConsoleArt();
    trackClicks();
  }, []);

  return (
    <>
      <EasterEggs />
      {children}
    </>
  );
}
```

Then in `layout.tsx`:
```tsx
import PageTransition from "@/components/animations/PageTransition";
import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>
          <PageTransition>
            {children}
          </PageTransition>
        </ClientProviders>
      </body>
    </html>
  );
}
```

## Step 4: Use Animations in Pages

### Hero Section with Reveal Text

Edit `src/app/page.tsx`:
```tsx
import RevealText from "@/components/animations/RevealText";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      {/* Hero section with reveal text */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RevealText
            text="Elijah Brown"
            delay={0.3}
            stagger={0.05}
            className="text-6xl font-bold mb-4"
          />
          <RevealText
            text="Full-Stack Developer & AI Enthusiast"
            delay={1.0}
            stagger={0.03}
            className="text-2xl text-gray-600"
          />
        </div>
      </section>

      {/* About section with scroll reveal */}
      <ScrollReveal direction="up" delay={0.2}>
        <section className="py-20">
          <h2 className="text-4xl font-bold mb-8">About Me</h2>
          <p className="text-lg text-gray-700">
            I build modern web applications with Next.js, React, and TypeScript.
          </p>
        </section>
      </ScrollReveal>
    </main>
  );
}
```

### Project Grid with Stagger

```tsx
import StaggerContainer, { itemVariants } from "@/components/animations/StaggerContainer";
import { motion } from "framer-motion";

const projects = [
  { id: 1, title: "Project 1", description: "Description" },
  { id: 2, title: "Project 2", description: "Description" },
  { id: 3, title: "Project 3", description: "Description" },
];

export default function ProjectsPage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(project => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
          </motion.div>
        ))}
      </StaggerContainer>
    </main>
  );
}
```

### Interactive Button with Ripple

```tsx
import RippleEffect from "@/components/interactions/RippleEffect";

export default function ContactPage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>

      <RippleEffect className="inline-block rounded-lg overflow-hidden">
        <button className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
          Contact Me
        </button>
      </RippleEffect>
    </main>
  );
}
```

### Hover Scale Effect

```tsx
import ScaleOnHover from "@/components/animations/ScaleOnHover";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="p-8">
      <ScaleOnHover scale={1.05}>
        <div className="p-6 bg-white rounded-lg shadow-lg cursor-pointer">
          <h3 className="text-2xl font-bold mb-2">Hover me!</h3>
          <p className="text-gray-600">This card scales on hover</p>
        </div>
      </ScaleOnHover>
    </main>
  );
}
```

## Step 5: Test Easter Eggs

### In Browser Console
1. Open DevTools (F12)
2. Check for ASCII art banner
3. Try commands:
   - `easterEgg()` - Show hidden commands
   - `showSkills()` - Display skills table
   - `showProjects()` - List projects
   - `contactMe()` - Show contact info

### Konami Code
Press: ↑ ↑ ↓ ↓ ← → ← → B A

Should trigger special message.

### Click Counter
Click anywhere on the page:
- 10 clicks: First achievement
- 50 clicks: Super clicker
- 100 clicks: Click master

## Step 6: Run Performance Analysis

```bash
cd .claude/agents/website-builder
node performance-agent.js --full
```

This will:
1. Run production build
2. Analyze bundle size
3. Check dependencies
4. Find unused imports
5. Analyze images
6. Generate `performance-report.json`
7. Create `OPTIMIZATION_CHECKLIST.md`

Review the reports:
```bash
# From project root
cat performance-report.json
cat OPTIMIZATION_CHECKLIST.md
```

## Step 7: Optimize Based on Report

### Common Optimizations

1. **Large Dependencies**
   - Use dynamic imports for heavy libraries
   ```tsx
   const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
     loading: () => <p>Loading...</p>
   });
   ```

2. **Unused Imports**
   - Remove any imports identified in the report
   - Run ESLint: `npm run lint`

3. **Image Optimization**
   - Convert JPG/PNG to WebP
   - Use `next/image` component
   ```tsx
   import Image from 'next/image';

   <Image
     src="/photo.jpg"
     alt="Photo"
     width={800}
     height={600}
     priority
   />
   ```

4. **Code Splitting**
   - Split large pages into smaller components
   - Use dynamic imports for below-fold content

## Step 8: Build and Test

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Production build
npm run build

# Test production build locally
npm start
```

## Step 9: Deploy

Once everything is working:

```bash
# Deploy to Vercel (or your platform)
vercel deploy --prod
```

## Troubleshooting

### Error: "'use client' directive must be at top of file"
Make sure `'use client';` is the very first line in client components.

### Error: "Cannot find module '@/components/animations/...'"
Verify path aliases in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Error: "Framer Motion not found"
Install if missing:
```bash
npm install framer-motion
```

### Animations not working
1. Check browser console for errors
2. Verify component is imported correctly
3. Make sure `'use client'` is present
4. Test in different browsers

### Easter eggs not triggering
1. Check EasterEggs component is mounted
2. Look for console errors
3. Verify event listeners are attached
4. Test with React DevTools

### Performance issues
1. Review `performance-report.json`
2. Check bundle size with `npm run build`
3. Use Lighthouse in Chrome DevTools
4. Profile with React DevTools Profiler

## Advanced Usage

### Custom Animation Variants

```tsx
import { motion } from 'framer-motion';

const customVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={customVariants}
>
  Custom animation
</motion.div>
```

### Custom Easter Eggs

Edit `src/components/interactions/EasterEggs.tsx` to add your own:

```tsx
const EASTER_EGGS: EasterEgg[] = [
  {
    id: 'custom-egg',
    trigger: 'clicks',
    threshold: 25,
    message: 'You found my custom easter egg!',
    emoji: '🎁'
  },
  // ... existing eggs
];
```

### Custom Console Commands

Edit `src/utils/consoleArt.ts`:

```tsx
(window as any).myCustomCommand = () => {
  console.log('%c🚀 Custom command executed!', 'font-size: 20px; color: #10b981;');
};
```

## Performance Monitoring

### Set up analytics
```tsx
// In a client component
import { useEffect } from 'react';

useEffect(() => {
  // Track page view
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname,
    });
  }
}, []);
```

### Monitor easter egg discoveries
```tsx
// In EasterEggs component
const triggerEasterEgg = (eggId: string) => {
  // ... existing code ...

  // Track with analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'easter_egg_discovered', {
      egg_id: eggId,
      egg_name: egg.message,
    });
  }
};
```

## Next Steps

1. **Test thoroughly**
   - Different browsers
   - Mobile devices
   - Slow network conditions

2. **Monitor performance**
   - Lighthouse scores
   - Core Web Vitals
   - Bundle size trends

3. **Iterate**
   - Gather user feedback
   - A/B test animations
   - Optimize based on analytics

4. **Document**
   - Add comments to components
   - Create Storybook stories
   - Update project README

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js Performance](https://nextjs.org/docs/going-to-production#performance)
- [Web Vitals](https://web.dev/vitals/)
- [React Performance](https://react.dev/learn/render-and-commit#optimizing-rendering-performance)

## Support

For issues with Phase 4 agents:
1. Check troubleshooting section above
2. Review generated documentation in `docs/`
3. Check performance reports for specific issues
4. Test components in isolation

---

**Generated**: Phase 4 Polish Agents
**Project**: elijahbrown.info
**System**: Website Builder Agent System
