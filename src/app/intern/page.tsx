'use client';

import styles from './page.module.css';

export default function InternPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, Intern</h1>
          <p className={styles.subtitle}>Learning & Growing with AI</p>
        </header>

        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Your Learning Path</h2>
            <p>At Advancing Technology, we use AI to 10x our productivity. Here&apos;s how to get started:</p>
            <ul className={styles.taskList}>
              <li>
                <strong>Step 1: Learn Claude</strong>
                <p>Go to <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">claude.ai</a> and create an account</p>
              </li>
              <li>
                <strong>Step 2: Join Discord</strong>
                <p>Your office: Intern Office in C.O.O.L. server</p>
              </li>
              <li>
                <strong>Step 3: Complete Training</strong>
                <p>Ask Claude: &quot;Create a learning plan for [skill you want to learn]&quot;</p>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Beginner Claude Prompts</h2>
            <ul className={styles.promptList}>
              <li>&quot;Explain [concept] like I&apos;m 5 years old&quot;</li>
              <li>&quot;Give me 5 tips for [skill]&quot;</li>
              <li>&quot;Help me write a professional email about [topic]&quot;</li>
              <li>&quot;Create a study schedule for learning [subject]&quot;</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Resources</h2>
            <ul className={styles.linkList}>
              <li><a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude AI</a></li>
              <li><a href="https://www.anthropic.com/claude" target="_blank" rel="noopener noreferrer">Claude Documentation</a></li>
              <li><a href="https://discord.com/channels/998229485063245845/1463953471249318046" target="_blank" rel="noopener noreferrer">C.O.O.L. Discord - Intern Office</a></li>
            </ul>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Advancing Technology - Your AI-Powered Learning Hub</p>
        </footer>
      </div>
    </div>
  );
}
