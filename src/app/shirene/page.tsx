'use client';

import styles from './page.module.css';

export default function ShirenePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, Shirene</h1>
          <p className={styles.subtitle}>Account Manager / Social Media Manager - Advancing Technology</p>
        </header>

        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Your Task List</h2>
            <p>Remember: We are an AI company. Always think: &quot;How can I do this with AI?&quot;</p>
            <ul className={styles.taskList}>
              <li>
                <strong>Social Media Content</strong>
                <p>Ask Claude: &quot;Create 10 engaging social media posts for [platform] about [topic]&quot;</p>
              </li>
              <li>
                <strong>Client Communication</strong>
                <p>Ask Claude: &quot;Draft a professional response to this client inquiry: [paste message]&quot;</p>
              </li>
              <li>
                <strong>Account Management</strong>
                <p>Ask Claude: &quot;Create a client onboarding checklist for [client type]&quot;</p>
              </li>
              <li>
                <strong>Content Calendar</strong>
                <p>Ask Claude: &quot;Build a 30-day content calendar for [brand/product]&quot;</p>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Quick Claude Prompts</h2>
            <ul className={styles.promptList}>
              <li>&quot;Write Instagram captions for these 5 images about [topic]&quot;</li>
              <li>&quot;Create a social media strategy for launching [product/service]&quot;</li>
              <li>&quot;Draft an email sequence for client retention&quot;</li>
              <li>&quot;Analyze this competitor&apos;s social media presence and suggest improvements&quot;</li>
              <li>&quot;Generate hashtag sets for [niche] on [platform]&quot;</li>
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
