'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/private';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect with password as query param - middleware will validate
    window.location.href = `${redirect}?password=${encodeURIComponent(password)}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.icon}>&#x1F512;</div>
        <h1 className={styles.title}>Private Access</h1>
        <p className={styles.subtitle}>This area contains internal documentation</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter access code"
            className={styles.input}
            autoFocus
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Access
          </button>
        </form>

        <p className={styles.hint}>
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}

export default function PrivateLoginPage() {
  return (
    <Suspense fallback={
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <div className={styles.icon}>&#x1F512;</div>
          <h1 className={styles.title}>Loading...</h1>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
