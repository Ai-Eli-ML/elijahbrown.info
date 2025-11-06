import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import GlassCard from '@/components/GlassCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Projects | Elijah Brown',
  description: 'Experiments in autonomous intelligence. Systems that think with humans, not for us.',
};

const projects = [
  {
    title: 'Autonomous Research Agent',
    description:
      "An AI that reads papers, extracts insights, and builds knowledge graphs without human supervision. It doesn't summarize—it understands. Built for researchers who think in networks, not documents.",
    status: 'building' as const,
    stack: 'LLMs, graph databases, semantic indexing',
    vision: 'Make every human a polymath.',
  },
  {
    title: 'Command-Line Consciousness',
    description:
      'A natural language interface that converts intention to execution. You describe what you want; it generates the code, runs it, and iterates. No prompts. No boilerplate. Just thought → outcome.',
    status: 'concept' as const,
    stack: 'Code generation models, sandboxed execution, feedback loops',
    vision: 'Abolish the gap between idea and implementation.',
  },
  {
    title: 'Advancing Technology OS',
    description:
      'The operating system for AI-first work. Agents that manage your tasks, code, communication, and learning in one unified environment. Not an app. An ecosystem.',
    status: 'concept' as const,
    stack: 'Multi-agent orchestration, custom UI, distributed systems',
    vision: 'Replace the desktop metaphor with something post-human.',
  },
  {
    title: 'Memory Networks',
    description:
      "Personal AI that remembers everything you've ever told it—context, preferences, decisions—and uses that to become more aligned over time. No retraining. Just continuous evolution with your mind.",
    status: 'launched' as const,
    stack: 'Vector embeddings, RAG pipelines, persistent storage',
    vision: 'AI that grows with you, not against you.',
  },
  {
    title: 'Void Terminal',
    description:
      'A brutally minimal text editor for deep work. No notifications. No features. Just you, the cursor, and infinite darkness. Pairs with AI for on-demand completions that feel like telepathy.',
    status: 'building' as const,
    stack: 'Neovim-inspired, Rust backend, neural completion layer',
    vision: 'Tools that vanish and let creation breathe.',
  },
  {
    title: 'Oracle Protocol',
    description:
      "Prediction market AI that aggregates forecasts, surfaces patterns, and bets on future outcomes using its own reasoning. Not for gambling. For understanding what's coming.",
    status: 'concept' as const,
    stack: 'Market APIs, probability models, meta-learning',
    vision: 'Turn uncertainty into strategy.',
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <div className="container container-lg">
        <div className={styles.header}>
          <h1 className={`${styles.pageTitle} reveal-text`}>Projects</h1>
          <p className={`${styles.pageSubtitle} reveal-text delay-1`}>
            Where thought becomes executable.
          </p>
          <p className={`${styles.description} reveal-text delay-2`}>
            Experiments in autonomous intelligence. Some shipped. Some brewing. All designed to
            extend what's possible when humans and machines think together.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="reveal-text"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        <div className={`${styles.footer} reveal-text delay-4`}>
          <GlassCard reflection>
            <h2 className={styles.footerTitle}>Have an idea worth building together?</h2>
            <p className={styles.footerText}>
              If you're working on something real, I want to hear about it. If you're looking for
              small talk, I'm probably not your person.
            </p>
            <div className={styles.contact}>
              <a href="mailto:elijah@advancingtech.co" className={styles.contactLink}>
                Email
              </a>
              <span className={styles.separator}>·</span>
              <a
                href="https://twitter.com/elijahbrown"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                Twitter/X
              </a>
              <span className={styles.separator}>·</span>
              <a
                href="https://github.com/elijahbrown"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                GitHub
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
