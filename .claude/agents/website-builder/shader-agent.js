#!/usr/bin/env node

/**
 * Shader Agent - Phase 3 Effect Agent
 *
 * Responsibilities:
 * - Writes custom GLSL shaders (vertex + fragment)
 * - Implements liquid-chrome, void-waves, holographic effects from library
 * - Creates shader-based background components
 * - Manages shader uniforms and animations
 * - Saves shader components via MCP API
 *
 * Shader Library:
 * - liquid-chrome.glsl: Flowing metallic chrome effect
 * - void-waves.glsl: Dark undulating void patterns
 * - holographic.glsl: Rainbow holographic shimmer
 */

const https = require('https');

const MCP_CONFIG = {
  apiKey: 'pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y',
  baseUrl: 'https://dashboard.advancingtechnology.online/api/mcp',
  agentName: 'shader-agent',
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
  console.log(`${colors[color]}${colors.bright}[Shader Agent]${colors.reset} ${message}`);
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
 * Shader Library - Pre-built GLSL shaders
 */
const SHADER_LIBRARY = {
  'liquid-chrome': {
    vertex: `
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragment: `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      varying vec3 vPosition;

      // Noise function for organic flow
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      // Smooth noise
      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);

        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));

        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      // Fractal Brownian Motion for complex patterns
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;

        for (int i = 0; i < 5; i++) {
          value += amplitude * smoothNoise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }

        return value;
      }

      void main() {
        vec2 uv = vUv;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;

        // Flowing chrome effect
        float t = time * 0.3;
        vec2 flowUv = uv + vec2(
          fbm(uv * 3.0 + vec2(t, t * 0.5)) * 0.2,
          fbm(uv * 3.0 + vec2(t * 0.7, t)) * 0.2
        );

        // Multiple layers of flow
        float pattern = fbm(flowUv * 4.0 + time * 0.1);
        pattern += fbm(flowUv * 8.0 - time * 0.15) * 0.5;
        pattern += fbm(flowUv * 16.0 + time * 0.2) * 0.25;

        // Chrome color gradient
        vec3 color1 = vec3(0.7, 0.8, 0.9); // Light chrome
        vec3 color2 = vec3(0.2, 0.3, 0.4); // Dark chrome
        vec3 color3 = vec3(0.9, 0.95, 1.0); // Bright highlight

        // Mix colors based on pattern
        vec3 finalColor = mix(color1, color2, pattern);
        finalColor = mix(finalColor, color3, smoothstep(0.6, 0.8, pattern));

        // Add metallic shimmer
        float shimmer = sin(pattern * 10.0 + time * 2.0) * 0.5 + 0.5;
        finalColor += shimmer * 0.1;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  },

  'void-waves': {
    vertex: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragment: `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;

      // Improved noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;

        // Undulating void waves
        float t = time * 0.2;
        float wave = 0.0;

        // Multiple wave layers
        for (float i = 1.0; i < 6.0; i++) {
          float freq = i * 0.5;
          float amp = 1.0 / i;
          wave += snoise(p * freq + vec2(t * i * 0.1, t * i * 0.15)) * amp;
        }

        // Dark void colors
        vec3 color1 = vec3(0.05, 0.0, 0.1);   // Deep purple-black
        vec3 color2 = vec3(0.0, 0.0, 0.0);    // Pure void
        vec3 color3 = vec3(0.15, 0.0, 0.2);   // Lighter purple edges

        // Create depth with wave patterns
        float depth = smoothstep(-1.0, 1.0, wave);
        vec3 finalColor = mix(color2, color1, depth);

        // Add edge highlights
        float edge = abs(wave);
        finalColor = mix(finalColor, color3, smoothstep(0.6, 0.9, edge) * 0.3);

        // Subtle shimmer in the void
        float shimmer = snoise(p * 10.0 + time * 0.5) * 0.02;
        finalColor += shimmer;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  },

  'holographic': {
    vertex: `
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragment: `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      varying vec3 vNormal;

      // HSV to RGB conversion for rainbow colors
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        vec2 uv = vUv;

        // Animated rainbow shift
        float hue = uv.x + uv.y * 0.5 + time * 0.2;
        hue = fract(hue);

        // Create holographic interference patterns
        float pattern = sin(uv.x * 30.0 + time * 2.0) * sin(uv.y * 30.0 - time * 1.5);
        pattern = pattern * 0.5 + 0.5;

        // Rainbow color with interference
        vec3 rainbow = hsv2rgb(vec3(hue, 0.8, 0.9));

        // Add shimmer effect
        float shimmer = sin(uv.x * 50.0 + uv.y * 50.0 + time * 3.0) * 0.5 + 0.5;
        rainbow += shimmer * 0.2;

        // Fresnel-like edge glow
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
        rainbow += fresnel * 0.3;

        gl_FragColor = vec4(rainbow * (0.7 + pattern * 0.3), 0.9);
      }
    `
  }
};

/**
 * Generate React component with shader
 */
function generateShaderComponent(shaderName, shaderCode) {
  const componentName = shaderName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');

  return `'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ${componentName}BackgroundProps {
  speed?: number;
  className?: string;
}

export default function ${componentName}Background({
  speed = 1,
  className = ''
}: ${componentName}BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    mesh: THREE.Mesh;
    animationId: number | null;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: {
          value: new THREE.Vector2(
            canvasRef.current.clientWidth,
            canvasRef.current.clientHeight
          )
        }
      },
      vertexShader: \`${shaderCode.vertex}\`,
      fragmentShader: \`${shaderCode.fragment}\`,
      transparent: true
    });

    // Create plane mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    sceneRef.current = { scene, camera, renderer, mesh, animationId: null };

    // Animation loop
    let time = 0;
    function animate() {
      if (!sceneRef.current) return;

      time += 0.016 * speed;

      if (sceneRef.current.mesh.material instanceof THREE.ShaderMaterial) {
        sceneRef.current.mesh.material.uniforms.time.value = time;
      }

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !sceneRef.current) return;

      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      sceneRef.current.renderer.setSize(width, height);

      if (sceneRef.current.mesh.material instanceof THREE.ShaderMaterial) {
        sceneRef.current.mesh.material.uniforms.resolution.value.set(width, height);
      }
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
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      className={\`${shaderName}-background \${className}\`}
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
    />
  );
}`;
}

/**
 * Save component to component library
 */
async function saveComponent(name, code, description, tags) {
  log(`Saving shader component: ${name}...`, 'blue');

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
  log('Starting Shader Agent - Phase 3 Effect Agent', 'magenta');

  const filesCreated = [];
  const output = {
    shadersGenerated: [],
    shaderLibrary: Object.keys(SHADER_LIBRARY),
    timestamp: new Date().toISOString()
  };

  // Generate components for each shader in library
  for (const [shaderName, shaderCode] of Object.entries(SHADER_LIBRARY)) {
    log(`Generating ${shaderName} shader component...`, 'blue');

    const component = generateShaderComponent(shaderName, shaderCode);
    const componentName = shaderName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Background';

    const descriptions = {
      'liquid-chrome': 'A mesmerizing flowing chrome shader with organic metallic patterns and smooth animations',
      'void-waves': 'A dark, undulating void shader creating deep atmospheric wave patterns perfect for mysterious backgrounds',
      'holographic': 'A vibrant rainbow holographic shader with interference patterns and shimmer effects'
    };

    const saved = await saveComponent(
      componentName,
      component,
      descriptions[shaderName],
      ['shader', 'glsl', 'webgl', 'background', shaderName]
    );

    if (saved) {
      filesCreated.push(`${componentName}.tsx`);
      output.shadersGenerated.push({
        name: componentName,
        shader: shaderName,
        features: ['Custom GLSL', 'Animated uniforms', 'Responsive', 'Performance optimized']
      });
    }
  }

  // Update task status
  await updateTaskStatus(filesCreated, output);

  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('Shader Agent Execution Complete', 'green');
  log(`Shaders Generated: ${output.shadersGenerated.length}`, 'cyan');
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

module.exports = { generateShaderComponent, SHADER_LIBRARY };
