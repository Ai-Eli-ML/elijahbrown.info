'use client';

import styles from './page.module.css';

export default function MarikaPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, Marika</h1>
          <p className={styles.subtitle}>COO - Advancing Technology</p>
        </header>

        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Your COO Dashboard</h2>
            <p>As COO, you have access to advanced Claude capabilities via Tailscale SSH.</p>
            <ul className={styles.taskList}>
              <li>
                <strong>System Access</strong>
                <p>SSH: <code>ssh eunoia@100.115.11.72</code></p>
                <p>Claude is ready for your commands in the terminal.</p>
              </li>
              <li>
                <strong>MCP Server Training</strong>
                <p>Upcoming session with Eli to learn MCP server creation (Namecheap API integration)</p>
              </li>
              <li>
                <strong>Team Coordination</strong>
                <p>Monitor team performance and coordinate with Shiriru on project status</p>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Access Claude</h2>
            <p>You have <strong>two ways</strong> to access Claude AI:</p>
            <ul className={styles.taskList}>
              <li>
                <strong>Terminal (Advanced)</strong>
                <p>SSH: <code>ssh eunoia@100.115.11.72</code></p>
                <p>Run <code>claude</code> for full Claude Code access</p>
                <p>Use <code>write workbench</code> to message Eli directly</p>
              </li>
              <li>
                <strong>Discord @cool</strong>
                <p>Go to <a href="https://discord.com/channels/998229485063245845/1463975295617994773" target="_blank" rel="noopener noreferrer">#ask-claude-marika</a> in Marika&apos;s Office</p>
                <p>Type <code>@cool</code> followed by your question</p>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Quick Claude Prompts</h2>
            <ul className={styles.promptList}>
              <li>&quot;Create an operations dashboard for tracking team productivity&quot;</li>
              <li>&quot;Analyze our project pipeline and identify bottlenecks&quot;</li>
              <li>&quot;Draft SOPs for our common workflows&quot;</li>
              <li>&quot;Build an MCP server for [API name] integration&quot;</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Resources</h2>
            <ul className={styles.linkList}>
              <li><a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude AI</a></li>
              <li><a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">MCP Documentation</a></li>
              <li><a href="https://discord.com/channels/998229485063245845/1463953460784402719" target="_blank" rel="noopener noreferrer">C.O.O.L. Discord - Marika's Office</a></li>
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
