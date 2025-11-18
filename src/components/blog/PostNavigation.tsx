import Link from 'next/link';
import { BlogPost } from '@/lib/blog';
import styles from './PostNavigation.module.css';

interface PostNavigationProps {
  prev: BlogPost | null;
  next: BlogPost | null;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav className={styles.navigation}>
      <div className={styles.grid}>
        {prev ? (
          <Link href={`/blog/${prev.slug}`} className={`${styles.link} ${styles.prev}`}>
            <span className={styles.label}>Previous</span>
            <span className={styles.title}>{prev.title}</span>
            <span className={styles.arrow}>←</span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={`/blog/${next.slug}`} className={`${styles.link} ${styles.next}`}>
            <span className={styles.label}>Next</span>
            <span className={styles.title}>{next.title}</span>
            <span className={styles.arrow}>→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
