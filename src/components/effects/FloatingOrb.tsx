'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './FloatingOrb.module.css';

// Vertex Shader
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader - Liquid Chrome Effect
const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    // Create rippling effect
    float ripple = sin(vPosition.y * 3.0 + time * 0.5) * 0.5 + 0.5;
    ripple += sin(vPosition.x * 2.0 - time * 0.3) * 0.3;
    ripple += sin(vPosition.z * 4.0 + time * 0.4) * 0.2;

    // Fresnel effect for chrome-like reflectivity
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);

    // Mix colors based on ripple and fresnel
    vec3 finalColor = mix(color1, color2, ripple * 0.5 + fresnel * 0.5);

    // Add chromatic aberration
    float aberration = fresnel * 0.3;
    finalColor.r += aberration * sin(time + vPosition.x);
    finalColor.g += aberration * sin(time + vPosition.y);
    finalColor.b += aberration * sin(time + vPosition.z);

    // Add glow
    float glow = pow(fresnel, 2.0) * 0.8;
    finalColor += vec3(glow);

    gl_FragColor = vec4(finalColor, 0.9);
  }
`;

export default function FloatingOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create orb with custom shader
    const geometry = new THREE.IcosahedronGeometry(1, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0.85, 0.85, 0.85) }, // Chrome silver
        color2: { value: new THREE.Color(0.55, 0.62, 0.70) }, // Blue tint
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Point light
    const pointLight = new THREE.PointLight(0xd9d9d9, 1, 100);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Animation
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Update shader time uniform
      material.uniforms.time.value = elapsedTime;

      // Slow orbit
      orb.rotation.y = elapsedTime * 0.1;
      orb.rotation.x = Math.sin(elapsedTime * 0.05) * 0.2;

      // Gentle floating motion
      orb.position.y = Math.sin(elapsedTime * 0.3) * 0.1;

      // Slow camera orbit
      camera.position.x = Math.sin(elapsedTime * 0.05) * 0.3;
      camera.position.y = Math.cos(elapsedTime * 0.05) * 0.3;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}
