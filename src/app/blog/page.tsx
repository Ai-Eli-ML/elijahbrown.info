import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import GlassCard from '@/components/GlassCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on AI, autonomy, and building the future. Reflections from the void on artificial intelligence, machine learning, and the future of human-AI collaboration.',
  alternates: {
    canonical: 'https://elijahbrown.info/blog',
  },
  openGraph: {
    title: 'Blog | Elijah Brown',
    description: 'Thoughts on AI, autonomy, and building the future.',
    url: 'https://elijahbrown.info/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Blog | Elijah Brown',
    description: 'Thoughts on AI, autonomy, and building the future.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className={styles.page}>
      <div className="container container-lg">
        <div className={styles.header}>
          <h1 className={`${styles.pageTitle} reveal-text`}>Blog</h1>
          <p className={`${styles.description} reveal-text delay-1`}>
            Thoughts on AI, autonomy, and building the future. Reflections from the void.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className={`${styles.empty} reveal-text delay-2`}>
            <GlassCard>
              <p className={styles.emptyText}>
                The archive is empty. New transmissions incoming soon...
              </p>
            </GlassCard>
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post, index) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className={`${styles.postLink} reveal-text`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <GlassCard reflection>
                  <div className={styles.postCard}>
                    <time className={styles.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postDescription}>{post.description}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className={styles.tags}>
                        {post.tags.map(tag => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
