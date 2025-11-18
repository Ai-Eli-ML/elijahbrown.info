'use client';

import { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setProgress(scrollPercent);
      setVisible(scrollTop > 100); // Show after scrolling 100px
    };

    // Initial call
    updateProgress();

    // Throttle scroll events for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <>
      {/* Progress bar at top */}
      <div className={`${styles.progressBar} ${visible ? styles.visible : ''}`}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Circular progress indicator */}
      {visible && (
        <div className={styles.progressCircle}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle
              className={styles.progressCircleBg}
              cx="20"
              cy="20"
              r="16"
              fill="none"
              strokeWidth="3"
            />
            <circle
              className={styles.progressCircleFill}
              cx="20"
              cy="20"
              r="16"
              fill="none"
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 16}`}
              strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress / 100)}`}
              transform="rotate(-90 20 20)"
            />
          </svg>
          <div className={styles.progressText}>{Math.round(progress)}%</div>
        </div>
      )}
    </>
  );
}
