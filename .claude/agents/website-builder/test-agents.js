#!/usr/bin/env node

/**
 * Test Script for Website Builder Phase 3 Effect Agents
 *
 * This script tests all four effect agents:
 * 1. ThreeJS Agent
 * 2. Shader Agent
 * 3. Canvas Agent
 * 4. Audio Agent
 *
 * Tests include:
 * - MCP API connectivity
 * - Component generation
 * - Component saving
 * - Task status updates
 */

const https = require('https');
const { spawn } = require('child_process');
const path = require('path');

const MCP_CONFIG = {
  apiKey: 'pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y',
  baseUrl: 'https://dashboard.advancingtechnology.online/api/mcp'
};

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function log(message, color = 'cyan') {
  console.log(`${colors[color]}${colors.bright}[Test Suite]${colors.reset} ${message}`);
}

/**
 * Test MCP API connectivity
 */
async function testMCPConnection() {
  log('Testing MCP API connectivity...', 'blue');

  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      tool: 'getReusableComponents',
      params: {
        category: 'effects'
      },
      apiKey: MCP_CONFIG.apiKey
    });

    const options = {
      hostname: 'dashboard.advancingtechnology.online',
      path: '/api/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (response.success || res.statusCode === 200) {
            log('✓ MCP API connection successful', 'green');
            resolve(true);
          } else {
            log(`✗ MCP API error: ${response.error || 'Unknown error'}`, 'yellow');
            resolve(false);
          }
        } catch (e) {
          log(`✗ MCP API parse error: ${e.message}`, 'yellow');
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      log(`✗ MCP API connection failed: ${error.message}`, 'red');
      resolve(false);
    });

    req.setTimeout(10000, () => {
      log('✗ MCP API request timeout', 'yellow');
      req.destroy();
      resolve(false);
    });

    req.write(data);
    req.end();
  });
}

/**
 * Run an agent and capture output
 */
async function runAgent(agentName) {
  log(`Running ${agentName}...`, 'blue');

  return new Promise((resolve, reject) => {
    const agentPath = path.join(__dirname, `${agentName}.js`);

    const agent = spawn('node', [agentPath], {
      cwd: __dirname,
      stdio: 'pipe'
    });

    let stdout = '';
    let stderr = '';

    agent.stdout.on('data', (data) => {
      const output = data.toString();
      stdout += output;
      // Echo agent output with indentation
      output.split('\n').forEach(line => {
        if (line.trim()) {
          console.log(`  ${line}`);
        }
      });
    });

    agent.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    agent.on('close', (code) => {
      if (code === 0) {
        log(`✓ ${agentName} completed successfully`, 'green');
        resolve({ success: true, stdout, stderr });
      } else {
        log(`✗ ${agentName} failed with code ${code}`, 'red');
        if (stderr) {
          console.error(stderr);
        }
        resolve({ success: false, stdout, stderr, code });
      }
    });

    agent.on('error', (error) => {
      log(`✗ ${agentName} error: ${error.message}`, 'red');
      resolve({ success: false, error: error.message });
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      log(`✗ ${agentName} timeout (30s)`, 'yellow');
      agent.kill();
      resolve({ success: false, timeout: true });
    }, 30000);
  });
}

/**
 * Main test suite
 */
async function runTests() {
  console.log('\n' + '═'.repeat(60));
  log('Website Builder Agent System - Phase 3 Test Suite', 'magenta');
  console.log('═'.repeat(60) + '\n');

  const results = {
    mcpConnection: false,
    agents: {}
  };

  // Test 1: MCP API Connection
  console.log('\n' + '─'.repeat(60));
  log('Test 1: MCP API Connectivity', 'cyan');
  console.log('─'.repeat(60));
  results.mcpConnection = await testMCPConnection();

  if (!results.mcpConnection) {
    log('⚠ Warning: MCP API not accessible. Agents may fail to save components.', 'yellow');
    log('Continuing with agent tests...', 'blue');
  }

  // Test 2: Run all agents
  const agents = [
    'threejs-agent',
    'shader-agent',
    'canvas-agent',
    'audio-agent'
  ];

  for (const agent of agents) {
    console.log('\n' + '─'.repeat(60));
    log(`Test: ${agent}`, 'cyan');
    console.log('─'.repeat(60));

    const result = await runAgent(agent);
    results.agents[agent] = result;

    // Wait 2 seconds between agents to avoid rate limiting
    if (agents.indexOf(agent) < agents.length - 1) {
      log('Waiting 2 seconds before next agent...', 'blue');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(60));
  log('Test Summary', 'magenta');
  console.log('═'.repeat(60) + '\n');

  const successCount = Object.values(results.agents).filter(r => r.success).length;
  const totalCount = Object.keys(results.agents).length;

  log(`MCP API Connection: ${results.mcpConnection ? '✓ PASS' : '✗ FAIL'}`, results.mcpConnection ? 'green' : 'red');
  log(`Agents Passed: ${successCount}/${totalCount}`, successCount === totalCount ? 'green' : 'yellow');

  console.log();
  Object.entries(results.agents).forEach(([name, result]) => {
    const status = result.success ? '✓ PASS' : '✗ FAIL';
    const color = result.success ? 'green' : 'red';
    log(`  ${name}: ${status}`, color);
  });

  console.log('\n' + '═'.repeat(60) + '\n');

  if (successCount === totalCount) {
    log('🎉 All tests passed!', 'green');
    return 0;
  } else {
    log('⚠ Some tests failed. Check output above for details.', 'yellow');
    return 1;
  }
}

// Run tests
if (require.main === module) {
  runTests()
    .then(exitCode => {
      process.exit(exitCode);
    })
    .catch(error => {
      log(`Fatal error: ${error.message}`, 'red');
      console.error(error);
      process.exit(1);
    });
}

module.exports = { testMCPConnection, runAgent };
