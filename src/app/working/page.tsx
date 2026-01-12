'use client';

import styles from './page.module.css';

export default function WorkingPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Working Dashboard</h1>
          <p className={styles.subtitle}>Active Projects & Tasks</p>
          <p className={styles.lastUpdated}>{currentDate}</p>
        </header>

        {/* Today's Meeting */}
        <div className={styles.meetingSection}>
          <div className={styles.meetingHeader}>
            <span className={styles.meetingIcon}>📅</span>
            <div className={styles.meetingInfo}>
              <h2>Meeting Today: 5pm EST with Husky</h2>
              <p>Paper Prisons Figma Design Review</p>
            </div>
          </div>
          <ul className={styles.agendaList}>
            <li className={styles.agendaItem}>
              <span className={styles.agendaNumber}>1</span>
              Review Figma draft 4 designs
            </li>
            <li className={styles.agendaItem}>
              <span className={styles.agendaNumber}>2</span>
              Discuss Next.js architecture migration
            </li>
            <li className={styles.agendaItem}>
              <span className={styles.agendaNumber}>3</span>
              Align on Jan 12 deadline deliverables
            </li>
          </ul>
        </div>

        {/* Project Cards */}
        <div className={styles.projectGrid}>
          {/* Paper Prisons */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                📄 Paper Prisons
              </h3>
              <span className={`${styles.statusBadge} ${styles.statusActive}`}>Active</span>
            </div>
            <p className={styles.cardDescription}>
              Criminal justice reform website migration from PHP/jQuery to Next.js 15 with Vercel deployment.
            </p>
            <ul className={styles.taskList}>
              <li className={styles.taskItem}>
                <span className={styles.taskCheck}>✓</span>
                Cloned PaperPrisons/website repo
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskCheck}>✓</span>
                Analyzed architecture (180+ HTML, PHP, S3)
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskCheck}>✓</span>
                Created Next.js 15 scaffold
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Accept Figma invite (draft 4)
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Configure Vercel deployment
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Implement Figma designs
              </li>
            </ul>
            <div className={styles.linkGroup}>
              <a
                href="https://www.figma.com/design/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryLink}
              >
                Open Figma →
              </a>
              <a
                href="https://github.com/PaperPrisons/website"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryLink}
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Diversity Pilots */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                🎯 Diversity Pilots
              </h3>
              <span className={`${styles.statusBadge} ${styles.statusPending}`}>Pending</span>
            </div>
            <p className={styles.cardDescription}>
              Research platform for diversity in criminal justice pilot programs.
            </p>
            <ul className={styles.taskList}>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Review existing diversitypilots repo
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Assess integration with Paper Prisons
              </li>
            </ul>
            <div className={styles.linkGroup}>
              <a
                href="https://github.com/PaperPrisons/diversitypilots"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryLink}
              >
                GitHub
              </a>
            </div>
          </div>

          {/* RJA Responder */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                ⚖️ RJA Responder
              </h3>
              <span className={`${styles.statusBadge} ${styles.statusPending}`}>Pending</span>
            </div>
            <p className={styles.cardDescription}>
              Racial Justice Act compliance tool for California attorneys.
            </p>
            <ul className={styles.taskList}>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Review existing tools (rja-form, rja-stat)
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Plan AI integration for case analysis
              </li>
            </ul>
            <div className={styles.linkGroup}>
              <a
                href="https://github.com/PaperPrisons"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryLink}
              >
                View Repos
              </a>
            </div>
          </div>

          {/* Santa Clara Clean Slate */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                🧹 Santa Clara Clean Slate
              </h3>
              <span className={`${styles.statusBadge} ${styles.statusPending}`}>Pending</span>
            </div>
            <p className={styles.cardDescription}>
              Record clearance initiative for Santa Clara County.
            </p>
            <ul className={styles.taskList}>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Review project scope from meetings
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Coordinate with Colleen on timeline
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <h2>Quick Links</h2>
          <div className={styles.quickLinksGrid}>
            <a
              href="https://fathom.video/share/xEDZo5z_fvGXN1HJjXGMRHVBnsA58Hpv"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickLink}
            >
              <span className={styles.quickLinkIcon}>📹</span>
              Dec 30 Meeting
            </a>
            <a
              href="https://fathom.video/share/vzNkscgP9cTjuQSYsbFrfNkmRQi6P26V"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickLink}
            >
              <span className={styles.quickLinkIcon}>📹</span>
              Jan 2 Meeting
            </a>
            <a
              href="https://github.com/PaperPrisons"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickLink}
            >
              <span className={styles.quickLinkIcon}>🐙</span>
              PaperPrisons GitHub
            </a>
            <a
              href="https://elijahbrown.info/colleen"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickLink}
            >
              <span className={styles.quickLinkIcon}>👤</span>
              Colleen Hub
            </a>
          </div>
        </div>

        <footer className={styles.footer}>
          <p>Elijah Brown - Development Workspace</p>
        </footer>
      </div>
    </div>
  );
}
