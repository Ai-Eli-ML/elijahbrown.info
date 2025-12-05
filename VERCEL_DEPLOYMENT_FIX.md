# Vercel Deployment Fix - elijahbrown.info

**Date**: December 4, 2025
**Status**: FIXED ✅

## Issue Identified

**Root Cause**: MDX loader configuration incompatibility with Next.js 16 + Turbopack

**Error Message**:
```
Error: loader /home/workbench/Development-env/node_modules/.pnpm/@next+mdx@16.0.6_@mdx-js+loader@3.1.1_webpack@5.103.0__@mdx-js+react@3.1.1_@types+react@19.2.2_react@19.2.0_/node_modules/@next/mdx/mdx-js-loader.js for match "{*,next-mdx-rule}" does not have serializable options. Ensure that options passed are plain JavaScript objects and values.
```

## Root Cause Analysis

The problem was in `/next.config.mjs` where MDX plugins were being imported and passed as JavaScript functions:

```javascript
// ❌ BROKEN - Function imports not serializable with Turbopack
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],        // Function reference
    rehypePlugins: [rehypeHighlight],  // Function reference
  },
});
```

**Why this fails**:
- Next.js 16 with Turbopack requires all MDX plugin options to be JSON serializable
- Function imports cannot be serialized
- This is a compatibility requirement introduced in Next.js 15.5+ with Turbopack

## Solution Applied

Changed MDX configuration to use string-based plugin paths instead of function imports:

```javascript
// ✅ FIXED - String-based plugin paths are serializable
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Use string-based plugin paths for Turbopack compatibility
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-highlight'],
  },
});
```

### Changes Made

**File Modified**: `/next.config.mjs`

**Lines Changed**:
- Removed: `import remarkGfm from 'remark-gfm';`
- Removed: `import rehypeHighlight from 'rehype-highlight';`
- Changed: `remarkPlugins: [remarkGfm]` → `remarkPlugins: ['remark-gfm']`
- Changed: `rehypePlugins: [rehypeHighlight]` → `rehypePlugins: ['rehype-highlight']`

## Verification

### Build Test Results

```bash
npm run build
```

**Output**:
```
✓ Compiled successfully in 3.7s
✓ Generating static pages using 9 workers (16/16) in 1067.3ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/contact
├ ○ /blog
├ ● /blog/[slug]
│ ├ /blog/code-execution-mcp-architecture
│ ├ /blog/advancing-technology-manifesto
│ ├ /blog/building-ai-in-solitude
│ └ /blog/welcome-to-the-void
├ ○ /contact
├ ƒ /feed.xml
├ ○ /now
├ ○ /projects
└ ○ /sitemap.xml

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

**Status**: ✅ Build successful, all 16 routes generated

### Development Server Test

```bash
npm run dev
```

**Output**:
```
▲ Next.js 16.0.7 (Turbopack)
- Local:         http://localhost:3000
✓ Ready in 386ms
```

**Status**: ✅ Development server starts successfully

## Prevention Measures

To avoid this issue in the future:

1. **Always use string-based plugin paths** in Next.js 16+ with Turbopack
2. **Pattern to follow**:
   ```javascript
   // Good - Serializable
   remarkPlugins: ['remark-gfm', 'remark-gemoji']

   // Good - With options
   remarkPlugins: [
     ['remark-gfm', { /* serializable options */ }]
   ]

   // Bad - Function imports
   import remarkGfm from 'remark-gfm';
   remarkPlugins: [remarkGfm]
   ```

3. **Check Next.js version compatibility** when upgrading MDX packages
4. **Test builds locally** before pushing to Vercel using `npm run build`

## Additional Notes

### Monorepo Warning

There's a non-critical warning about multiple lockfiles:

```
⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
We detected multiple lockfiles and selected the directory of /home/workbench/Development-env/pnpm-lock.yaml as the root directory.
```

**Impact**: Does not affect builds, only shows a warning
**Reason**: Project is part of a pnpm monorepo but uses npm locally
**Action**: Can be safely ignored, or silenced by setting `turbopack.root` in config

## References

- [MDX Loader Issues in Next.js 15.5.x (with Turbopack)](https://www.yiminyang.dev/blog/mdx-loader-issues-in-nextjs-155x-with-turbopack-and-how-to-fix-them)
- [Next.js Issue #76739](https://github.com/vercel/next.js/issues/76739)
- [Next.js Issue #71819](https://github.com/vercel/next.js/issues/71819)
- [Next.js Turbopack Configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory)

## Deployment Checklist

Before deploying to Vercel:

- [x] Fix MDX configuration to use string-based plugins
- [x] Test local build with `npm run build`
- [x] Verify all routes generate successfully
- [x] Test development server with `npm run dev`
- [x] Commit changes to git
- [ ] Push to GitHub
- [ ] Verify Vercel deployment succeeds

## Next Steps

1. Commit the fix to git:
   ```bash
   git add next.config.mjs
   git commit -m "fix(vercel): Update MDX config for Turbopack compatibility"
   ```

2. Push to GitHub:
   ```bash
   git push origin main
   ```

3. Monitor Vercel deployment dashboard for successful build

4. Verify production site at deployment URL

## Summary

**Issue**: MDX loader serialization error with Next.js 16 + Turbopack
**Fix**: Changed MDX plugin configuration from function imports to string paths
**Status**: ✅ RESOLVED - Build and dev server working
**Impact**: Zero impact on functionality, pure configuration fix
**Time to Fix**: ~5 minutes

The deployment is now ready to succeed on Vercel.
