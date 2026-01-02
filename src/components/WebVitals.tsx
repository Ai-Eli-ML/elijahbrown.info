'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

/**
 * Web Vitals monitoring component
 * Tracks Core Web Vitals and sends to analytics
 */
export default function WebVitals() {
  useEffect(() => {
    const handleMetric = (metric: Metric) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[Web Vitals]', {
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          id: metric.id,
        });
      }

      // Send to analytics in production
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to Google Analytics
        if (typeof window !== 'undefined' && 'gtag' in window) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).gtag('event', metric.name, {
            event_category: 'Web Vitals',
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_label: metric.id,
            non_interaction: true,
          });
        }

        // Example: Send to custom analytics endpoint
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric: metric.name,
            value: metric.value,
            rating: metric.rating,
            id: metric.id,
            timestamp: Date.now(),
          }),
        }).catch((error) => {
          console.error('[Web Vitals] Failed to send metric:', error);
        });
      }

      // Visual feedback for poor performance in development
      if (process.env.NODE_ENV === 'development' && metric.rating === 'poor') {
        console.warn(
          `[Web Vitals] Poor ${metric.name} detected:`,
          metric.value,
          '\nConsider optimizing this metric for better user experience.'
        );
      }
    };

    // Track all Core Web Vitals
    onCLS(handleMetric); // Cumulative Layout Shift
    onINP(handleMetric); // Interaction to Next Paint
    onFCP(handleMetric); // First Contentful Paint
    onLCP(handleMetric); // Largest Contentful Paint
    onTTFB(handleMetric); // Time to First Byte
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Performance monitor that displays metrics on screen (dev only)
 */
export function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const metrics: Record<string, Metric> = {};

    const updateDisplay = () => {
      const display = document.getElementById('perf-monitor');
      if (!display) return;

      const html = Object.values(metrics)
        .map((metric) => {
          const color =
            metric.rating === 'good'
              ? '#4ade80'
              : metric.rating === 'needs-improvement'
              ? '#fbbf24'
              : '#ef4444';

          const value =
            metric.name === 'CLS'
              ? metric.value.toFixed(3)
              : Math.round(metric.value);

          return `
            <div style="margin-bottom: 4px;">
              <strong style="color: ${color}">${metric.name}:</strong>
              <span style="color: #d9d9d9; margin-left: 8px;">${value}</span>
              <span style="color: #666; margin-left: 4px; font-size: 0.75rem;">(${metric.rating})</span>
            </div>
          `;
        })
        .join('');

      display.innerHTML = html;
    };

    const handleMetric = (metric: Metric) => {
      metrics[metric.name] = metric;
      updateDisplay();
    };

    // Create display element
    const monitor = document.createElement('div');
    monitor.id = 'perf-monitor';
    monitor.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 24px;
      padding: 12px 16px;
      background: rgba(18, 18, 18, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      z-index: 10000;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `;
    document.body.appendChild(monitor);

    // Track metrics
    onCLS(handleMetric);
    onINP(handleMetric);
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);

    return () => {
      monitor.remove();
    };
  }, []);

  return null;
}
