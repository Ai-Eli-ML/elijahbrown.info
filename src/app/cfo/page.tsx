'use client';

import styles from './page.module.css';

export default function CFOPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, CFO</h1>
          <p className={styles.subtitle}>Chief Financial Officer - Advancing Technology</p>
        </header>

        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Finance Dashboard</h2>
            <p>AI-powered financial management and tracking.</p>
            <ul className={styles.taskList}>
              <li>
                <strong>Revenue Tracking</strong>
                <p>Monitor income across all business units and affiliate programs</p>
              </li>
              <li>
                <strong>Expense Management</strong>
                <p>Track operational costs, subscriptions, and team payments</p>
              </li>
              <li>
                <strong>AG1/SupremeNaturals Revenue</strong>
                <p>Track affiliate commissions and wholesale margins</p>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Quick Claude Prompts</h2>
            <ul className={styles.promptList}>
              <li>&quot;Create a monthly P&L statement template&quot;</li>
              <li>&quot;Calculate ROI for [investment/campaign]&quot;</li>
              <li>&quot;Generate a cash flow forecast for next quarter&quot;</li>
              <li>&quot;Analyze these expenses and identify cost-saving opportunities&quot;</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Resources</h2>
            <ul className={styles.linkList}>
              <li><a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude AI</a></li>
              <li><a href="https://discord.com/channels/998229485063245845/1463953465456722143" target="_blank" rel="noopener noreferrer">C.O.O.L. Discord - CFO Office</a></li>
              <li><a href="/contact" target="_blank" rel="noopener noreferrer">Contact Eli</a></li>
            </ul>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Advancing Technology - Your AI-Powered Finance Hub</p>
        </footer>
      </div>
    </div>
  );
}
