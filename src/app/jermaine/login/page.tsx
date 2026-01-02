'use client';

import { Suspense } from 'react';
import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const redirect = searchParams.get('redirect') || '/jermaine';

    // Redirect with password in URL (middleware will validate and set cookie)
    router.push(`${redirect}?password=${encodeURIComponent(password)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Enter password"
          required
          autoFocus
        />
      </div>

      {error && (
        <p className={styles.error}>{error}</p>
      )}

      <button
        type="submit"
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Verifying...' : 'Enter'}
      </button>
    </form>
  );
}

function LoginFormFallback() {
  return (
    <div className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Password</label>
        <input
          type="password"
          className={styles.input}
          placeholder="Loading..."
          disabled
        />
      </div>
      <button className={styles.button} disabled>
        Enter
      </button>
    </div>
  );
}

export default function JermaineLogin() {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Private Page</h1>
          <p className={styles.subtitle}>This content is password protected</p>
        </div>

        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>

        <p className={styles.footer}>
          Contact the site owner if you need access
        </p>
      </div>
    </div>
  );
}
