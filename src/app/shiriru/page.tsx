'use client';

import styles from './page.module.css';

export default function ShiriruPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, Shiriru</h1>
          <p className={styles.subtitle}>Project Manager - Advancing Technology</p>
        </header>

        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Your AI Task List</h2>
            <p>Remember: We are an AI company. Always think: &quot;How can I do this with AI?&quot;</p>
            <ul className={styles.taskList}>
              <li>
                <strong>AG1 Affiliate Tracking Research</strong>
                <p>Ask Claude: &quot;Research AG1 affiliate program structure and create a competitive analysis report&quot;</p>
              </li>
              <li>
                <strong>SupremeNaturals Content</strong>
                <p>Ask Claude: &quot;Generate 10 social media post ideas for AG1 health supplement benefits&quot;</p>
              </li>
              <li>
                <strong>Daily KPI Dashboard</strong>
                <p>Ask Claude: &quot;Create a KPI tracking template for affiliate marketing performance&quot;</p>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Access Claude</h2>
            <p>You have <strong>two ways</strong> to access Claude AI:</p>
            <ul className={styles.taskList}>
              <li>
                <strong>Terminal (Advanced)</strong>
                <p>SSH: <code>ssh shiriru@100.115.11.72</code></p>
                <p>Run <code>claude</code> for full Claude Code access</p>
                <p>Use <code>write workbench</code> to message Eli directly</p>
              </li>
              <li>
                <strong>Discord @cool</strong>
                <p>Go to <a href="https://discord.com/channels/998229485063245845/1463977326562902026" target="_blank" rel="noopener noreferrer">#ask-claude-shiriru</a> in Cy&apos;s Office</p>
                <p>Type <code>@cool</code> followed by your question</p>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Quick @cool Prompts</h2>
            <ul className={styles.promptList}>
              <li>&quot;Help me draft a professional follow-up email for [client/lead]&quot;</li>
              <li>&quot;Create a task breakdown for [project name] with deadlines&quot;</li>
              <li>&quot;Analyze this meeting transcript and extract action items&quot;</li>
              <li>&quot;Generate a weekly progress report template&quot;</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Resources</h2>
            <ul className={styles.linkList}>
              <li><a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude AI</a></li>
              <li><a href="https://discord.com/channels/998229485063245845/1441103134352216297" target="_blank" rel="noopener noreferrer">C.O.O.L. Discord - Shiriru's Office</a></li>
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
