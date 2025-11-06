import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import HolographicText from '@/components/effects/HolographicText';
import FloatingOrb from '@/components/effects/FloatingOrb';
import styles from './page.module.css';

export default function Home() {
  return (
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
  );
}
