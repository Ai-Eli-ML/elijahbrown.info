#!/usr/bin/env node

/**
 * Test Orchestration Script - Website Builder Agent System
 *
 * This script demonstrates the full workflow of the 3-agent system:
 * 1. Architect Agent creates project and assigns tasks
 * 2. Design System Agent executes design tasks
 * 3. Content MDX Agent executes content tasks
 *
 * Usage:
 *   node test-orchestration.js --full-demo
 *   node test-orchestration.js --test-architect
 *   node test-orchestration.js --test-design
 *   node test-orchestration.js --test-content
 */

const { createProject, mcpRequest: architectMCP } = require('./architect-agent.js');
const { createDesignForProject } = require('./design-system-agent.js');
const { setupBlogForProject } = require('./content-mdx-agent.js');

// ============================================================================
// TEST SCENARIOS
// ============================================================================

async function testArchitectAgent() {
  console.log('\n========================================');
  console.log('TEST 1: Architect Agent');
  console.log('========================================\n');

  try {
    const result = await createProject(
      'Test Portfolio Site',
      'A modern portfolio with 3D effects and blog',
      'portfolio',
      ['3d-effects', 'glass-morphism', 'blog', 'animations'],
      'standard'
    );

    console.log('\n✓ Architect Agent Test PASSED');
    console.log(`  Project ID: ${result.project_id}`);
    console.log(`  Tasks Created: ${result.task_ids.length}`);
    console.log(`  Agents Needed: ${result.plan.agents_needed.size}`);

    return result.project_id;

  } catch (error) {
    console.error('\n✗ Architect Agent Test FAILED:', error.message);
    throw error;
  }
}

async function testDesignSystemAgent(projectId) {
  console.log('\n========================================');
  console.log('TEST 2: Design System Agent');
  console.log('========================================\n');

  try {
    const result = await createDesignForProject(projectId, 'dark-glass');

    console.log('\n✓ Design System Agent Test PASSED');
    console.log(`  Theme: dark-glass`);
    console.log(`  CSS Variables Generated: ${result.css_variables.length} chars`);
    console.log(`  Glass Components: ${result.glass_components.length} chars`);
    console.log(`  Tailwind Config: ${result.tailwind_config.length} chars`);
    console.log(`  Library Components Found: ${result.library_components.length}`);

    return result;

  } catch (error) {
    console.error('\n✗ Design System Agent Test FAILED:', error.message);
    throw error;
  }
}

async function testContentMDXAgent(projectId) {
  console.log('\n========================================');
  console.log('TEST 3: Content MDX Agent');
  console.log('========================================\n');

  try {
    const result = await setupBlogForProject(projectId);

    console.log('\n✓ Content MDX Agent Test PASSED');
    console.log(`  MDX Utilities Generated: ${result.mdx_utilities.length} chars`);
    console.log(`  Blog Post Page: ${result.blog_post_page.length} chars`);
    console.log(`  Blog Listing Page: ${result.blog_listing_page.length} chars`);
    console.log(`  Sample Post: ${result.sample_post.length} chars`);

    return result;

  } catch (error) {
    console.error('\n✗ Content MDX Agent Test FAILED:', error.message);
    throw error;
  }
}

async function testMCPConnection() {
  console.log('\n========================================');
  console.log('TEST 0: MCP API Connection');
  console.log('========================================\n');

  try {
    // Test connection by listing tools
    const BASE_URL = process.env.MCP_URL || 'https://dashboard.advancingtechnology.online/api/mcp';
    const API_KEY = process.env.MCP_API_KEY || 'pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y';

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'test-connection',
        method: 'tools/list',
        params: {},
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    console.log('✓ MCP API Connection SUCCESSFUL');
    console.log(`  URL: ${BASE_URL}`);
    console.log(`  Status: ${response.status} ${response.statusText}`);

    if (data.result?.tools) {
      const websiteTools = data.result.tools.filter(t =>
        t.name.includes('Website') ||
        t.name.includes('Agent') ||
        t.name.includes('Component') ||
        t.name.includes('Builder')
      );
      console.log(`  Website Builder Tools Available: ${websiteTools.length}`);
      websiteTools.forEach(tool => {
        console.log(`    - ${tool.name}`);
      });
    }

    return true;

  } catch (error) {
    console.error('\n✗ MCP API Connection FAILED:', error.message);
    console.error('  Make sure the personal-dashboard MCP server is running');
    throw error;
  }
}

// ============================================================================
// FULL ORCHESTRATION TEST
// ============================================================================

async function runFullOrchestrationTest() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║  Website Builder Agent System Test    ║');
  console.log('║  Phase 2: Core Agents Orchestration   ║');
  console.log('╚════════════════════════════════════════╝\n');

  const startTime = Date.now();
  let projectId;

  try {
    // Test 0: MCP Connection
    await testMCPConnection();

    // Test 1: Architect Agent
    projectId = await testArchitectAgent();

    // Test 2: Design System Agent
    await testDesignSystemAgent(projectId);

    // Test 3: Content MDX Agent
    await testContentMDXAgent(projectId);

    const totalTime = Date.now() - startTime;

    console.log('\n========================================');
    console.log('ALL TESTS PASSED! ✓');
    console.log('========================================');
    console.log(`Total Execution Time: ${totalTime}ms (${(totalTime / 1000).toFixed(2)}s)`);
    console.log(`Project ID: ${projectId}`);
    console.log('\nNext Steps:');
    console.log('1. Check personal-dashboard for project and tasks');
    console.log('2. Review analytics in builder_analytics table');
    console.log('3. Agents are ready for production use');

  } catch (error) {
    console.error('\n========================================');
    console.error('TEST SUITE FAILED');
    console.error('========================================');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Test Orchestration Script - Website Builder Agent System

Usage:
  node test-orchestration.js --full-demo      Run complete orchestration test
  node test-orchestration.js --test-architect  Test architect agent only
  node test-orchestration.js --test-design     Test design system agent only
  node test-orchestration.js --test-content    Test content MDX agent only
  node test-orchestration.js --test-mcp        Test MCP connection only

Examples:
  # Run full demo (recommended)
  node test-orchestration.js --full-demo

  # Test individual agents
  node test-orchestration.js --test-architect

Environment Variables:
  MCP_URL         MCP API endpoint (default: https://dashboard.advancingtechnology.online/api/mcp)
  MCP_API_KEY     API key for authentication (default: pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y)
    `);
    return;
  }

  try {
    if (args.includes('--full-demo')) {
      await runFullOrchestrationTest();
    } else if (args.includes('--test-mcp')) {
      await testMCPConnection();
    } else if (args.includes('--test-architect')) {
      await testArchitectAgent();
    } else if (args.includes('--test-design')) {
      console.log('Note: This test requires a project ID. Running full demo instead.');
      await runFullOrchestrationTest();
    } else if (args.includes('--test-content')) {
      console.log('Note: This test requires a project ID. Running full demo instead.');
      await runFullOrchestrationTest();
    } else {
      console.log('No test specified. Running full demo...\n');
      await runFullOrchestrationTest();
    }

  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  testArchitectAgent,
  testDesignSystemAgent,
  testContentMDXAgent,
  testMCPConnection,
  runFullOrchestrationTest,
};
