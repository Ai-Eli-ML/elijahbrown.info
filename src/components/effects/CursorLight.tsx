'use client';

import { useEffect, useRef } from 'react';
import styles from './CursorLight.module.css';

export default function CursorLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lightRef.current) {
        lightRef.current.style.left = `${e.clientX}px`;
        lightRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={lightRef} className={styles.cursorLight} />;
}
