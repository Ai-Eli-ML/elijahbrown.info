#!/usr/bin/env node

/**
 * Canvas Agent - Phase 3 Effect Agent
 *
 * Responsibilities:
 * - Builds Canvas 2D particle systems
 * - Implements mouse interaction and tracking
 * - Creates ParticleBackground component with depth layering
 * - Manages particle physics and connection lines
 * - Saves canvas components via MCP API
 *
 * Features:
 * - Multi-layer particle depth system
 * - Mouse attraction/repulsion
 * - Dynamic connection lines between particles
 * - Performance-optimized rendering
 */

const https = require('https');

const MCP_CONFIG = {
  apiKey: 'pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y',
  baseUrl: 'https://dashboard.advancingtechnology.online/api/mcp',
  agentName: 'canvas-agent',
  projectId: 'elijahbrown.info'
};

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function log(message, color = 'cyan') {
  console.log(`${colors[color]}${colors.bright}[Canvas Agent]${colors.reset} ${message}`);
}

/**
 * Make MCP API request
 */
function mcpRequest(tool, params) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      tool,
      params,
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
          if (response.success) {
            resolve(response.data);
          } else {
            reject(new Error(response.error || 'MCP API error'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Generate ParticleBackground Component
 */
function generateParticleBackgroundComponent() {
  return `'use client';

import { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number; // 0-1, for parallax effect
  color: string;
  alpha: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  color?: string;
  connectionDistance?: number;
  mouseInteraction?: boolean;
  mouseRadius?: number;
  className?: string;
}

export default function ParticleBackground({
  particleCount = 100,
  color = '#00ffff',
  connectionDistance = 150,
  mouseInteraction = true,
  mouseRadius = 200,
  className = ''
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number | null>(null);

  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();

    // Create particles with depth layers
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random(); // 0 = far, 1 = near
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (0.5 + depth * 0.5),
        vy: (Math.random() - 0.5) * (0.5 + depth * 0.5),
        radius: 1 + depth * 2,
        depth,
        color,
        alpha: 0.3 + depth * 0.4
      });
    }
    particlesRef.current = particles;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((particle) => {
        // Apply mouse interaction
        if (mouseInteraction && mouse.active) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);

            // Repel particles (negative force for attraction)
            particle.vx -= Math.cos(angle) * force * 0.5 * particle.depth;
            particle.vy -= Math.sin(angle) * force * 0.5 * particle.depth;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
      });

      // Draw connection lines between nearby particles
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Line opacity based on distance and depth
            const opacity = (1 - distance / connectionDistance) * Math.min(p1.depth, p2.depth);

            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.globalAlpha = opacity * 0.3;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      // Reposition particles if they're out of bounds
      particles.forEach(particle => {
        particle.x = Math.min(particle.x, canvas.width);
        particle.y = Math.min(particle.y, canvas.height);
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [particleCount, color, connectionDistance, mouseInteraction, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={\`particle-background \${className}\`}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1
      }}
    />
  );
}`;
}

/**
 * Generate Interactive Canvas Network Component
 */
function generateCanvasNetworkComponent() {
  return `'use client';

import { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  color: string;
  size: number;
}

interface CanvasNetworkProps {
  nodeCount?: number;
  maxConnections?: number;
  color?: string;
  className?: string;
}

export default function CanvasNetwork({
  nodeCount = 50,
  maxConnections = 3,
  color = '#00ffff',
  className = ''
}: CanvasNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();

    // Create nodes
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        color,
        size: 3 + Math.random() * 3
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * maxConnections) + 1;
      for (let j = 0; j < connectionCount; j++) {
        const target = Math.floor(Math.random() * nodes.length);
        if (target !== i && !node.connections.includes(target)) {
          node.connections.push(target);
        }
      }
    });

    nodesRef.current = nodes;

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;

      // Update nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(canvas.width, node.x));
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }
      });

      // Draw connections
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      nodes.forEach(node => {
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });

      // Draw nodes
      ctx.globalAlpha = 0.8;
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + 2, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 0.8;
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [nodeCount, maxConnections, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1
      }}
    />
  );
}`;
}

/**
 * Save component to component library
 */
async function saveComponent(name, code, description, tags) {
  log(`Saving canvas component: ${name}...`, 'blue');

  try {
    await mcpRequest('saveComponent', {
      name,
      code,
      description,
      category: 'effects',
      tags,
      framework: 'react',
      language: 'typescript'
    });

    log(`✓ Saved ${name} to component library`, 'green');
    return true;
  } catch (error) {
    log(`Error saving ${name}: ${error.message}`, 'yellow');
    return false;
  }
}

/**
 * Update agent task status
 */
async function updateTaskStatus(filesCreated, output) {
  log('Updating agent task status...', 'blue');

  try {
    await mcpRequest('updateAgentTask', {
      agentName: MCP_CONFIG.agentName,
      projectId: MCP_CONFIG.projectId,
      status: 'completed',
      files_created: filesCreated,
      output
    });

    log('✓ Task status updated', 'green');
  } catch (error) {
    log(`Error updating task: ${error.message}`, 'yellow');
  }
}

/**
 * Main execution
 */
async function main() {
  log('Starting Canvas Agent - Phase 3 Effect Agent', 'magenta');

  const filesCreated = [];
  const output = {
    componentsGenerated: [],
    timestamp: new Date().toISOString()
  };

  // Generate ParticleBackground component
  log('Generating ParticleBackground component...', 'blue');
  const particleComponent = generateParticleBackgroundComponent();

  const particleSaved = await saveComponent(
    'ParticleBackground',
    particleComponent,
    'An interactive particle background with mouse interaction, depth layering, and dynamic connection lines',
    ['canvas', 'particles', 'interactive', 'mouse', 'animation']
  );

  if (particleSaved) {
    filesCreated.push('ParticleBackground.tsx');
    output.componentsGenerated.push({
      name: 'ParticleBackground',
      type: 'Canvas 2D Particle System',
      features: [
        'Multi-layer depth system',
        'Mouse interaction (attraction/repulsion)',
        'Dynamic connection lines',
        'Edge bouncing physics',
        'Performance optimized'
      ]
    });
  }

  // Generate CanvasNetwork component
  log('Generating CanvasNetwork component...', 'blue');
  const networkComponent = generateCanvasNetworkComponent();

  const networkSaved = await saveComponent(
    'CanvasNetwork',
    networkComponent,
    'A connected network of animated nodes with dynamic relationships and smooth motion',
    ['canvas', 'network', 'nodes', 'animation', 'connections']
  );

  if (networkSaved) {
    filesCreated.push('CanvasNetwork.tsx');
    output.componentsGenerated.push({
      name: 'CanvasNetwork',
      type: 'Canvas Network Visualization',
      features: [
        'Connected node graph',
        'Random network topology',
        'Smooth node animation',
        'Glow effects',
        'Responsive design'
      ]
    });
  }

  // Update task status
  await updateTaskStatus(filesCreated, output);

  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('Canvas Agent Execution Complete', 'green');
  log(`Components Generated: ${output.componentsGenerated.length}`, 'cyan');
  log(`Files Created: ${filesCreated.length}`, 'cyan');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
}

// Execute if run directly
if (require.main === module) {
  main().catch(error => {
    log(`Fatal error: ${error.message}`, 'yellow');
    process.exit(1);
  });
}

module.exports = { generateParticleBackgroundComponent, generateCanvasNetworkComponent };
