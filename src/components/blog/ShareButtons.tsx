'use client';

import { useState } from 'react';
import styles from './ShareButtons.module.css';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/blog/${slug}`
    : '';

  const shareOnX = () => {
    const text = encodeURIComponent(`${title} by Elijah Brown`);
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      '_blank',
      'width=550,height=420'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles.shareButtons}>
      <button
        onClick={shareOnX}
        className={styles.shareButton}
        aria-label="Share on X (Twitter)"
      >
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share on X
      </button>

      <button
        onClick={copyLink}
        className={`${styles.shareButton} ${copied ? styles.copied : ''}`}
        aria-label="Copy link to clipboard"
      >
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          {copied ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          ) : (
            <>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </>
          )}
        </svg>
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
