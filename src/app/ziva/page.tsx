'use client';

import styles from './page.module.css';

export default function ZivaPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, Ziva</h1>
          <p className={styles.subtitle}>Team Member - Advancing Technology</p>
        </header>

        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Your Task List</h2>
            <p>Use AI to accelerate your work. Ask Claude for help!</p>
            <ul className={styles.taskList}>
              <li>
                <strong>Getting Started</strong>
                <p>Access your Tailscale SSH: <code>ssh zivadavid@100.115.11.72</code></p>
              </li>
              <li>
                <strong>Learn Claude</strong>
                <p>Start with simple prompts and build up to complex workflows</p>
              </li>
              <li>
                <strong>Check Discord</strong>
                <p>Your office: Ziva&apos;s Office in C.O.O.L. server</p>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Quick Claude Prompts</h2>
            <ul className={styles.promptList}>
              <li>&quot;Help me understand [topic] and explain it simply&quot;</li>
              <li>&quot;Create a checklist for [task name]&quot;</li>
              <li>&quot;Draft a message to [person] about [subject]&quot;</li>
              <li>&quot;Summarize this document for me&quot;</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Resources</h2>
            <ul className={styles.linkList}>
              <li><a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude AI</a></li>
              <li><a href="https://discord.gg/cool" target="_blank" rel="noopener noreferrer">C.O.O.L. Discord</a></li>
              <li><a href="/contact" target="_blank" rel="noopener noreferrer">Contact Eli</a></li>
            </ul>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Advancing Technology - Your AI-Powered Workspace</p>
        </footer>
      </div>
    </div>
  );
}
