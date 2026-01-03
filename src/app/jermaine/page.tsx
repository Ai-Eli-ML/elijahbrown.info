'use client';

import styles from './page.module.css';

export default function JermainePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, Jermaine</h1>
          <p className={styles.subtitle}>What You Just Saw</p>
        </header>

        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>The Demo</h2>
            <p>
              That Dessalines piece you read? Research, narrative, voice, citations—all created
              with AI in under 15 minutes. Not days. Minutes.
            </p>
            <p style={{ marginTop: '1rem' }}>
              This is what I wanted to show you. How fast things move now. What&apos;s possible
              when you have the right tools.
            </p>
          </div>

          <div className={styles.card}>
            <h2>What&apos;s Next</h2>
            <p>
              This was just the appetizer—showing you speed and quality. The main course?
              Building something for <em>you</em>. Your vision. Your platform.
            </p>
            <p style={{ marginTop: '1rem' }}>
              When I&apos;m back in NC, we&apos;ll talk about what that looks like.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Quick Links</h2>
            <ul className={styles.linkList}>
              <li>
                <a href="https://elijahbrown.info/blog/dessalines-battles-against-france" target="_blank" rel="noopener noreferrer">
                  Read the Dessalines Post
                </a>
              </li>
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
          <p>Your Private Space</p>
        </footer>
      </div>
    </div>
  );
}
