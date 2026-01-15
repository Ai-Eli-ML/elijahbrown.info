'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface ProjectStatus {
  phase: string;
  completion: number;
  lastUpdated: string;
}

interface Feature {
  name: string;
  status: 'planned' | 'in-progress' | 'complete';
  description: string;
}

export default function ClubHopperDashboard() {
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>({
    phase: 'Planning & Design',
    completion: 5,
    lastUpdated: new Date().toISOString().split('T')[0],
  });

  const features: Feature[] = [
    {
      name: 'Club Discovery Feed',
      status: 'planned',
      description: 'Vertical scroll view of featured clubs with VIP sections and pricing',
    },
    {
      name: 'VIP Booking System',
      status: 'planned',
      description: 'Concierge-style booking with payment processing',
    },
    {
      name: 'Membership Tiers',
      status: 'planned',
      description: 'Free browsing + paid access to exclusive Club Hopper events',
    },
    {
      name: 'Live Streaming',
      status: 'planned',
      description: 'Twitch/TikTok Live integration for venue streaming',
    },
    {
      name: 'Creator Rewards',
      status: 'planned',
      description: 'UGC contests and influencer monetization via Whop',
    },
    {
      name: 'Social Integration',
      status: 'planned',
      description: 'Instagram tagging and content aggregation',
    },
  ];

  const timeline = [
    { date: '2025-07-02', event: 'Initial concept and feature planning', complete: true },
    { date: '2026-01-15', event: 'Development environment setup', complete: true },
    { date: '2026-01', event: 'MVP Design & Wireframes', complete: false },
    { date: '2026-02', event: 'Core App Development', complete: false },
    { date: '2026-Q1', event: 'Albany Beta Launch', complete: false },
    { date: '2026-Q2', event: 'Full Capital District Launch', complete: false },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <span className={styles.logo}>🎉</span>
          <div>
            <h1 className={styles.title}>Club Hopper</h1>
            <p className={styles.tagline}>Albany&apos;s Underground VIP Scene</p>
          </div>
        </div>
        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          {projectStatus.phase}
        </div>
      </header>

      <main className={styles.main}>
        {/* Project Overview */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Project Overview</h2>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewCard}>
              <h3>Mission</h3>
              <p>The gateway to Albany&apos;s underground VIP nightlife - curated discovery, exclusive access, and community-driven hype.</p>
            </div>
            <div className={styles.overviewCard}>
              <h3>Target Market</h3>
              <p>Albany Capital District - 25-44 demographic, college students (UAlbany), VIP clubgoers, and UGC creators.</p>
            </div>
            <div className={styles.overviewCard}>
              <h3>Business Model</h3>
              <p>Membership subscriptions + VIP booking commissions + Creator platform fees.</p>
            </div>
          </div>
        </section>

        {/* Progress Tracker */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Development Progress</h2>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${projectStatus.completion}%` }}
              ></div>
            </div>
            <span className={styles.progressText}>{projectStatus.completion}% Complete</span>
          </div>
        </section>

        {/* Features */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Core Features</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureHeader}>
                  <h3>{feature.name}</h3>
                  <span className={`${styles.featureStatus} ${styles[feature.status]}`}>
                    {feature.status.replace('-', ' ')}
                  </span>
                </div>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Development Timeline</h2>
          <div className={styles.timeline}>
            {timeline.map((item, index) => (
              <div key={index} className={`${styles.timelineItem} ${item.complete ? styles.complete : ''}`}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineDate}>{item.date}</span>
                  <p>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tech Stack</h2>
          <div className={styles.techGrid}>
            <div className={styles.techCard}>
              <h4>Frontend</h4>
              <ul>
                <li>React Native / Expo</li>
                <li>TypeScript</li>
                <li>NativeWind (Tailwind)</li>
              </ul>
            </div>
            <div className={styles.techCard}>
              <h4>Backend</h4>
              <ul>
                <li>Node.js / Express</li>
                <li>PostgreSQL / Supabase</li>
                <li>Redis (caching)</li>
              </ul>
            </div>
            <div className={styles.techCard}>
              <h4>Integrations</h4>
              <ul>
                <li>Stripe (payments)</li>
                <li>Twitch API (streaming)</li>
                <li>Whop (creator rewards)</li>
              </ul>
            </div>
            <div className={styles.techCard}>
              <h4>Infrastructure</h4>
              <ul>
                <li>Vercel / Railway</li>
                <li>AWS S3 (media)</li>
                <li>SendGrid (notifications)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Team</h2>
          <div className={styles.teamSection}>
            <p>Development by <strong>AdvancingTechnology</strong></p>
            <p>Albany Capital District Launch - Q1 2026</p>
            <div className={styles.discordLink}>
              <span>Join the discussion:</span>
              <a href="https://discord.com/channels/998229485063245845/1443273789495578655" target="_blank" rel="noopener noreferrer">
                Discord: COOL Server / Club Hopper
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Club Hopper &copy; 2026 • AdvancingTechnology</p>
        <p className={styles.lastUpdated}>Last Updated: {projectStatus.lastUpdated}</p>
      </footer>
    </div>
  );
}
