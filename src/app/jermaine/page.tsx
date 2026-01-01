'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function JermainePage() {
  const [showRoadmap, setShowRoadmap] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.icon}>&#x1F3DB;</div>
          <h1 className={styles.title}>Welcome, Jermaine</h1>
          <p className={styles.subtitle}>Living History AI - Research Hub</p>
        </header>

        <section className={styles.mainContent}>
          {/* Vision Card */}
          <div className={styles.card}>
            <h2>Your Vision</h2>
            <blockquote className={styles.quote}>
              &ldquo;Everything that is in nature from the past can be shared in a new way.&rdquo;
            </blockquote>
            <p>
              Using AI agents and LLMs to bring historical figures to life, making history
              accessible and engaging for modern audiences through video content.
            </p>
          </div>

          {/* Research Profile Card */}
          <div className={styles.card}>
            <h2>Research Profile</h2>
            <p>Your comprehensive research profile documenting the Living History AI project:</p>
            <a
              href="/research/jermaine-historical-ai-profile"
              className={styles.primaryButton}
            >
              View Full Research Profile
            </a>
          </div>

          {/* Completed Works Card */}
          <div className={styles.card}>
            <h2>Completed Agent Reports</h2>
            <div className={styles.agentList}>
              <a href="/blog/dessalines-battles-against-france" className={styles.agentItem}>
                <span className={styles.agentIcon}>&#x2694;</span>
                <div className={styles.agentInfo}>
                  <h3>Jean-Jacques Dessalines</h3>
                  <p>Battling the French - Haitian Revolution</p>
                </div>
                <span className={styles.statusBadge}>Complete</span>
              </a>
            </div>
          </div>

          {/* Upcoming Figures Card */}
          <div className={styles.card}>
            <h2>Upcoming Historical Figures</h2>
            <p>Phase 1: Haitian Revolution & Caribbean History</p>
            <div className={styles.figureGrid}>
              <div className={styles.figureCard}>
                <span className={styles.figureIcon}>&#x1F451;</span>
                <h4>Toussaint Louverture</h4>
                <span className={styles.priority}>High Priority</span>
              </div>
              <div className={styles.figureCard}>
                <span className={styles.figureIcon}>&#x1F3F0;</span>
                <h4>Henri Christophe</h4>
                <span className={styles.priority}>High Priority</span>
              </div>
              <div className={styles.figureCard}>
                <span className={styles.figureIcon}>&#x1F525;</span>
                <h4>Boukman Dutty</h4>
                <span className={styles.priority}>High Priority</span>
              </div>
              <div className={styles.figureCard}>
                <span className={styles.figureIcon}>&#x2694;</span>
                <h4>Marie-Jeanne Lamartiniere</h4>
                <span className={styles.priority}>Medium Priority</span>
              </div>
            </div>
          </div>

          {/* Roadmap Card */}
          <div className={styles.card}>
            <h2>Project Roadmap</h2>
            <p>View the quarterly development plan for Living History AI:</p>
            <button
              onClick={() => setShowRoadmap(!showRoadmap)}
              className={styles.secondaryButton}
            >
              {showRoadmap ? 'Hide Roadmap' : 'View Roadmap'}
            </button>
          </div>

          {/* Roadmap Content */}
          {showRoadmap && (
            <div className={styles.roadmapDoc}>
              <h2>2026 Development Roadmap</h2>

              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineQuarter}>Q1</div>
                  <div className={styles.timelineContent}>
                    <h4>Foundation</h4>
                    <ul>
                      <li>Complete Toussaint Louverture agent</li>
                      <li>Complete Henri Christophe agent</li>
                      <li>Establish voice synthesis pipeline</li>
                      <li>Create first video prototype</li>
                    </ul>
                  </div>
                </div>

                <div className={styles.timelineItem}>
                  <div className={styles.timelineQuarter}>Q2</div>
                  <div className={styles.timelineContent}>
                    <h4>Video Launch</h4>
                    <ul>
                      <li>Launch &ldquo;Voices of Haiti&rdquo; video series</li>
                      <li>Expand to Pan-African figures</li>
                      <li>Build interactive Q&A capability</li>
                      <li>Partnership outreach to educators</li>
                    </ul>
                  </div>
                </div>

                <div className={styles.timelineItem}>
                  <div className={styles.timelineQuarter}>Q3</div>
                  <div className={styles.timelineContent}>
                    <h4>Expansion</h4>
                    <ul>
                      <li>Multi-language support (French, Creole, Spanish)</li>
                      <li>Mobile app for historical conversations</li>
                      <li>Educational curriculum integration</li>
                      <li>Museum installation prototype</li>
                    </ul>
                  </div>
                </div>

                <div className={styles.timelineItem}>
                  <div className={styles.timelineQuarter}>Q4</div>
                  <div className={styles.timelineContent}>
                    <h4>Scale</h4>
                    <ul>
                      <li>Full platform launch</li>
                      <li>Revenue model implementation</li>
                      <li>Expand to global revolutionary figures</li>
                      <li>Documentary distribution partnerships</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Card */}
          <div className={styles.card}>
            <h2>Technology Stack</h2>
            <div className={styles.techGrid}>
              <div className={styles.techItem}>
                <span className={styles.techLabel}>LLM</span>
                <span className={styles.techValue}>Claude Opus 4.5</span>
              </div>
              <div className={styles.techItem}>
                <span className={styles.techLabel}>Voice</span>
                <span className={styles.techValue}>NVIDIA NeMo</span>
              </div>
              <div className={styles.techItem}>
                <span className={styles.techLabel}>GPU</span>
                <span className={styles.techValue}>RTX 5090</span>
              </div>
              <div className={styles.techItem}>
                <span className={styles.techLabel}>RAG</span>
                <span className={styles.techValue}>Qdrant</span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className={styles.card}>
            <h2>Need Help?</h2>
            <p>
              Reach out to Elijah for technical support, agent development requests,
              or to discuss new historical figures to add.
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
          <p>Living History AI - Bringing the Past to Life</p>
        </footer>
      </div>
    </div>
  );
}
