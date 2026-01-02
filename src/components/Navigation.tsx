'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          EB
        </Link>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
