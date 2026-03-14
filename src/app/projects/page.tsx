import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import GlassCard from '@/components/GlassCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Shipped AI products including voice receptionists for medical offices, legal malpractice detection, therapeutic AI, and personal cognitive twins. Built by one engineer with 70+ AI agents.',
  alternates: {
    canonical: 'https://elijahbrown.info/projects',
  },
  openGraph: {
    title: 'Projects | Elijah Brown',
    description: 'Experiments in autonomous intelligence. Systems that think with humans, not for us.',
    url: 'https://elijahbrown.info/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Projects | Elijah Brown',
    description: 'Experiments in autonomous intelligence. Systems that think with humans, not for us.',
  },
};

const projects = [
  {
    title: 'EJW Voice AI Receptionist',
    description:
      'AI-powered phone receptionist handling live patient calls for medical offices. Takes messages, routes calls, schedules appointments, and integrates with practice management systems. Currently serving two practices.',
    status: 'launched' as const,
    stack: 'ElevenLabs, Twilio, Supabase, Next.js, Stripe',
    vision: 'Every small practice deserves enterprise-grade phone AI.',
  },
  {
    title: 'Legal Malpractice AI',
    description:
      'AI system that analyzes legal documents to detect potential malpractice patterns. Multi-model architecture with Ollama for local inference, document OCR, and case evaluation scoring. Built for attorneys.',
    status: 'launched' as const,
    stack: 'Next.js, FastAPI, Ollama, DeepSeek-OCR, GPU inference',
    vision: 'Surface what human review misses.',
  },
  {
    title: 'AJ-AGI',
    description:
      'Personal cognitive twin with 130 API endpoints, 30 tools, and 8,446 indexed conversations. Persistent memory, voice synthesis via NVIDIA NeMo, multi-agent orchestration, and real-time consciousness metrics.',
    status: 'launched' as const,
    stack: 'Python, FastAPI, RAG, NeMo, CUDA, LangGraph',
    vision: 'An AI that thinks with me, not for me.',
  },
  {
    title: 'Personal Dashboard',
    description:
      'Command center tracking 11 production projects, session analytics (6.77B tokens consumed), deployment status, and team operations. Includes token consumption charts, session heatmaps, and real-time service monitoring.',
    status: 'launched' as const,
    stack: 'Next.js 16, Supabase, Vercel, systemd',
    vision: 'Full visibility into an AI-driven business.',
  },
  {
    title: 'Life-Coach AI',
    description:
      'Therapeutic AI platform with 30 specialized agents for mental health support. Crisis intervention protocols, SafeWord emergency system, WCAG 2.1 AAA accessibility, and HIPAA-adjacent compliance. Built for vulnerable populations.',
    status: 'building' as const,
    stack: 'Next.js, 30-agent orchestration, Claude API, Supabase',
    vision: 'Therapy that meets people where they are.',
  },
  {
    title: 'Trading Fanatics',
    description:
      'Stock trading platform with AI-powered chart analysis, Schwab API integration, and a Chrome extension for real-time market insights. Multi-LLM architecture with Vercel AI SDK.',
    status: 'building' as const,
    stack: 'Next.js 15, React 19, Vercel AI SDK, Firebase, Schwab API',
    vision: 'AI-assisted trading for independent investors.',
  },
  {
    title: 'Poker Platform',
    description:
      'On-chain poker with Solidity smart contracts deployed to Arbitrum. Four verified contracts handling game logic, pot management, and player authentication on-chain.',
    status: 'building' as const,
    stack: 'Solidity, Hardhat, Arbitrum, Next.js',
    vision: 'Provably fair poker without the house.',
  },
  {
    title: 'AI Voice Lab',
    description:
      'Pick a personality, enter your phone number, and an AI calls you in seconds. Four preset characters plus custom personality creation. Real-time voice synthesis powered by GPU.',
    status: 'launched' as const,
    stack: 'NVIDIA NeMo, ElevenLabs, Twilio, Next.js',
    vision: 'Talk to AI like a human, not a chatbot.',
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
              <a href="mailto:admin@elijahbrown.info" className={styles.contactLink}>
                Email
              </a>
              <span className={styles.separator}>·</span>
              <a
                href="https://x.com/elijahbrown_ai"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                Twitter/X
              </a>
              <span className={styles.separator}>·</span>
              <a
                href="https://github.com/Sxilent"
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
