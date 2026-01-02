import styles from './ProjectCard.module.css';

export type ProjectStatus = 'building' | 'concept' | 'launched';

interface ProjectCardProps {
  title: string;
  description: string;
  status: ProjectStatus;
  stack?: string;
  vision?: string;
}

export default function ProjectCard({
  title,
  description,
  status,
  stack,
  vision,
}: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={`${styles.status} ${styles[status]}`} data-status={status}>
          {status}
        </span>
      </div>

      <p className={styles.description}>{description}</p>

      {stack && (
        <div className={styles.meta}>
          <span className={styles.label}>Stack:</span>
          <span className={styles.value}>{stack}</span>
        </div>
      )}

      {vision && (
        <div className={styles.meta}>
          <span className={styles.label}>Vision:</span>
          <span className={styles.value}>{vision}</span>
        </div>
      )}
    </div>
  );
}
