import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className="container container-sm">
        <GlassCard glow>
          <div className={styles.content}>
            <div className={styles.errorCode}>
              <span className={styles.glitch} data-text="404">404</span>
            </div>

            <h1 className={styles.title}>
              Lost in the void
            </h1>

            <p className={styles.description}>
              You've wandered into uncharted territory. This page doesn't exist in this dimension.
            </p>

            <div className={styles.quote}>
              <p>
                "In the vast darkness between the stars, we find not emptiness, but possibility."
              </p>
            </div>

            <div className={styles.actions}>
              <Link href="/" className={styles.primary}>
                Return to Reality
              </Link>
              <Link href="/blog" className={styles.secondary}>
                Explore the Archive
              </Link>
            </div>

            <div className={styles.suggestions}>
              <p className={styles.suggestionsTitle}>Perhaps you were looking for:</p>
              <ul className={styles.links}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/now">What I'm doing now</Link></li>
              </ul>
            </div>

            <div className={styles.ascii}>
              <pre>{`
    ╔═══════════════════════════════╗
    ║   ERROR: REALITY NOT FOUND    ║
    ║   The simulation glitches...  ║
    ╚═══════════════════════════════╝
              `}</pre>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
