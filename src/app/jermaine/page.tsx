'use client';

import styles from './page.module.css';

export default function JermainePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, Jermaine</h1>
          <p className={styles.subtitle}>Your Private Space</p>
        </header>

        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Resources</h2>
            <p>Your private resources and documents will appear here.</p>
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
                <a href="https://elijahbrown.info/contact" target="_blank" rel="noopener noreferrer">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Private Page</p>
        </footer>
      </div>
    </div>
  );
}
