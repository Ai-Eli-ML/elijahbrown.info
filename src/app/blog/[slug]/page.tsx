import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug, getAdjacentPosts } from '@/lib/blog';
import GlassCard from '@/components/GlassCard';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';
import PostNavigation from '@/components/blog/PostNavigation';
import ViewCounter from '@/components/blog/ViewCounter';
import styles from './page.module.css';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://elijahbrown.info/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Elijah Brown`,
      description: post.description,
      url: `https://elijahbrown.info/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Elijah Brown'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Elijah Brown`,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className={styles.page}>
      <div className="container container-xl">
        <Link href="/blog" className={styles.backLink}>
          ← Back to blog
        </Link>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <TableOfContents />
          </aside>

          <article className={styles.article}>
            <header className={styles.header}>
              <time className={styles.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h1 className={styles.title}>{post.title}</h1>
              {post.description && <p className={styles.description}>{post.description}</p>}

              <div className={styles.meta}>
                {post.readingTime && (
                  <span className={styles.readingTime}>
                    📖 {post.readingTime} min read
                  </span>
                )}
                <ViewCounter slug={slug} />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map(tag => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <GlassCard>
              <div className={styles.content}>
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeHighlight],
                    },
                  }}
                />
              </div>
            </GlassCard>

            <div className={styles.footer}>
              <ShareButtons title={post.title} slug={slug} />
              <PostNavigation prev={prev} next={next} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
