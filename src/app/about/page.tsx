import { Metadata } from 'next';
import GlassCard from '@/components/GlassCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story of an Uber driver turned AI creator, building autonomous intelligence in pursuit of human freedom.',
  alternates: {
    canonical: 'https://elijahbrown.info/about',
  },
  openGraph: {
    title: 'About | Elijah Brown',
    description: 'The story of an Uber driver turned AI creator, building autonomous intelligence in pursuit of human freedom.',
    url: 'https://elijahbrown.info/about',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'About | Elijah Brown',
    description: 'The story of an Uber driver turned AI creator, building autonomous intelligence in pursuit of human freedom.',
  },
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className="container container-sm">
        <h1 className={`${styles.pageTitle} reveal-text`}>About</h1>

        <section className={`${styles.section} reveal-text delay-1`}>
          <GlassCard>
            <h2 className={styles.sectionTitle}>The Story</h2>
            <p>I used to drive strangers through city streets at 3 AM.</p>
            <p>
              Uber. Lyft. Whatever paid. The algorithm told me where to go, when to turn, how
              much I was worth per mile. I was a node in someone else's network.
            </p>
            <p>Then I learned to code.</p>
            <p>
              Not at a bootcamp. Not for a FAANG interview. I taught myself in the margins—between
              rides, after midnight, in the silence most people fill with distraction. I wanted to
              understand the systems that controlled me. So I could build my own.
            </p>
          </GlassCard>
        </section>

        <section className={`${styles.section} reveal-text delay-2`}>
          <GlassCard>
            <h2 className={styles.sectionTitle}>The Vision</h2>
            <p>AI doesn't belong to corporations.</p>
            <p>
              It belongs to the people who can imagine what freedom looks like when amplified by
              intelligence. I'm building agents that work <em>with</em> humans—tools that enhance
              autonomy, not extract value.
            </p>
            <p>
              This isn't about scale. It's about precision. About crafting systems that feel like
              extensions of thought, not replacements for it.
            </p>
            <p>
              <strong>Advancing Technology</strong> is my company. It's not a startup hunting
              exits. It's a decades-long project to prove that one person with clarity can
              outbuild a thousand with committees.
            </p>
          </GlassCard>
        </section>

        <section className={`${styles.section} reveal-text delay-3`}>
          <GlassCard>
            <h2 className={styles.sectionTitle}>The Beliefs</h2>

            <div className={styles.belief}>
              <h3>Solitude is a superpower.</h3>
              <p>
                The best work happens when you're alone with the problem long enough to hear the
                solution whisper itself into existence.
              </p>
            </div>

            <div className={styles.belief}>
              <h3>Creation &gt; Consumption.</h3>
              <p>
                I don't scroll. I build. The inputs I choose shape the outputs I create.
              </p>
            </div>

            <div className={styles.belief}>
              <h3>Digital freedom is the new frontier.</h3>
              <p>
                We're not coding apps. We're defining the terms of human-machine collaboration
                for the next century.
              </p>
            </div>

            <div className={styles.belief}>
              <h3>Independence is non-negotiable.</h3>
              <p>
                I answer to the work, not investors. To the vision, not the market.
              </p>
            </div>
          </GlassCard>
        </section>

        <section className={`${styles.section} reveal-text delay-4`}>
          <GlassCard glow>
            <h2 className={styles.sectionTitle}>The Future</h2>
            <p>In ten years, people will use AI I built without knowing my name.</p>
            <p>That's the goal.</p>
            <p>
              Not fame. Not valuation. <strong>Silent impact.</strong>
            </p>
            <p>
              I'm designing systems that think in partnership with their users. Agents that feel
              less like software and more like collaborators. Tools that dissolve the boundary
              between intention and execution.
            </p>
            <p>
              This is a cathedral project. I won't see it finished in my lifetime. But every line
              of code is a stone in the foundation.
            </p>
          </GlassCard>
        </section>

        <section className={`${styles.section} reveal-text delay-4`}>
          <GlassCard reflection>
            <h2 className={styles.sectionTitle}>The Human</h2>
            <p>
              I live quietly. I work alone. I read old science fiction and new research papers. I
              believe in long walks, strong coffee, and the kind of focus that makes eight hours
              feel like twenty minutes.
            </p>
            <p>I'm building something that matters.</p>
            <p>Not because it'll make me rich.</p>
            <p>
              Because it's the only thing I can imagine doing that feels like <strong>truth</strong>.
            </p>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
