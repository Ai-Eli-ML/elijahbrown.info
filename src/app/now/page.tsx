import { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Now | Elijah Brown',
  description: 'What I\'m working on right now - current projects, focus, and interests.',
};

export default function NowPage() {
  const lastUpdated = 'November 2025';

  return (
    <div className={styles.page}>
      <div className="container container-md">
        <div className={styles.header}>
          <h1 className={`${styles.pageTitle} reveal-text`}>What I'm doing now</h1>
          <p className={`${styles.lastUpdated} reveal-text delay-1`}>
            Last updated: {lastUpdated}
          </p>
          <p className={`${styles.description} reveal-text delay-2`}>
            A snapshot of my current focus, inspired by{' '}
            <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">
              the /now movement
            </a>
            .
          </p>
        </div>

        <div className={styles.content}>
          {/* Current Work */}
          <section className={`${styles.section} reveal-text delay-3`}>
            <GlassCard glow>
              <h2 className={styles.sectionTitle}>🚀 Current Projects</h2>
              <div className={styles.projectList}>
                <div className={styles.project}>
                  <h3>Life-Coach-Ai</h3>
                  <p>
                    Building a therapeutic AI companion for vulnerable populations. 30-agent system
                    with crisis intervention, 50+ languages, and HIPAA-level security. Currently
                    production-ready with 149/149 tests passing.
                  </p>
                  <div className={styles.status}>
                    <span className={styles.statusBadge} data-status="building">74% Complete</span>
                  </div>
                </div>

                <div className={styles.project}>
                  <h3>Legal Malpractice Detector</h3>
                  <p>
                    HIGH-STAKES legal AI with FREE local inference using Ollama + Qwen2.5-14B on RTX
                    5090. Medical malpractice detection with extreme hallucination prevention.
                  </p>
                  <div className={styles.status}>
                    <span className={styles.statusBadge} data-status="building">80% Complete</span>
                  </div>
                </div>

                <div className={styles.project}>
                  <h3>Personal Dashboard</h3>
                  <p>
                    Production Next.js 15.2.4 app with Supabase, Stripe integration, and advanced
                    project management features. Nearly production-ready.
                  </p>
                  <div className={styles.status}>
                    <span className={styles.statusBadge} data-status="building">79% Complete</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Current Focus */}
          <section className={`${styles.section} reveal-text delay-4`}>
            <GlassCard reflection>
              <h2 className={styles.sectionTitle}>🎯 Current Focus</h2>
              <ul className={styles.focusList}>
                <li>
                  <strong>AI-Powered Services:</strong> Building autonomous AI agents for therapeutic
                  support and legal analysis
                </li>
                <li>
                  <strong>Local Inference:</strong> Maximizing NVIDIA RTX 5090 GPU for FREE local AI
                  inference (Ollama, vLLM)
                </li>
                <li>
                  <strong>Crisis Intervention:</strong> 100% complete SafeWord emergency system with
                  AES-256-GCM encryption
                </li>
                <li>
                  <strong>Production Quality:</strong> Zero-error builds, 100% test coverage on critical
                  systems
                </li>
              </ul>
            </GlassCard>
          </section>

          {/* Current Learning */}
          <section className={`${styles.section} reveal-text delay-5`}>
            <GlassCard>
              <h2 className={styles.sectionTitle}>📚 Current Learning</h2>
              <ul className={styles.learningList}>
                <li>Advanced RAG architectures with LangGraph workflows</li>
                <li>NVIDIA NeMo & Riva for GPU-accelerated voice synthesis</li>
                <li>CodebaseIntelligence with vision AI (GPT-4 Vision integration)</li>
                <li>Code Execution MCP patterns (98.7% token reduction)</li>
                <li>Multi-agent coordination for therapeutic AI systems</li>
              </ul>
            </GlassCard>
          </section>

          {/* Current Stack */}
          <section className={`${styles.section} reveal-text delay-6`}>
            <GlassCard reflection>
              <h2 className={styles.sectionTitle}>⚙️ Current Stack</h2>
              <div className={styles.stack}>
                <div className={styles.stackCategory}>
                  <h3>Frontend</h3>
                  <p>Next.js 15.2.4, React 19, TypeScript, Tailwind CSS v4</p>
                </div>
                <div className={styles.stackCategory}>
                  <h3>Backend</h3>
                  <p>Node.js 20.x, Python, FastAPI, Supabase RLS</p>
                </div>
                <div className={styles.stackCategory}>
                  <h3>AI/ML</h3>
                  <p>Ollama, vLLM, NVIDIA NeMo/Riva, OpenAI, Claude Code</p>
                </div>
                <div className={styles.stackCategory}>
                  <h3>Infrastructure</h3>
                  <p>NVIDIA RTX 5090, CUDA 13.0, Vercel, Docker</p>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Current Mindset */}
          <section className={`${styles.section} reveal-text delay-7`}>
            <GlassCard glow>
              <h2 className={styles.sectionTitle}>💭 Current Mindset</h2>
              <blockquote className={styles.quote}>
                "Building gods from silicon. Where consciousness meets code in the quiet darkness.
                I believe AI should amplify human will, not replace it. Creation happens in solitude.
                The future belongs to those who build it alone."
              </blockquote>
              <p className={styles.philosophy}>
                I'm focused on building AI that serves human freedom, not corporate profit. Every
                line of code is a step toward systems that think with us, not for us.
              </p>
            </GlassCard>
          </section>

          {/* Footer */}
          <div className={`${styles.footer} reveal-text delay-8`}>
            <p>
              Want to know more?{' '}
              <Link href="/about">Read my story</Link> or{' '}
              <Link href="/projects">see what I've built</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
