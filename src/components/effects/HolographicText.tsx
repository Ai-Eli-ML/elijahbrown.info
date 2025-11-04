'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HolographicText.module.css';

interface HolographicTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function HolographicText({ text, className = '', delay = 0 }: HolographicTextProps) {
  const [revealed, setRevealed] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={textRef}
      className={`${styles.holographic} ${revealed ? styles.revealed : ''} ${className}`}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={styles.char}
          style={{
            animationDelay: `${delay + index * 0.03}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      <div className={styles.scanline} />
      <div className={styles.glitch} />
    </div>
  );
}
