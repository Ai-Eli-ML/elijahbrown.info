#!/usr/bin/env node

/**
 * Architect Agent - Master Website Building Orchestrator
 *
 * Responsibilities:
 * - Analyze website requirements and create project plans
 * - Break down projects into atomic tasks
 * - Assign tasks to specialized agents (design-system, content, threejs, etc.)
 * - Track dependencies and orchestrate workflow
 * - Monitor overall project progress
 * - Make architectural decisions (routing, data flow, component structure)
 *
 * Usage:
 *   node architect-agent.js --project-name "My Portfolio" --features "3d-effects,blog,glass-morphism"
 *   node architect-agent.js --project-id <uuid> --orchestrate
 */

const BASE_URL = process.env.MCP_URL || 'https://dashboard.advancingtechnology.online/api/mcp';
const API_KEY = process.env.MCP_API_KEY || 'pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y';

// ============================================================================
// MCP API HELPERS
// ============================================================================

async function mcpRequest(method, params = {}) {
  const requestId = `arch-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: requestId,
        method,
        params,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`MCP Error: ${data.error.message || JSON.stringify(data.error)}`);
    }

    return data.result || data;
  } catch (error) {
    console.error(`[Architect Agent] MCP Request Failed (${method}):`, error.message);
    throw error;
  }
}

async function logAnalytics(eventType, eventData, projectId = null, executionTimeMs = null) {
  try {
    await mcpRequest('logBuilderAnalytics', {
      website_project_id: projectId,
      event_type: eventType,
      event_category: 'agent',
      event_data: eventData,
      agent_name: 'architect',
      agent_execution_time_ms: executionTimeMs,
    });
  } catch (error) {
    console.error('[Architect Agent] Analytics logging failed:', error.message);
  }
}

// ============================================================================
// ARCHITECTURAL PLANNING
// ============================================================================

function analyzeRequirements(projectType, features = []) {
  const plan = {
    structure: [],
    agents_needed: new Set(['architect']),
    tasks: [],
    tech_recommendations: {
      framework: 'next',
      version: '15',
      required_packages: ['react', 'next'],
      optional_packages: [],
    },
  };

  // Determine project structure based on type
  switch (projectType) {
    case 'landing':
      plan.structure = [
        'app/page.tsx (Hero + Features)',
        'app/layout.tsx',
        'components/sections/',
        'public/assets/',
      ];
      break;

    case 'portfolio':
      plan.structure = [
        'app/page.tsx (Home)',
        'app/projects/page.tsx',
        'app/about/page.tsx',
        'app/contact/page.tsx',
        'components/portfolio/',
        'lib/projects-data.ts',
      ];
      break;

    case 'blog':
      plan.structure = [
        'app/page.tsx',
        'app/blog/page.tsx',
        'app/blog/[slug]/page.tsx',
        'content/posts/',
        'lib/mdx.ts',
        'components/blog/',
      ];
      plan.agents_needed.add('content');
      plan.tech_recommendations.required_packages.push(
        'next-mdx-remote',
        'gray-matter',
        'remark-gfm',
        'rehype-highlight'
      );
      break;

    case 'ecommerce':
      plan.structure = [
        'app/page.tsx',
        'app/products/page.tsx',
        'app/products/[id]/page.tsx',
        'app/cart/page.tsx',
        'app/checkout/page.tsx',
        'lib/stripe.ts',
        'components/commerce/',
      ];
      plan.tech_recommendations.required_packages.push('stripe');
      break;

    default: // custom
      plan.structure = [
        'app/page.tsx',
        'app/layout.tsx',
        'components/',
        'lib/',
      ];
  }

  // Analyze features and assign agents
  features.forEach((feature) => {
    switch (feature) {
      case '3d-effects':
      case 'threejs':
        plan.agents_needed.add('threejs');
        plan.tech_recommendations.required_packages.push('three', '@types/three');
        plan.structure.push('components/3d/');
        break;

      case 'shaders':
      case 'liquid-chrome':
      case 'void-waves':
        plan.agents_needed.add('shader');
        plan.tech_recommendations.required_packages.push('three');
        plan.structure.push('shaders/');
        break;

      case 'particles':
      case 'particle-background':
        plan.agents_needed.add('canvas');
        plan.structure.push('components/effects/');
        break;

      case 'glass-morphism':
      case 'glassmorphism':
        plan.agents_needed.add('design-system');
        break;

      case 'audio':
      case 'sound':
        plan.agents_needed.add('audio');
        plan.tech_recommendations.optional_packages.push('tone');
        break;

      case 'animations':
      case 'framer-motion':
        plan.agents_needed.add('animation');
        plan.tech_recommendations.required_packages.push('framer-motion');
        break;

      case 'blog':
      case 'mdx':
        plan.agents_needed.add('content');
        plan.tech_recommendations.required_packages.push(
          'next-mdx-remote',
          'gray-matter',
          'remark-gfm',
          'rehype-highlight'
        );
        break;

      default:
        console.log(`[Architect Agent] Unknown feature: ${feature}`);
    }
  });

  // Design system agent always needed for styling
  plan.agents_needed.add('design-system');

  return plan;
}

function generateTaskPlan(projectId, plan) {
  const tasks = [];
  const agentsArray = Array.from(plan.agents_needed);

  // Phase 1: Planning & Design (architect + design-system)
  const planningTask = {
    website_project_id: projectId,
    agent_name: 'architect',
    task_type: 'plan',
    title: 'Create project architecture and file structure',
    description: `Define folder structure, routing, and component hierarchy. Structure: ${plan.structure.join(', ')}`,
    priority: 'urgent',
    estimated_duration_minutes: 30,
  };
  tasks.push(planningTask);

  const designSystemTask = {
    website_project_id: projectId,
    agent_name: 'design-system',
    task_type: 'design',
    title: 'Create design system and theme',
    description: 'Define color palette, typography, spacing, glass-morphism components, CSS variables',
    priority: 'high',
    estimated_duration_minutes: 45,
  };
  tasks.push(designSystemTask);

  // Phase 2: Content & Structure (if blog/content needed)
  if (agentsArray.includes('content')) {
    tasks.push({
      website_project_id: projectId,
      agent_name: 'content',
      task_type: 'implement',
      title: 'Set up MDX blog system',
      description: 'Configure next-mdx-remote, gray-matter, create blog layout and post templates',
      priority: 'high',
      estimated_duration_minutes: 60,
    });
  }

  // Phase 3: Visual Effects (3D, shaders, particles)
  if (agentsArray.includes('threejs')) {
    tasks.push({
      website_project_id: projectId,
      agent_name: 'threejs',
      task_type: 'implement',
      title: 'Implement Three.js 3D effects',
      description: 'Create 3D scenes, floating orbs, camera controls, lighting',
      priority: 'medium',
      estimated_duration_minutes: 90,
    });
  }

  if (agentsArray.includes('shader')) {
    tasks.push({
      website_project_id: projectId,
      agent_name: 'shader',
      task_type: 'implement',
      title: 'Create GLSL shaders',
      description: 'Develop custom shaders (liquid chrome, void waves, etc.)',
      priority: 'medium',
      estimated_duration_minutes: 120,
    });
  }

  if (agentsArray.includes('canvas')) {
    tasks.push({
      website_project_id: projectId,
      agent_name: 'canvas',
      task_type: 'implement',
      title: 'Build canvas particle system',
      description: 'Create interactive particle backgrounds with mouse tracking',
      priority: 'medium',
      estimated_duration_minutes: 60,
    });
  }

  if (agentsArray.includes('animation')) {
    tasks.push({
      website_project_id: projectId,
      agent_name: 'animation',
      task_type: 'implement',
      title: 'Add animations and transitions',
      description: 'Implement page transitions, scroll animations, micro-interactions',
      priority: 'low',
      estimated_duration_minutes: 45,
    });
  }

  // Phase 4: Quality Assurance
  tasks.push({
    website_project_id: projectId,
    agent_name: 'qa',
    task_type: 'test',
    title: 'Performance optimization and testing',
    description: 'Lighthouse audit, bundle size optimization, browser compatibility',
    priority: 'high',
    estimated_duration_minutes: 60,
  });

  // Phase 5: Deployment
  tasks.push({
    website_project_id: projectId,
    agent_name: 'deployment',
    task_type: 'deploy',
    title: 'Deploy to production',
    description: 'Configure Vercel, set up environment variables, deploy site',
    priority: 'urgent',
    estimated_duration_minutes: 30,
  });

  return tasks;
}

// ============================================================================
// ORCHESTRATION
// ============================================================================

async function createProject(name, description, projectType, features, tier) {
  const startTime = Date.now();

  console.log(`\n[Architect Agent] Creating project: ${name}`);
  console.log(`[Architect Agent] Type: ${projectType}, Features: ${features.join(', ')}`);

  // Analyze requirements
  const plan = analyzeRequirements(projectType, features);
  console.log(`[Architect Agent] Architecture plan generated:`);
  console.log(`  - Agents needed: ${Array.from(plan.agents_needed).join(', ')}`);
  console.log(`  - Structure: ${plan.structure.length} directories/files`);
  console.log(`  - Packages: ${plan.tech_recommendations.required_packages.join(', ')}`);

  // Create project in database
  const projectResult = await mcpRequest('createWebsiteProject', {
    name,
    description,
    project_type: projectType,
    features,
    tier,
    tech_stack: plan.tech_recommendations,
  });

  const projectId = projectResult.project?.id;
  if (!projectId) {
    throw new Error('Failed to create project - no ID returned');
  }

  console.log(`[Architect Agent] Project created: ${projectId}`);

  // Generate task plan
  const tasks = generateTaskPlan(projectId, plan);
  console.log(`[Architect Agent] Generated ${tasks.length} tasks`);

  // Assign tasks with dependency chain
  const taskIds = [];
  let previousTaskId = null;

  for (const taskData of tasks) {
    // Add dependency on previous task (sequential execution)
    if (previousTaskId) {
      taskData.depends_on = [previousTaskId];
    }

    const taskResult = await mcpRequest('assignAgentTask', taskData);
    const taskId = taskResult.task?.id;

    if (taskId) {
      taskIds.push(taskId);
      previousTaskId = taskId;
      console.log(`[Architect Agent] ✓ Assigned: ${taskData.title} (${taskData.agent_name})`);
    }
  }

  const executionTime = Date.now() - startTime;

  // Log analytics
  await logAnalytics('project_orchestrated', {
    project_type: projectType,
    features,
    agents_count: plan.agents_needed.size,
    tasks_count: tasks.length,
  }, projectId, executionTime);

  console.log(`[Architect Agent] Orchestration complete (${executionTime}ms)`);
  console.log(`[Architect Agent] Next steps: Specialized agents will execute tasks in order`);

  return {
    project_id: projectId,
    task_ids: taskIds,
    plan,
  };
}

async function orchestrateProject(projectId) {
  const startTime = Date.now();

  console.log(`\n[Architect Agent] Orchestrating project: ${projectId}`);

  // Get project details
  const projectsResult = await mcpRequest('getWebsiteProjects', { project_id: projectId });
  const project = projectsResult.projects?.[0];

  if (!project) {
    throw new Error(`Project not found: ${projectId}`);
  }

  console.log(`[Architect Agent] Project: ${project.name}`);
  console.log(`[Architect Agent] Status: ${project.status}, Completion: ${project.completion_percentage}%`);

  // Get all tasks for this project (would need a new MCP tool for this)
  // For now, just update project status
  await mcpRequest('updateWebsiteProject', {
    project_id: projectId,
    status: 'in_progress',
  });

  const executionTime = Date.now() - startTime;
  await logAnalytics('orchestration_check', {
    status: project.status,
    completion: project.completion_percentage,
  }, projectId, executionTime);

  console.log(`[Architect Agent] Orchestration check complete`);
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Architect Agent - Master Website Building Orchestrator

Usage:
  node architect-agent.js --project-name "My Site" --features "3d-effects,blog"
  node architect-agent.js --project-id <uuid> --orchestrate

Options:
  --project-name      Name of the website project (required for new projects)
  --description       Project description
  --project-type      Type: custom|landing|portfolio|ecommerce|blog (default: custom)
  --features          Comma-separated features (3d-effects,particles,glass-morphism,blog,etc.)
  --tier              Pricing tier: quick_launch|standard|premium|enterprise (default: standard)
  --project-id        Existing project ID to orchestrate
  --orchestrate       Run orchestration on existing project

Examples:
  # Create new portfolio with 3D effects
  node architect-agent.js --project-name "John Doe Portfolio" \\
    --project-type portfolio --features "3d-effects,particles,glass-morphism"

  # Create blog site
  node architect-agent.js --project-name "Tech Blog" \\
    --project-type blog --features "blog,animations"

  # Orchestrate existing project
  node architect-agent.js --project-id abc-123 --orchestrate

Environment Variables:
  MCP_URL            MCP API endpoint (default: https://dashboard.advancingtechnology.online/api/mcp)
  MCP_API_KEY        API key for authentication (default: pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y)
    `);
    return;
  }

  try {
    const projectName = args.find((arg, i) => args[i - 1] === '--project-name');
    const description = args.find((arg, i) => args[i - 1] === '--description') || '';
    const projectType = args.find((arg, i) => args[i - 1] === '--project-type') || 'custom';
    const featuresStr = args.find((arg, i) => args[i - 1] === '--features') || '';
    const features = featuresStr ? featuresStr.split(',').map(f => f.trim()) : [];
    const tier = args.find((arg, i) => args[i - 1] === '--tier') || 'standard';
    const projectId = args.find((arg, i) => args[i - 1] === '--project-id');
    const orchestrate = args.includes('--orchestrate');

    if (projectId && orchestrate) {
      await orchestrateProject(projectId);
    } else if (projectName) {
      await createProject(projectName, description, projectType, features, tier);
    } else {
      console.error('Error: --project-name or (--project-id --orchestrate) required');
      console.log('Use --help for usage information');
      process.exit(1);
    }

  } catch (error) {
    console.error('[Architect Agent] Fatal error:', error.message);
    await logAnalytics('orchestration_error', {
      error_type: error.name,
      error_message: error.message,
    }, null, null);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  analyzeRequirements,
  generateTaskPlan,
  createProject,
  orchestrateProject,
  mcpRequest,
  logAnalytics,
};
