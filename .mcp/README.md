# ElijahBrown.info MCP Server

This is a Model Context Protocol (MCP) server that allows AI assistants to manage and update the elijahbrown.info website.

## Features

The MCP server provides the following tools:

- **create_blog_post**: Create new blog posts in MDX format
- **list_blog_posts**: List all existing blog posts
- **read_file**: Read any file in the project
- **list_directory**: Browse project directories
- **get_project_info**: Get comprehensive project information

## Installation

1. Install dependencies:
```bash
cd .mcp
npm install
```

2. Configure your MCP client (e.g., Claude Desktop) to use this server.

## Configuration

### For Claude Desktop

Add this to your Claude Desktop configuration file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "elijahbrown-info": {
      "command": "node",
      "args": ["--loader", "ts-node/esm", "/path/to/elijahbrown.info/.mcp/server.ts"]
    }
  }
}
```

Replace `/path/to/elijahbrown.info` with the actual path to your project.

### For Other MCP Clients

Use the MCP stdio protocol to connect:

```bash
node --loader ts-node/esm .mcp/server.ts
```

## Usage Examples

### Create a Blog Post

```
Use the create_blog_post tool with:
- slug: "building-in-solitude"
- title: "Building in Solitude"
- description: "Thoughts on solo development"
- content: "## Introduction\n\nSolitude is a superpower..."
- tags: ["AI", "Philosophy"]
```

### List Blog Posts

```
Use the list_blog_posts tool to see all posts
```

### Read a Component

```
Use read_file with path: "src/components/GlassCard.tsx"
```

### Get Project Overview

```
Use get_project_info to get complete project structure and tech stack
```

## Project Structure

```
elijahbrown.info/
├── .mcp/                    # MCP server
│   ├── server.ts           # Server implementation
│   ├── package.json        # MCP dependencies
│   └── README.md           # This file
├── content/blog/           # MDX blog posts
├── src/
│   ├── app/               # Next.js pages
│   ├── components/        # React components
│   └── lib/               # Utilities
└── public/                # Static assets
```

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Content**: MDX for blog
- **Effects**: Three.js, GLSL Shaders, Canvas API, Framer Motion
- **MCP**: Model Context Protocol for AI management

## Security

The MCP server runs locally and has file system access to the project. Only use it with trusted AI clients and never expose it to the internet.

## Troubleshooting

**Module not found errors**: Make sure you've run `npm install` in the `.mcp` directory.

**TypeScript errors**: Ensure ts-node is properly installed.

**Permission errors**: Check file permissions for the project directory.

## Future Enhancements

Potential tools to add:
- Update project information
- Deploy to Vercel
- Run build and tests
- Update styles/components
- Manage assets

---

Built for seamless AI-assisted website management. Part of the Advancing Technology ecosystem.
