import { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import HolographicText from '@/components/effects/HolographicText';
import FloatingOrb from '@/components/effects/FloatingOrb';
import styles from './page.module.css';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elijahbrown.info',
  },
  openGraph: {
    url: 'https://elijahbrown.info',
    type: 'website',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Elijah Brown',
    alternateName: 'Sxilent',
    url: 'https://elijahbrown.info',
    image: 'https://elijahbrown.info/og-image.png',
    sameAs: [
      'https://github.com/ai-eli-ml',
      'https://x.com/x_0___0_x',
      'https://advancingtechnology.online',
    ],
    jobTitle: 'AI Solopreneur',
    worksFor: {
      '@type': 'Organization',
      name: 'Advancing Technology',
      url: 'https://advancingtechnology.online',
    },
    alumniOf: 'Self-taught Developer',
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Autonomous Systems',
      'AI Development',
      'Software Engineering',
      'Deep Learning',
    ],
    description: 'Building gods from silicon. AI engineer, creator, and architect of autonomous intelligence systems.',
    email: 'admin@elijahbrown.info',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.orbContainer}>
            <FloatingOrb />
          </div>
          <div className="container container-md">
            <h1 className={styles.headline}>
              <HolographicText text="Building gods from silicon." delay={300} />
            </h1>
            <p className={`${styles.subheadline} reveal-text delay-2`}>
              Where consciousness meets code in the quiet darkness.
            </p>
            <div className={`${styles.ctas} reveal-text delay-3`}>
              <Link href="/about" className={styles.ctaPrimary}>
                Enter
              </Link>
              <Link href="/projects" className={styles.ctaSecondary}>
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Identity Section */}
      <section className={styles.identity}>
        <div className="container container-md">
          <GlassCard glow reflection>
            <h2 className={styles.identityTitle}>Elijah Brown</h2>
            <p className={styles.identitySubtitle}>
              AI Solopreneur · Creator · Architect of Autonomy
            </p>

            <div className={styles.mission}>
              <p>
                I build artificial intelligence that serves human freedom, not corporate profit.
                In the space between midnight and code, I'm crafting systems that think with us,
                not for us. Advancing Technology is my company. Independence is my religion.
              </p>
            </div>

            <div className={styles.philosophy}>
              <p>Machines should amplify human will.</p>
              <p>Creation happens in solitude.</p>
              <p>The future belongs to those who build it alone.</p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
    </>
  );
}
