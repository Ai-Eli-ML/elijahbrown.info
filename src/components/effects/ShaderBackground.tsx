'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './ShaderBackground.module.css';

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader - Void Waves
const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Noise function
  float noise(vec2 p) {
    return sin(p.x * 10.0 + time * 0.5) * sin(p.y * 10.0 + time * 0.3) * 0.5 + 0.5;
  }

  void main() {
    vec2 uv = vUv;

    // Create flowing waves
    float wave1 = sin(uv.x * 5.0 + time * 0.3) * 0.1;
    float wave2 = sin(uv.y * 3.0 - time * 0.2) * 0.1;
    float wave3 = sin((uv.x + uv.y) * 4.0 + time * 0.25) * 0.05;

    float waves = wave1 + wave2 + wave3;

    // Add noise
    float n = noise(uv * 2.0 + time * 0.1);

    // Create gradient from center
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(uv, center);
    float gradient = 1.0 - smoothstep(0.0, 0.8, dist);

    // Combine effects
    float alpha = (waves + n * 0.3) * gradient * 0.15;

    // Color - deep space with slight blue tint
    vec3 color1 = vec3(0.05, 0.05, 0.08); // Very dark blue
    vec3 color2 = vec3(0.02, 0.02, 0.03); // Almost black
    vec3 finalColor = mix(color2, color1, alpha);

    // Add subtle shimmer
    float shimmer = sin(uv.x * 20.0 + time) * sin(uv.y * 20.0 - time) * 0.02;
    finalColor += vec3(shimmer);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface ShaderBackgroundProps {
  variant?: 'void' | 'waves' | 'grid';
}

export default function ShaderBackground({ variant = 'void' }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create plane with shader
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      material.uniforms.time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      material.uniforms.resolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return <div ref={containerRef} className={styles.container} />;
}
