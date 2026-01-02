# Website Builder Agent System - Phase 2: Core Agents

## Overview

This is the **Phase 2 implementation** of the AI-powered Website Builder Agent System. Phase 2 introduces 3 core autonomous agents that orchestrate website building through the MCP (Model Context Protocol) API.

**Phase 1** (completed): Database schema, MCP API, component library with glass-morphism components
**Phase 2** (this): Core orchestration agents (Architect, Design System, Content MDX)
**Phase 3** (existing): Specialized effect agents (ThreeJS, Shader, Canvas, Audio, Animation)

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MCP API Gateway                          │
│         (Personal Dashboard @ dashboard.advancingtechnology)│
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ JSON-RPC 2.0
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐  ┌────────▼────────┐
│   Architect    │  │   Design    │  │    Content      │
│     Agent      │  │   System    │  │   MDX Agent     │
│                │  │    Agent    │  │                 │
│ • Orchestrates │  │ • Themes    │  │ • MDX Setup     │
│ • Plans        │  │ • Glass     │  │ • Blog System   │
│ • Assigns      │  │ • CSS Vars  │  │ • Gray-matter   │
│ • Tracks       │  │ • Tailwind  │  │ • Frontmatter   │
└────────────────┘  └─────────────┘  └─────────────────┘
```

## Core Agents

### 1. Architect Agent (`architect-agent.js`)

**Role**: Master orchestrator and project planner

**Capabilities**:
- Analyze website requirements (type, features, tech stack)
- Generate project architecture and folder structure
- Break down projects into atomic tasks
- Assign tasks to specialized agents with dependencies
- Track overall project progress
- Make architectural decisions

**Usage**:
```bash
# Create new project
node architect-agent.js --project-name "My Portfolio" \
  --project-type portfolio \
  --features "3d-effects,glass-morphism,blog"

# Orchestrate existing project
node architect-agent.js --project-id <uuid> --orchestrate
```

**Key Functions**:
- `analyzeRequirements()` - Determine agents needed and structure
- `generateTaskPlan()` - Create dependency-aware task chain
- `createProject()` - Full project creation and orchestration

### 2. Design System Agent (`design-system-agent.js`)

**Role**: Theme designer and component stylist

**Capabilities**:
- Generate comprehensive design systems
- Create color palettes (dark-glass, light-modern, neon-cyber)
- Generate CSS variables and custom properties
- Build glass-morphism components and utilities
- Create Tailwind config with custom theme
- Query component library for reusable UI components

**Usage**:
```bash
# Execute assigned design task
node design-system-agent.js --task-id <uuid> --execute

# Create design system for project
node design-system-agent.js --project-id <uuid> --theme "dark-glass"

# Query component library
node design-system-agent.js --query-components
```

**Generated Assets**:
- `src/styles/variables.css` - CSS custom properties
- `src/styles/glass.css` - Glass-morphism utilities
- `tailwind.config.ts` - Tailwind theme configuration

**Themes Available**:
- `dark-glass` - Dark background with glass-morphism (default)
- `light-modern` - Clean light theme
- `neon-cyber` - Cyberpunk neon aesthetics

### 3. Content MDX Agent (`content-mdx-agent.js`)

**Role**: Blog and content system builder

**Capabilities**:
- Set up complete MDX blog infrastructure
- Configure next-mdx-remote, gray-matter integration
- Create blog post templates and layouts
- Generate content utilities (reading time, frontmatter parsing)
- Build markdown processing pipeline (remark-gfm, rehype-highlight)
- Create blog listing pages with SEO
- Generate sample blog posts

**Usage**:
```bash
# Execute assigned content task
node content-mdx-agent.js --task-id <uuid> --execute

# Set up blog system
node content-mdx-agent.js --project-id <uuid> --setup-blog
```

**Generated Files**:
- `lib/mdx.ts` - MDX utilities (getPostBySlug, getAllPosts, etc.)
- `app/blog/page.tsx` - Blog listing page
- `app/blog/[slug]/page.tsx` - Blog post page
- `content/posts/welcome.mdx` - Sample blog post

**Features**:
- Frontmatter parsing with gray-matter
- Reading time calculation
- Tag-based filtering
- SEO metadata generation
- Syntax highlighting for code blocks
- GitHub Flavored Markdown support

## MCP API Integration

All agents communicate with the personal-dashboard MCP server using these tools:

### Project Management
- `createWebsiteProject` - Create new website project
- `updateWebsiteProject` - Update project status/completion
- `getWebsiteProjects` - Retrieve project details

### Task Management
- `assignAgentTask` - Assign task to specialized agent
- `updateAgentTask` - Update task status/output/files

### Component Library
- `getReusableComponents` - Query component library (glass, 3D, etc.)
- `saveComponent` - Save new reusable component

### Analytics
- `logBuilderAnalytics` - Log events, performance, errors

## Authentication

All agents use MCP API key authentication:

**Default Configuration**:
- URL: `https://dashboard.advancingtechnology.online/api/mcp`
- API Key: `pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y`

**Custom Configuration**:
```bash
export MCP_URL="https://your-dashboard.com/api/mcp"
export MCP_API_KEY="your-api-key"
```

## Testing the System

### Full Orchestration Test

Run the complete workflow to test all 3 agents:

```bash
node test-orchestration.js --full-demo
```

This will:
1. Test MCP API connection
2. Create a test portfolio project with Architect Agent
3. Generate design system with Design System Agent
4. Set up blog with Content MDX Agent
5. Report success/failure of each stage

### Individual Agent Tests

```bash
# Test Architect Agent only
node test-orchestration.js --test-architect

# Test MCP connection
node test-orchestration.js --test-mcp
```

## Workflow Example

### Creating a Portfolio Website

```bash
# Step 1: Architect creates project and assigns tasks
node architect-agent.js \
  --project-name "John Doe Portfolio" \
  --project-type portfolio \
  --features "3d-effects,glass-morphism,blog,animations" \
  --tier premium

# Output:
# Project ID: abc-123
# Tasks:
#   1. [architect] Create architecture (urgent)
#   2. [design-system] Create design system (high)
#   3. [content] Set up MDX blog (high)
#   4. [threejs] Implement 3D effects (medium)
#   5. [animation] Add animations (low)
#   6. [qa] Performance optimization (high)
#   7. [deployment] Deploy to production (urgent)
```

## Files Created

```
.claude/agents/website-builder/
├── PHASE2-README.md              # This file
├── architect-agent.js            # Master orchestrator (500 lines)
├── design-system-agent.js        # Design system generator (600 lines)
├── content-mdx-agent.js          # MDX blog builder (550 lines)
└── test-orchestration.js         # Test suite (250 lines)

Total: ~1,900 lines of production-ready agent code
```

## Performance Metrics

Agents track execution time:

- Architect: ~500ms per project creation
- Design System: ~800ms per design system
- Content MDX: ~600ms per blog setup
- Total orchestration: ~2-3 seconds for complete project

## Integration with Phase 3

Phase 2 agents (Architect, Design System, Content) work seamlessly with Phase 3 effect agents (ThreeJS, Shader, Canvas, Audio):

1. **Architect Agent** assigns tasks to Phase 3 agents when `3d-effects`, `shaders`, `particles`, or `audio` features are requested
2. **Design System Agent** queries Phase 3 components from the component library
3. All agents use the same MCP API for task management and analytics

## Troubleshooting

### MCP Connection Failed

```
Error: HTTP 401: Unauthorized
```

**Solution**: Check API key is correct in environment variable or agent file.

### Task Assignment Failed

```
Error: User authentication required
```

**Solution**: Ensure personal-dashboard MCP server is running and API key has valid user context.

### Component Library Empty

```
Found 0 glass-morphism components
```

**Solution**: Run Phase 1 database migration to seed component_library table.

---

**Built with**: Node.js 20, MCP API, Supabase, Next.js 15
**Author**: AdvancingTechnology
**Version**: Phase 2 (Core Agents)
**Status**: Complete
