'use client';

import { useState, FormEvent } from 'react';
import GlassCard from '@/components/GlassCard';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Bot protection
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      setStatus('error');
      setErrorMessage('Invalid submission detected.');
      return;
    }

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.page}>
      <div className="container container-sm">
        <h1 className={`${styles.pageTitle} reveal-text`}>Contact</h1>

        <section className={`${styles.section} reveal-text delay-1`}>
          <GlassCard>
            <div className={styles.intro}>
              <p>
                Want to discuss a project? Have a question about my work? Or just want to connect?
              </p>
              <p>Send me a message. I read everything and respond to most.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  disabled={status === 'loading'}
                  placeholder="Your name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  disabled={status === 'loading'}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={status === 'loading'}
                  placeholder="What's this about?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows={6}
                  required
                  disabled={status === 'loading'}
                  placeholder="Tell me what you're thinking..."
                />
              </div>

              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {status === 'error' && (
                <div className={styles.error} role="alert">
                  {errorMessage}
                </div>
              )}

              {status === 'success' && (
                <div className={styles.success} role="status">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className={styles.buttonContent}>
                    <span className={styles.spinner}></span>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </GlassCard>
        </section>

        <section className={`${styles.section} reveal-text delay-2`}>
          <GlassCard reflection>
            <div className={styles.alternativeContact}>
              <h2 className={styles.sectionTitle}>Other Ways to Connect</h2>
              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <h3>GitHub</h3>
                  <p>
                    <a
                      href="https://github.com/Sxilent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      @Sxilent
                    </a>
                  </p>
                </div>
                <div className={styles.contactMethod}>
                  <h3>LinkedIn</h3>
                  <p>
                    <a
                      href="https://linkedin.com/in/elijah-brown"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Elijah Brown
                    </a>
                  </p>
                </div>
                <div className={styles.contactMethod}>
                  <h3>Twitter</h3>
                  <p>
                    <a
                      href="https://twitter.com/elijahbrown_ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      @elijahbrown_ai
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
