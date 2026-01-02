'use client';

import { useEffect, useState } from 'react';
import styles from './ViewCounter.module.css';

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple localStorage-based view counter
    // In production, replace with actual API call to Vercel KV, Upstash, or database
    const incrementViews = () => {
      try {
        const viewsKey = `blog_views_${slug}`;
        const lastViewKey = `blog_last_view_${slug}`;

        // Check if already viewed in this session (within last hour)
        const lastView = localStorage.getItem(lastViewKey);
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;

        if (!lastView || now - parseInt(lastView) > oneHour) {
          // Increment view count
          const currentViews = parseInt(localStorage.getItem(viewsKey) || '0');
          const newViews = currentViews + 1;
          localStorage.setItem(viewsKey, newViews.toString());
          localStorage.setItem(lastViewKey, now.toString());
          setViews(newViews);
        } else {
          // Just show current count
          setViews(parseInt(localStorage.getItem(viewsKey) || '0'));
        }
      } catch (error) {
        console.error('Error tracking views:', error);
      } finally {
        setIsLoading(false);
      }
    };

    incrementViews();
  }, [slug]);

  if (isLoading) {
    return (
      <div className={styles.viewCounter}>
        <span className={styles.icon}>👁</span>
        <span className={styles.count}>—</span>
      </div>
    );
  }

  return (
    <div className={styles.viewCounter}>
      <span className={styles.icon}>👁</span>
      <span className={styles.count}>{views.toLocaleString()} views</span>
    </div>
  );
}
