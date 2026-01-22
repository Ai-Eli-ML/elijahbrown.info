'use client';

import Link from 'next/link';
import styles from '../page.module.css';

export default function SphereRocketPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <Link href="/private" style={{ color: '#666', fontSize: '0.9rem', textDecoration: 'none' }}>
            &larr; Back to Private Hub
          </Link>
          <h1 className={styles.title} style={{ marginTop: '1rem' }}>Sphere Rocket Contract Dispute</h1>
          <p className={styles.subtitle}>White Label Agreement Analysis - January 2026</p>
        </header>

        {/* Executive Summary */}
        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Executive Summary</h2>
            <p>
              After approximately 6 weeks with the Sphere Rocket White Label program, I am requesting early
              termination due to failure to receive the value proposition presented during the sales process.
              Despite paying $1,000/month, I have generated <strong style={{ color: '#ff4444' }}>zero revenue</strong> and
              received minimal actionable support.
            </p>
          </div>

          {/* Timeline */}
          <div className={styles.card}>
            <h2>Timeline of Events</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(0, 255, 136, 0.05)', borderRadius: '8px' }}>
                <span style={{ color: '#00ff88' }}>Dec 3, 2025</span>
                <span style={{ color: '#ccc' }}>Signed White Label Agreement ($1,000/mo, 12-month term)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(0, 255, 136, 0.05)', borderRadius: '8px' }}>
                <span style={{ color: '#00ff88' }}>Dec 27, 2025</span>
                <span style={{ color: '#ccc' }}>Signed Gold Affiliate Form (20% revenue share)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255, 68, 68, 0.1)', borderRadius: '8px' }}>
                <span style={{ color: '#ff6666' }}>Jan 15, 2026</span>
                <span style={{ color: '#ccc' }}>Requested cancellation via Slack to MJ</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255, 68, 68, 0.1)', borderRadius: '8px' }}>
                <span style={{ color: '#ff6666' }}>Jan 15, 2026</span>
                <span style={{ color: '#ccc' }}>Cancellation denied - cited 1-year contract</span>
              </div>
            </div>
          </div>

          {/* Contract Terms */}
          <div className={styles.card}>
            <h2>Contract Terms (White Label Agreement)</h2>
            <div className={styles.techGrid}>
              <div className={styles.techItem}>
                <strong>Article 5.1</strong>
                <span>12-month initial term</span>
              </div>
              <div className={styles.techItem}>
                <strong>Article 5.3</strong>
                <span>No early termination during initial term</span>
              </div>
              <div className={styles.techItem}>
                <strong>Article 6</strong>
                <span>Binding arbitration in Frisco, Texas</span>
              </div>
              <div className={styles.techItem}>
                <strong>Monthly Fee</strong>
                <span>$1,000/month = $12,000 total commitment</span>
              </div>
            </div>
          </div>

          {/* What Was Presented vs Reality */}
          <div className={styles.card}>
            <h2>What Was Presented vs. Reality</h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>1. ClickFunnels Access</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(0, 255, 136, 0.05)', borderRadius: '8px' }}>
                  <strong style={{ color: '#00ff88', fontSize: '0.8rem' }}>PRESENTED</strong>
                  <p style={{ color: '#ccc', marginTop: '0.5rem' }}>&quot;You&apos;ll have ClickFunnels&quot;</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255, 68, 68, 0.05)', borderRadius: '8px' }}>
                  <strong style={{ color: '#ff6666', fontSize: '0.8rem' }}>REALITY</strong>
                  <p style={{ color: '#ccc', marginTop: '0.5rem' }}>Templates only - disclosed @ 1:03:02</p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>2. Sales Representative Outreach</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(0, 255, 136, 0.05)', borderRadius: '8px' }}>
                  <strong style={{ color: '#00ff88', fontSize: '0.8rem' }}>PRESENTED</strong>
                  <p style={{ color: '#ccc', marginTop: '0.5rem' }}>Dedicated sales support</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255, 68, 68, 0.05)', borderRadius: '8px' }}>
                  <strong style={{ color: '#ff6666', fontSize: '0.8rem' }}>REALITY</strong>
                  <p style={{ color: '#ccc', marginTop: '0.5rem' }}>Only available after 5 referrals - disclosed @ 1:01:38</p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>3. Group Chat Support</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(0, 255, 136, 0.05)', borderRadius: '8px' }}>
                  <strong style={{ color: '#00ff88', fontSize: '0.8rem' }}>PRESENTED</strong>
                  <p style={{ color: '#ccc', marginTop: '0.5rem' }}>Active follow-up support</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255, 68, 68, 0.05)', borderRadius: '8px' }}>
                  <strong style={{ color: '#ff6666', fontSize: '0.8rem' }}>REALITY</strong>
                  <p style={{ color: '#ccc', marginTop: '0.5rem' }}>Minimal engagement, generic responses</p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>4. Lead Generation</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(0, 255, 136, 0.05)', borderRadius: '8px' }}>
                  <strong style={{ color: '#00ff88', fontSize: '0.8rem' }}>PRESENTED</strong>
                  <p style={{ color: '#ccc', marginTop: '0.5rem' }}>Help with booking leads</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255, 68, 68, 0.05)', borderRadius: '8px' }}>
                  <strong style={{ color: '#ff6666', fontSize: '0.8rem' }}>REALITY</strong>
                  <p style={{ color: '#ccc', marginTop: '0.5rem' }}>User books their own leads - disclosed @ 1:00:20</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>5. VA Vetting Quality</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(0, 255, 136, 0.05)', borderRadius: '8px' }}>
                  <strong style={{ color: '#00ff88', fontSize: '0.8rem' }}>PRESENTED</strong>
                  <p style={{ color: '#ccc', marginTop: '0.5rem' }}>Pre-vetted qualified VAs</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255, 68, 68, 0.05)', borderRadius: '8px' }}>
                  <strong style={{ color: '#ff6666', fontSize: '0.8rem' }}>REALITY</strong>
                  <p style={{ color: '#ccc', marginTop: '0.5rem' }}>Quality concerns with provided VAs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Analysis */}
          <div className={styles.card}>
            <h2>Evidence Analysis</h2>
            <div style={{ background: 'rgba(255, 200, 0, 0.1)', border: '1px solid rgba(255, 200, 0, 0.3)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <strong style={{ color: '#ffcc00' }}>Fathom AI Transcript Review</strong>
              <p style={{ color: '#ccc', marginTop: '0.5rem' }}>
                Key limitations WERE disclosed during the sales call at timestamps 1:00:20, 1:01:38, and 1:03:02.
                This weakens any misrepresentation claim.
              </p>
            </div>
            <p style={{ color: '#aaa' }}>
              <strong>However:</strong> The manner of disclosure may have been buried in rapid conversation.
              Emphasis was placed on the value proposition, not the limitations.
            </p>
          </div>

          {/* Results */}
          <div className={styles.card}>
            <h2>Results After 6+ Weeks</h2>
            <div className={styles.metricsGrid}>
              <div className={styles.metric}>
                <span className={styles.metricValue} style={{ color: '#ff4444' }}>$0</span>
                <span className={styles.metricLabel}>Revenue Generated</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue} style={{ color: '#ff4444' }}>0</span>
                <span className={styles.metricLabel}>Leads Converted</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue} style={{ color: '#ff4444' }}>0</span>
                <span className={styles.metricLabel}>Clients Acquired</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue} style={{ color: '#ff4444' }}>-$2,000+</span>
                <span className={styles.metricLabel}>ROI (2 months paid)</span>
              </div>
            </div>
          </div>

          {/* Strategic Position */}
          <div className={styles.card}>
            <h2>Strategic Position</h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#00ff88', fontSize: '1rem', marginBottom: '0.75rem' }}>Arguments FOR Mutual Termination</h3>
              <ul style={{ color: '#ccc', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li><strong>Zero Value Delivered:</strong> Neither party benefits from continuing</li>
                <li><strong>Brand Risk:</strong> An unhappy white label partner damages Sphere Rocket&apos;s reputation</li>
                <li><strong>No Active Promotion:</strong> I cannot in good conscience promote a program I&apos;ve had no success with</li>
                <li><strong>Clean Exit:</strong> Better for both parties than a contentious 10-month relationship</li>
              </ul>
            </div>

            <div>
              <h3 style={{ color: '#ff6666', fontSize: '1rem', marginBottom: '0.75rem' }}>Arguments AGAINST Misrepresentation Claim</h3>
              <ul style={{ color: '#ccc', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Fathom transcript shows limitations were disclosed</li>
                <li>Contract is legally binding with clear terms</li>
                <li>Arbitration would be costly and in Texas (their jurisdiction)</li>
                <li>&quot;Buyer&apos;s remorse&quot; is not grounds for contract breach</li>
              </ul>
            </div>
          </div>

          {/* Proposed Resolution */}
          <div className={styles.card}>
            <h2>Proposed Resolution</h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)', borderRadius: '8px' }}>
                <strong style={{ color: '#00ff88' }}>Option A - Mutual Termination (Preferred)</strong>
                <ul style={{ color: '#ccc', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li>Pay 2-3 months as termination fee ($2,000-$3,000)</li>
                  <li>Clean exit with no ongoing obligations</li>
                  <li>Both parties agree not to disparage</li>
                </ul>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(255, 200, 0, 0.05)', border: '1px solid rgba(255, 200, 0, 0.2)', borderRadius: '8px' }}>
                <strong style={{ color: '#ffcc00' }}>Option B - Continue Under Protest</strong>
                <ul style={{ color: '#ccc', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li>Complete remaining 10 months</li>
                  <li>Document all interactions</li>
                  <li>Pursue arbitration at term end if warranted</li>
                </ul>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(255, 68, 68, 0.05)', border: '1px solid rgba(255, 68, 68, 0.2)', borderRadius: '8px' }}>
                <strong style={{ color: '#ff6666' }}>Option C - Cease Payment (Not Recommended)</strong>
                <ul style={{ color: '#ccc', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li>Risk collections action</li>
                  <li>Potential credit impact</li>
                  <li>Could force arbitration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className={styles.card}>
            <h2>Supporting Documents</h2>
            <ol style={{ color: '#ccc', paddingLeft: '1.5rem', lineHeight: '2' }}>
              <li>White Label Agreement (signed Dec 3, 2025)</li>
              <li>Gold Affiliate Form (signed Dec 27, 2025)</li>
              <li>Fathom AI Transcript Analysis</li>
              <li>Slack conversation history</li>
              <li>This summary document</li>
            </ol>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>AdvancingTechnology Internal Documentation - Prepared January 21, 2026</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#555' }}>
            This document is prepared for dispute resolution purposes. All claims should be verified against original contract documents and recordings.
          </p>
        </footer>
      </div>
    </div>
  );
}
