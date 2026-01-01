import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Colleen',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ColleenPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, Colleen</h1>
          <p className={styles.subtitle}>This is your private space</p>
        </header>

        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Personal Notes</h2>
            <p>
              This is a password-protected area just for you.
              Feel free to add any content here that you&apos;d like to share.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Quick Links</h2>
            <ul className={styles.linkList}>
              <li>
                <a href="https://elijahbrown.info" target="_blank" rel="noopener noreferrer">
                  Main Website
                </a>
              </li>
              <li>
                <a href="https://elijahbrown.info/blog" target="_blank" rel="noopener noreferrer">
                  Blog
                </a>
              </li>
              <li>
                <a href="https://elijahbrown.info/contact" target="_blank" rel="noopener noreferrer">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Message for You</h2>
            <blockquote className={styles.quote}>
              &ldquo;The best things in life are the people we love,
              the places we&apos;ve been, and the memories we&apos;ve made along the way.&rdquo;
            </blockquote>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Made with care</p>
        </footer>
      </div>
    </div>
  );
}
