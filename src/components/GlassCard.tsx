import React from 'react';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  reflection?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  glow = false,
  reflection = false,
}: GlassCardProps) {
  const classes = [
    styles.card,
    glow ? styles.glow : '',
    reflection ? styles.reflection : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
