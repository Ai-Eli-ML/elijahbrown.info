#!/usr/bin/env node

/**
 * MCP Server for ElijahBrown.info
 *
 * This Model Context Protocol server provides AI assistants with tools
 * to manage and update the elijahbrown.info website.
 *
 * Available Tools:
 * - create_blog_post: Create a new blog post
 * - list_blog_posts: List all blog posts
 * - update_project: Update a project in the projects list
 * - get_project_structure: Get the project file structure
 * - read_component: Read a React component
 * - update_styles: Update CSS styles
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(PROJECT_ROOT, 'content/blog');
const COMPONENTS_DIR = path.join(PROJECT_ROOT, 'src/components');
const PAGES_DIR = path.join(PROJECT_ROOT, 'src/app');

// Tool definitions
const TOOLS: Tool[] = [
  {
    name: 'create_blog_post',
    description: 'Create a new blog post in MDX format',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'URL-friendly slug for the post (e.g., "my-first-post")',
        },
        title: {
          type: 'string',
          description: 'Post title',
        },
        description: {
          type: 'string',
          description: 'Brief description of the post',
        },
        content: {
          type: 'string',
          description: 'MDX content of the post',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Tags for the post',
        },
      },
      required: ['slug', 'title', 'content'],
    },
  },
  {
    name: 'list_blog_posts',
    description: 'List all blog posts',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'read_file',
    description: 'Read a file from the project',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Relative path to the file from project root',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'list_directory',
    description: 'List files in a directory',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Relative path to directory from project root',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'get_project_info',
    description: 'Get information about the project structure and setup',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

// Initialize server
const server = new Server(
  {
    name: 'elijahbrown-info-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool handlers
async function createBlogPost(args: any) {
  const { slug, title, description = '', content, tags = [] } = args;
  const date = new Date().toISOString().split('T')[0];

  const frontmatter = `---
title: "${title}"
date: "${date}"
description: "${description}"
tags: [${tags.map((tag: string) => `"${tag}"`).join(', ')}]
---

${content}`;

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  await fs.mkdir(BLOG_DIR, { recursive: true });
  await fs.writeFile(filePath, frontmatter, 'utf-8');

  return {
    content: [
      {
        type: 'text',
        text: `Blog post created successfully at: content/blog/${slug}.mdx`,
      },
    ],
  };
}

async function listBlogPosts() {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const posts = files.filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

    return {
      content: [
        {
          type: 'text',
          text: `Found ${posts.length} blog posts:\n${posts.join('\n')}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: 'No blog posts found yet.',
        },
      ],
    };
  }
}

async function readFile(args: any) {
  const { path: relativePath } = args;
  const filePath = path.join(PROJECT_ROOT, relativePath);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error reading file: ${error}`,
        },
      ],
      isError: true,
    };
  }
}

async function listDirectory(args: any) {
  const { path: relativePath } = args;
  const dirPath = path.join(PROJECT_ROOT, relativePath);

  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    const fileList = files.map(f => `${f.isDirectory() ? '📁' : '📄'} ${f.name}`);

    return {
      content: [
        {
          type: 'text',
          text: fileList.join('\n'),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error listing directory: ${error}`,
        },
      ],
      isError: true,
    };
  }
}

async function getProjectInfo() {
  const info = {
    name: 'elijahbrown.info',
    description: 'Personal website for Elijah Brown - AI Solopreneur',
    tech_stack: {
      framework: 'Next.js 15',
      runtime: 'React 19',
      language: 'TypeScript',
      styling: 'CSS Modules',
      effects: ['Three.js', 'GLSL Shaders', 'Canvas API', 'Framer Motion'],
      content: 'MDX for blog posts',
    },
    structure: {
      pages: ['/', '/about', '/projects', '/blog', '/blog/[slug]'],
      components: [
        'Navigation',
        'GlassCard',
        'ProjectCard',
        'ParticleBackground',
        'FloatingOrb',
        'HolographicText',
        'CursorLight',
        'ShaderBackground',
        'AmbientSound',
        'EasterEggs',
      ],
      directories: {
        'src/app': 'Next.js pages and routes',
        'src/components': 'React components',
        'src/lib': 'Utility functions',
        'content/blog': 'Blog posts in MDX',
        'public': 'Static assets',
      },
    },
    features: [
      'Futuristic void aesthetic with particle background',
      '3D chrome orb with liquid shader effects',
      'Holographic text animations',
      'Interactive cursor spotlight',
      'Ambient sound design',
      'Easter eggs (click ripples, Konami code)',
      'Smooth page transitions',
      'MDX blog with syntax highlighting',
      'Responsive glassmorphism UI',
    ],
  };

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(info, null, 2),
      },
    ],
  };
}

// Register handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'create_blog_post':
      return await createBlogPost(args);
    case 'list_blog_posts':
      return await listBlogPosts();
    case 'read_file':
      return await readFile(args);
    case 'list_directory':
      return await listDirectory(args);
    case 'get_project_info':
      return await getProjectInfo();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('ElijahBrown.info MCP Server running');
}

main().catch(console.error);
