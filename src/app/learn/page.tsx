'use client';

import { useState } from 'react';
import styles from './page.module.css';

// Taylor Swift Eras mapped to learning levels
const ERAS = [
  {
    id: 'debut',
    name: 'Debut Era',
    subtitle: 'The Beginning',
    emoji: '🎸',
    color: '#2DD4BF',
    description: 'Start your journey with Claude Code basics',
    unlocked: true,
    modules: [
      { id: 'what-is-claude', title: 'What is Claude Code?', duration: '5 min', completed: false, ready: true },
      { id: 'first-command', title: 'Your First Command', duration: '10 min', completed: false, ready: true },
      { id: 'talking-to-ai', title: 'How to Talk to AI', duration: '8 min', completed: false, ready: true },
    ],
  },
  {
    id: 'fearless',
    name: 'Fearless Era',
    subtitle: 'Building Confidence',
    emoji: '💛',
    color: '#FBBF24',
    description: 'Master the terminal and basic workflows',
    unlocked: false,
    modules: [
      { id: 'terminal-basics', title: 'Terminal Like Taylor', duration: '12 min', completed: false },
      { id: 'file-operations', title: 'Reading & Writing Files', duration: '15 min', completed: false },
      { id: 'git-basics', title: 'Git: Save Your Progress', duration: '10 min', completed: false },
    ],
  },
  {
    id: 'speaknow',
    name: 'Speak Now Era',
    subtitle: 'Finding Your Voice',
    emoji: '💜',
    color: '#A855F7',
    description: 'Learn to communicate effectively with AI',
    unlocked: false,
    modules: [
      { id: 'prompt-engineering', title: 'The Art of Prompting', duration: '15 min', completed: false },
      { id: 'context-matters', title: 'Context is Everything', duration: '12 min', completed: false },
      { id: 'slash-commands', title: 'Slash Commands', duration: '10 min', completed: false },
    ],
  },
  {
    id: 'red',
    name: 'Red Era',
    subtitle: 'Feeling All the Feels',
    emoji: '❤️',
    color: '#EF4444',
    description: 'Debug like a pro, handle errors with grace',
    unlocked: false,
    modules: [
      { id: 'error-messages', title: 'Reading Error Messages', duration: '12 min', completed: false },
      { id: 'debugging', title: 'Debugging Strategies', duration: '18 min', completed: false },
      { id: 'asking-for-help', title: 'When to Ask for Help', duration: '8 min', completed: false },
    ],
  },
  {
    id: '1989',
    name: '1989 Era',
    subtitle: 'The Reinvention',
    emoji: '🩵',
    color: '#38BDF8',
    description: 'Advanced tools, agents, and automation',
    unlocked: false,
    modules: [
      { id: 'agents', title: 'Meet the Agents', duration: '15 min', completed: false },
      { id: 'task-tool', title: 'The Task Tool', duration: '12 min', completed: false },
      { id: 'parallel-work', title: 'Running Things in Parallel', duration: '10 min', completed: false },
    ],
  },
  {
    id: 'reputation',
    name: 'Reputation Era',
    subtitle: 'The Power Move',
    emoji: '🖤',
    color: '#1F2937',
    description: 'Master the ecosystem, build your empire',
    unlocked: false,
    modules: [
      { id: 'mcp-servers', title: 'MCP Servers Explained', duration: '20 min', completed: false },
      { id: 'building-tools', title: 'Build Your Own Tools', duration: '25 min', completed: false },
      { id: 'ecosystem', title: 'The Full Ecosystem', duration: '15 min', completed: false },
    ],
  },
  {
    id: 'lover',
    name: 'Lover Era',
    subtitle: 'Bringing It Together',
    emoji: '💗',
    color: '#EC4899',
    description: 'Create beautiful projects with AI',
    unlocked: false,
    modules: [
      { id: 'project-planning', title: 'Planning a Project', duration: '15 min', completed: false },
      { id: 'collaboration', title: 'Working with the Team', duration: '12 min', completed: false },
      { id: 'deployment', title: 'Ship It!', duration: '18 min', completed: false },
    ],
  },
  {
    id: 'midnights',
    name: 'Midnights Era',
    subtitle: 'The Deep Dive',
    emoji: '🌙',
    color: '#4F46E5',
    description: 'Advanced patterns and late-night coding sessions',
    unlocked: false,
    modules: [
      { id: 'advanced-prompts', title: 'Advanced Prompting', duration: '20 min', completed: false },
      { id: 'worktrees', title: 'Git Worktrees', duration: '15 min', completed: false },
      { id: 'automation', title: 'Full Automation', duration: '25 min', completed: false },
    ],
  },
];

export default function LearnPage() {
  const [selectedEra, setSelectedEra] = useState(ERAS[0]);
  const [progress, setProgress] = useState({ completedModules: 0, totalModules: 24 });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <span className={styles.sparkle}>✨</span>
            The AI Eras Tour
            <span className={styles.sparkle}>✨</span>
          </h1>
          <p className={styles.subtitle}>
            Learn Claude Code through Taylor&apos;s Eras
          </p>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(progress.completedModules / progress.totalModules) * 100}%` }}
            />
          </div>
          <p className={styles.progressText}>
            {progress.completedModules} / {progress.totalModules} modules completed
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <nav className={styles.erasNav}>
          <h2 className={styles.navTitle}>Choose Your Era</h2>
          <div className={styles.erasGrid}>
            {ERAS.map((era) => (
              <button
                key={era.id}
                className={`${styles.eraButton} ${selectedEra.id === era.id ? styles.eraButtonActive : ''} ${!era.unlocked ? styles.eraLocked : ''}`}
                style={{ '--era-color': era.color } as Record<string, string>}
                onClick={() => era.unlocked && setSelectedEra(era)}
                disabled={!era.unlocked}
              >
                <span className={styles.eraEmoji}>{era.emoji}</span>
                <span className={styles.eraName}>{era.name}</span>
                {!era.unlocked && <span className={styles.lockIcon}>🔒</span>}
              </button>
            ))}
          </div>
        </nav>

        <section className={styles.eraContent}>
          <div
            className={styles.eraHeader}
            style={{ background: `linear-gradient(135deg, ${selectedEra.color}22, ${selectedEra.color}44)` } as Record<string, string>}
          >
            <span className={styles.bigEmoji}>{selectedEra.emoji}</span>
            <div>
              <h2 className={styles.eraTitle}>{selectedEra.name}</h2>
              <p className={styles.eraSubtitle}>{selectedEra.subtitle}</p>
              <p className={styles.eraDescription}>{selectedEra.description}</p>
            </div>
          </div>

          <div className={styles.moduleList}>
            <h3 className={styles.modulesTitle}>Modules</h3>
            {selectedEra.modules.map((module, index) => (
              <a
                key={module.id}
                href={`/learn/${selectedEra.id}/${module.id}`}
                className={styles.moduleCard}
              >
                <div className={styles.moduleNumber}>{index + 1}</div>
                <div className={styles.moduleInfo}>
                  <h4 className={styles.moduleTitle}>{module.title}</h4>
                  <p className={styles.moduleDuration}>{module.duration}</p>
                </div>
                <div className={styles.moduleStatus}>
                  {module.completed ? (
                    <span className={styles.checkmark}>✓</span>
                  ) : (
                    <span className={styles.arrow}>→</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.achievementsCard}>
            <h3>🏆 Achievements</h3>
            <div className={styles.achievementsList}>
              <div className={styles.achievement}>
                <span>🎸</span>
                <span>First Command</span>
              </div>
              <div className={`${styles.achievement} ${styles.locked}`}>
                <span>💛</span>
                <span>Fearless Coder</span>
              </div>
              <div className={`${styles.achievement} ${styles.locked}`}>
                <span>🐍</span>
                <span>Snake Charmer</span>
              </div>
              <div className={`${styles.achievement} ${styles.locked}`}>
                <span>🤖</span>
                <span>Agent Master</span>
              </div>
            </div>
          </div>

          <div className={styles.quoteCard}>
            <p>&quot;I think fearless is having fears but jumping anyway.&quot;</p>
            <span>— Taylor Swift</span>
          </div>

          <div className={styles.helpCard}>
            <h3>Need Help?</h3>
            <p>Ask @cool in Discord or message Eli!</p>
            <code>msg-eli &quot;I need help with...&quot;</code>
          </div>
        </aside>
      </main>

      <footer className={styles.footer}>
        <p>Made with 💜 by Advancing Technology</p>
        <p className={styles.footerSub}>For the C.O.O.L. Community</p>
      </footer>
    </div>
  );
}
