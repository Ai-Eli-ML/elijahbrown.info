#!/usr/bin/env node

/**
 * Three.js Agent - Phase 3 Effect Agent
 *
 * Responsibilities:
 * - Creates 3D WebGL scenes with Three.js
 * - Implements FloatingOrb and 3D effect components
 * - Manages scene composition, lighting, and camera controls
 * - Queries component library for existing 3D components
 * - Saves new Three.js components via MCP API
 *
 * Dependencies: three, @types/three, framer-motion
 */

const https = require('https');

const MCP_CONFIG = {
  apiKey: 'pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y',
  baseUrl: 'https://dashboard.advancingtechnology.online/api/mcp',
  agentName: 'threejs-agent',
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
  console.log(`${colors[color]}${colors.bright}[ThreeJS Agent]${colors.reset} ${message}`);
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
 * Query component library for existing Three.js components
 */
async function queryComponentLibrary() {
  log('Querying component library for Three.js components...', 'blue');

  try {
    const components = await mcpRequest('getReusableComponents', {
      category: 'effects',
      tags: ['threejs', '3d', 'webgl']
    });

    log(`Found ${components.length} existing Three.js components`, 'green');
    return components;
  } catch (error) {
    log(`Error querying component library: ${error.message}`, 'yellow');
    return [];
  }
}

/**
 * Generate FloatingOrb Component
 */
function generateFloatingOrbComponent(options = {}) {
  const {
    size = 'medium',
    color = 'cyan',
    speed = 1,
    complexity = 'medium'
  } = options;

  const sizeMap = {
    small: { radius: 1, segments: 32 },
    medium: { radius: 2, segments: 64 },
    large: { radius: 3, segments: 128 }
  };

  const colorMap = {
    cyan: '#00ffff',
    magenta: '#ff00ff',
    blue: '#0066ff',
    purple: '#8800ff',
    gold: '#ffd700'
  };

  const config = sizeMap[size];
  const hexColor = colorMap[color];

  return `'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface FloatingOrbProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  speed?: number;
  className?: string;
}

export default function FloatingOrb({
  size = '${size}',
  color = '${hexColor}',
  speed = ${speed},
  className = ''
}: FloatingOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    orb: THREE.Mesh;
    animationId: number | null;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create orb geometry
    const geometry = new THREE.SphereGeometry(${config.radius}, ${config.segments}, ${config.segments});

    // Create shader material for glowing effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) }
      },
      vertexShader: \`
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);

          // Subtle vertex displacement
          vec3 pos = position + normal * sin(time + position.y * 3.0) * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      \`,
      fragmentShader: \`
        uniform vec3 color;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          // Fresnel effect for glowing edges
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);

          // Animated glow
          float pulse = sin(time * 2.0) * 0.3 + 0.7;

          vec3 finalColor = color * (0.5 + fresnel * pulse);
          float alpha = 0.6 + fresnel * 0.4;

          gl_FragColor = vec4(finalColor, alpha);
        }
      \`,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(color, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    sceneRef.current = { scene, camera, renderer, orb, animationId: null };

    // Animation loop
    let time = 0;
    function animate() {
      if (!sceneRef.current) return;

      time += 0.01 * speed;

      // Update shader uniforms
      if (sceneRef.current.orb.material instanceof THREE.ShaderMaterial) {
        sceneRef.current.orb.material.uniforms.time.value = time;
      }

      // Rotate orb
      sceneRef.current.orb.rotation.x += 0.001 * speed;
      sceneRef.current.orb.rotation.y += 0.002 * speed;

      // Float animation
      sceneRef.current.orb.position.y = Math.sin(time) * 0.5;

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !sceneRef.current) return;

      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      sceneRef.current?.renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={\`floating-orb \${className}\`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}`;
}

/**
 * Generate 3D Particle Field Component
 */
function generateParticleFieldComponent() {
  return `'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  speed?: number;
  className?: string;
}

export default function ParticleField({
  count = 5000,
  color = '#00ffff',
  speed = 1,
  className = ''
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    animationId: number | null;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      velocities[i] = (Math.random() - 0.5) * 0.1;
      velocities[i + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i + 2] = (Math.random() - 0.5) * 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    // Create material
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.5,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    sceneRef.current = { scene, camera, renderer, particles, animationId: null };

    // Animation loop
    function animate() {
      if (!sceneRef.current) return;

      const positions = sceneRef.current.particles.geometry.attributes.position.array as Float32Array;
      const velocities = sceneRef.current.particles.geometry.attributes.velocity.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] * speed;
        positions[i + 1] += velocities[i + 1] * speed;
        positions[i + 2] += velocities[i + 2] * speed;

        // Wrap around
        if (Math.abs(positions[i]) > 50) positions[i] *= -1;
        if (Math.abs(positions[i + 1]) > 50) positions[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 50) positions[i + 2] *= -1;
      }

      sceneRef.current.particles.geometry.attributes.position.needsUpdate = true;
      sceneRef.current.particles.rotation.y += 0.0005 * speed;

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !sceneRef.current) return;

      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      sceneRef.current?.renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [count, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}`;
}

/**
 * Save component to component library
 */
async function saveComponent(name, code, description, tags) {
  log(`Saving component: ${name}...`, 'blue');

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
  log('Starting Three.js Agent - Phase 3 Effect Agent', 'magenta');

  const filesCreated = [];
  const output = {
    componentsGenerated: [],
    libraryQuery: null,
    timestamp: new Date().toISOString()
  };

  // Query existing components
  const existingComponents = await queryComponentLibrary();
  output.libraryQuery = {
    count: existingComponents.length,
    components: existingComponents.map(c => c.name)
  };

  // Generate FloatingOrb component
  log('Generating FloatingOrb component...', 'blue');
  const orbComponent = generateFloatingOrbComponent({
    size: 'medium',
    color: 'cyan',
    speed: 1,
    complexity: 'medium'
  });

  const orbSaved = await saveComponent(
    'FloatingOrb',
    orbComponent,
    'A mesmerizing 3D floating orb with shader-based glow effects and smooth animations',
    ['threejs', '3d', 'webgl', 'shader', 'animation']
  );

  if (orbSaved) {
    filesCreated.push('FloatingOrb.tsx');
    output.componentsGenerated.push({
      name: 'FloatingOrb',
      type: '3D Mesh with Custom Shaders',
      features: ['Vertex displacement', 'Fresnel glow', 'Floating animation', 'Responsive canvas']
    });
  }

  // Generate ParticleField component
  log('Generating ParticleField component...', 'blue');
  const particleComponent = generateParticleFieldComponent();

  const particleSaved = await saveComponent(
    'ParticleField3D',
    particleComponent,
    'A stunning 3D particle field with thousands of animated particles creating an immersive depth effect',
    ['threejs', '3d', 'particles', 'webgl', 'animation']
  );

  if (particleSaved) {
    filesCreated.push('ParticleField3D.tsx');
    output.componentsGenerated.push({
      name: 'ParticleField3D',
      type: '3D Particle System',
      features: ['5000+ particles', 'Physics simulation', 'Additive blending', 'Responsive']
    });
  }

  // Update task status
  await updateTaskStatus(filesCreated, output);

  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('Three.js Agent Execution Complete', 'green');
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

module.exports = { generateFloatingOrbComponent, generateParticleFieldComponent, queryComponentLibrary };
