import createMDX from '@next/mdx';

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Use string-based plugin paths for Turbopack compatibility
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-highlight'],
  },
});

// @ts-expect-error - Type mismatch due to monorepo Next.js version differences
export default withMDX(nextConfig);
