'use client';

import { useState } from 'react';
import MeetingList from '@/components/fathom/MeetingList';
import styles from './page.module.css';

export default function ColleenPage() {
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [showLiveMeetings, setShowLiveMeetings] = useState(false);

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
          <h1 className={styles.title}>Welcome, Colleen</h1>
          <p className={styles.subtitle}>PaperPrisons.org Project Hub</p>
          <p className={styles.lastUpdated}>{currentDate}</p>
        </header>

        <section className={styles.mainContent}>
          {/* Active Status Banner */}
          <div className={styles.statusBanner}>
            <div className={styles.statusHeader}>
              <span className={styles.statusIcon}>🚀</span>
              <div>
                <h2>Build In Progress</h2>
                <p>Eli has taken over - building now for Monday deadline</p>
              </div>
            </div>
            <div className={styles.statusDetails}>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>Deadline</span>
                <span className={styles.statusValue}>Monday, Jan 12 (Anniversary)</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>Approach</span>
                <span className={styles.statusValue}>Next.js + Talkspace-style design</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>Backup Plan</span>
                <span className={styles.statusValue}>PHP refresh on separate branch</span>
              </div>
            </div>
          </div>

          {/* Today's Tasks */}
          <div className={styles.card}>
            <h2>Today's Build Plan</h2>
            <p>Dual-track approach to ensure we hit Monday:</p>
            <ul className={styles.taskList}>
              <li className={styles.taskItem}>
                <span className={styles.taskCheck}>✓</span>
                Husky handoff complete - Eli taking over
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskCheck}>✓</span>
                GitHub collaborator access confirmed
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Clone repo & set up branches (next-rebuild + php-refresh)
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Build Talkspace-style landing page (Next.js)
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Deploy to Vercel for preview
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Innovation Lab blog structure
              </li>
              <li className={styles.taskItem}>
                <span className={styles.taskPending}>○</span>
                Team page rebuild
              </li>
            </ul>
          </div>

          {/* What Eli Knows You Need */}
          <div className={styles.card}>
            <h2>Scope Confirmed</h2>
            <p>Based on our calls and your docs:</p>
            <ul className={styles.scopeList}>
              <li><strong>Landing Page:</strong> Talkspace-style redesign</li>
              <li><strong>Team Page:</strong> Needs to be redone</li>
              <li><strong>Innovation Lab:</strong> New blog section with:
                <ul>
                  <li>Tools for Pro Se Defendants</li>
                  <li>Tools for Researchers</li>
                  <li>Tools for Advocates</li>
                </ul>
              </li>
              <li><strong>Diary Tool:</strong> New diary for DLS project</li>
              <li><strong>Existing Tools:</strong> Keep RJA, diary.html working (Navid coordination)</li>
            </ul>
          </div>

          {/* Live Meeting Notes Card */}
          <div className={styles.card}>
            <h2>Meeting Notes</h2>
            <p>Access our Zoom meeting recordings and AI-generated notes:</p>

            {/* Meeting Cards */}
            <div className={styles.meetingCards}>
              <a
                href="https://fathom.video/share/xEDZo5z_fvGXN1HJjXGMRHVBnsA58Hpv"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.meetingCard}
              >
                <div className={styles.meetingCardHeader}>
                  <span className={styles.meetingIcon}>📹</span>
                  <span className={styles.meetingDate}>Dec 30, 2024</span>
                </div>
                <h3 className={styles.meetingCardTitle}>Initial Discovery Call</h3>
                <p className={styles.meetingCardDesc}>Project vision, diary/blog architecture, and technical requirements</p>
                <span className={styles.watchButton}>Watch Recording →</span>
              </a>
              <a
                href="https://fathom.video/share/vzNkscgP9cTjuQSYsbFrfNkmRQi6P26V"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.meetingCard}
              >
                <div className={styles.meetingCardHeader}>
                  <span className={styles.meetingIcon}>📹</span>
                  <span className={styles.meetingDate}>Jan 2, 2025</span>
                </div>
                <h3 className={styles.meetingCardTitle}>Architecture Review</h3>
                <p className={styles.meetingCardDesc}>Next.js structure, navigation flow, and implementation roadmap</p>
                <span className={styles.watchButton}>Watch Recording →</span>
              </a>
            </div>

            {/* Toggle for Live Meeting Feed */}
            <div className={styles.divider}></div>
            <button
              onClick={() => setShowLiveMeetings(!showLiveMeetings)}
              className={styles.secondaryButton}
            >
              {showLiveMeetings ? 'Hide All Meetings' : 'View All Meetings (Live Feed)'}
            </button>

            {/* Live Meeting List */}
            {showLiveMeetings && (
              <div className={styles.liveMeetingsContainer}>
                <MeetingList
                  maxMeetings={10}
                  showSummary={true}
                  showActionItems={true}
                />
              </div>
            )}
          </div>

          {/* Architecture Document Card */}
          <div className={styles.card}>
            <h2>Technical Architecture</h2>
            <p>View the Next.js architecture plan for PaperPrisons.org with diary/blog navigation:</p>
            <button
              onClick={() => setShowArchitecture(!showArchitecture)}
              className={styles.secondaryButton}
            >
              {showArchitecture ? 'Hide Architecture Document' : 'View Architecture Document'}
            </button>
          </div>

          {/* Architecture Document Content */}
          {showArchitecture && (
            <div className={styles.architectureDoc}>
              <h2>PaperPrisons.org - Next.js Architecture</h2>

              <section className={styles.section}>
                <h3>1. Application Overview</h3>
                <p>
                  A Next.js application featuring a diary section with inline hyperlinks
                  that navigate to blog posts using the Next.js App Router.
                </p>
                <h4>Key Features:</h4>
                <ul>
                  <li><strong>Diary Section</strong> (<code>/diary</code>) - Personal narratives with embedded links</li>
                  <li><strong>Blog Section</strong> (<code>/blog</code>) - Detailed articles and resources</li>
                  <li><strong>Inline Navigation</strong> - Paragraph text with contextual hyperlinks</li>
                  <li><strong>Client-side Routing</strong> - Fast, seamless page transitions</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h3>2. File Structure</h3>
                <pre className={styles.codeBlock}>{`paperprisons.org/
├── app/
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── diary/
│   │   ├── page.tsx       # Diary list
│   │   └── [slug]/
│   │       └── page.tsx   # Individual diary entry
│   └── blog/
│       ├── page.tsx       # Blog list
│       └── [slug]/
│           └── page.tsx   # Individual blog post
└── components/
    ├── Paragraph.tsx      # Paragraph with inline links
    └── BlogLink.tsx       # Blog link component`}</pre>
              </section>

              <section className={styles.section}>
                <h3>3. Navigation Flow</h3>
                <div className={styles.flowDiagram}>
                  <div className={styles.flowStep}>
                    <span className={styles.flowNumber}>1</span>
                    <span>User visits /diary</span>
                  </div>
                  <div className={styles.flowArrow}>→</div>
                  <div className={styles.flowStep}>
                    <span className={styles.flowNumber}>2</span>
                    <span>Reads diary with embedded links</span>
                  </div>
                  <div className={styles.flowArrow}>→</div>
                  <div className={styles.flowStep}>
                    <span className={styles.flowNumber}>3</span>
                    <span>Clicks hyperlink in paragraph</span>
                  </div>
                  <div className={styles.flowArrow}>→</div>
                  <div className={styles.flowStep}>
                    <span className={styles.flowNumber}>4</span>
                    <span>Client-side navigation to /blog/[slug]</span>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h3>4. Paragraph Component with Links</h3>
                <pre className={styles.codeBlock}>{`// components/Paragraph.tsx
import Link from 'next/link'

interface Segment {
  type: 'text' | 'link'
  text: string
  slug?: string
}

export function Paragraph({ content }: { content: Segment[] }) {
  return (
    <p className="text-gray-700 leading-relaxed">
      {content.map((segment, i) =>
        segment.type === 'link' ? (
          <Link
            key={i}
            href={\`/blog/\${segment.slug}\`}
            className="text-blue-600 hover:underline"
          >
            {segment.text}
          </Link>
        ) : (
          <span key={i}>{segment.text}</span>
        )
      )}
    </p>
  )
}`}</pre>
              </section>

              <section className={styles.section}>
                <h3>5. Example Usage in Diary</h3>
                <pre className={styles.codeBlock}>{`// app/diary/[slug]/page.tsx
import { Paragraph } from '@/components/Paragraph'

export default function DiaryEntry() {
  const content = [
    { type: 'text', text: 'Today I learned about ' },
    { type: 'link', text: 'prison reform initiatives', slug: 'prison-reform' },
    { type: 'text', text: ' and how they affect families.' }
  ]

  return (
    <article>
      <h1>My Journey</h1>
      <Paragraph content={content} />
    </article>
  )
}`}</pre>
              </section>

              <section className={styles.section}>
                <h3>6. Technology Stack</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Layer</th>
                      <th>Technology</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Framework</td>
                      <td>Next.js 15</td>
                      <td>React framework with App Router</td>
                    </tr>
                    <tr>
                      <td>UI Library</td>
                      <td>React 19</td>
                      <td>Component-based UI</td>
                    </tr>
                    <tr>
                      <td>Styling</td>
                      <td>Tailwind CSS</td>
                      <td>Utility-first CSS framework</td>
                    </tr>
                    <tr>
                      <td>Content</td>
                      <td>MDX / Contentlayer</td>
                      <td>Markdown with React components</td>
                    </tr>
                    <tr>
                      <td>Hosting</td>
                      <td>Vercel</td>
                      <td>Edge deployment with CDN</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className={styles.section}>
                <h3>7. Key Benefits</h3>
                <ul>
                  <li><strong>SEO Optimized</strong> - Static generation for diary and blog content</li>
                  <li><strong>Fast Navigation</strong> - Client-side routing with prefetching</li>
                  <li><strong>Contextual Links</strong> - Inline hyperlinks create natural reading flow</li>
                  <li><strong>Maintainable</strong> - Clear separation between diary and blog content</li>
                  <li><strong>Scalable</strong> - Easy to add new diary entries and blog posts</li>
                  <li><strong>Accessible</strong> - Semantic HTML with proper link handling</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h3>8. Next Steps</h3>
                <ol>
                  <li>Set up Next.js project with App Router</li>
                  <li>Create diary and blog page structures</li>
                  <li>Implement Paragraph component with link parsing</li>
                  <li>Add content (MDX files or CMS integration)</li>
                  <li>Style with Tailwind CSS</li>
                  <li>Deploy to Vercel</li>
                </ol>
              </section>
            </div>
          )}

          {/* Contact Card */}
          <div className={styles.card}>
            <h2>Questions?</h2>
            <p>
              Reach out anytime if you have questions about the project or need clarification
              on the technical implementation.
            </p>
            <a
              href="https://elijahbrown.info/contact"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
            >
              Contact Elijah
            </a>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>PaperPrisons.org Project Documentation</p>
        </footer>
      </div>
    </div>
  );
}
