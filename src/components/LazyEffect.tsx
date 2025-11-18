'use client';

import { useEffect, useState, useRef, ComponentType } from 'react';

interface LazyEffectProps {
  component: ComponentType<Record<string, unknown>>;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
  [key: string]: unknown;
}

/**
 * Lazy load effects based on viewport intersection
 * This improves initial page load performance
 */
export default function LazyEffect({
  component: Component,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null,
  ...props
}: LazyEffectProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasLoaded(true);
            // Once loaded, we can disconnect
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: hasLoaded ? 'auto' : '100px' }}>
      {isVisible ? <Component {...props} /> : fallback}
    </div>
  );
}

/**
 * Hook for lazy loading based on scroll position
 */
export function useLazyLoad(threshold = 200) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Check if user has scrolled past threshold
    const checkScroll = () => {
      if (window.scrollY > threshold) {
        setShouldLoad(true);
      }
    };

    // Check immediately
    checkScroll();

    // Check on scroll
    window.addEventListener('scroll', checkScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [threshold]);

  return shouldLoad;
}

/**
 * Hook for detecting if element is in viewport
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isIntersecting };
}
