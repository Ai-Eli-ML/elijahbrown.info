// Collaborator Page Generator
// Generates protected pages and login flows for collaborators

import { Collaborator, CollaboratorPageConfig } from './types';

// Generate page configuration for a collaborator
export function generatePageConfig(collaborator: Collaborator): CollaboratorPageConfig {
  return {
    collaborator,
    theme: {
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      backgroundGradient: ['#1a1a2e', '#16213e', '#0f0f23'],
      accentColor: '#a5b4fc',
    },
    features: {
      showFathomMeetings: true,
      showLiveMeetingFeed: true,
      showContactCard: true,
      showProjectProgress: false,
    },
  };
}

// Generate page component code for a collaborator
export function generatePageCode(collaborator: Collaborator): string {
  const meetings = collaborator.fathomMeetings || [];
  const hasMultipleMeetings = meetings.length > 1;

  return `'use client';

import { useState } from 'react';
${collaborator.fathomMeetings?.length ? "import MeetingList from '@/components/fathom/MeetingList';" : ''}
import styles from './page.module.css';

export default function ${capitalize(collaborator.slug)}Page() {
  ${collaborator.fathomMeetings?.length ? 'const [showLiveMeetings, setShowLiveMeetings] = useState(false);' : ''}

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, ${collaborator.name}</h1>
          <p className={styles.subtitle}>${collaborator.projectName} Project Hub</p>
        </header>

        <section className={styles.mainContent}>
          ${generateMeetingsSection(collaborator)}
          ${generateCustomContentSections(collaborator)}
          ${generateContactSection(collaborator)}
        </section>

        <footer className={styles.footer}>
          <p>${collaborator.projectName} Project Documentation</p>
        </footer>
      </div>
    </div>
  );
}
`;
}

function generateMeetingsSection(collaborator: Collaborator): string {
  const meetings = collaborator.fathomMeetings || [];

  if (meetings.length === 0) {
    return `{/* Meeting section - No meetings yet */}
          <div className={styles.card}>
            <h2>Meeting Notes</h2>
            <p>No meetings recorded yet. Check back after our first session!</p>
          </div>`;
  }

  const meetingButtons = meetings.map((m, i) => `
              <a
                href="${m.shareUrl}"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                ${m.title || `Meeting Notes #${i + 1}`}
              </a>`).join('');

  return `{/* Meeting Notes Card */}
          <div className={styles.card}>
            <h2>Meeting Notes</h2>
            <p>Access our Zoom meeting recordings and AI-generated notes:</p>

            <div className={styles.buttonGroup}>${meetingButtons}
            </div>

            <div className={styles.divider}></div>
            <button
              onClick={() => setShowLiveMeetings(!showLiveMeetings)}
              className={styles.secondaryButton}
            >
              {showLiveMeetings ? 'Hide All Meetings' : 'View All Meetings (Live Feed)'}
            </button>

            {showLiveMeetings && (
              <div className={styles.liveMeetingsContainer}>
                <MeetingList
                  maxMeetings={10}
                  showSummary={true}
                  showActionItems={true}
                />
              </div>
            )}
          </div>`;
}

function generateCustomContentSections(collaborator: Collaborator): string {
  const sections = collaborator.customContent?.sections || [];

  if (sections.length === 0) return '';

  return sections.map(section => `
          {/* ${section.title} */}
          <div className={styles.card}>
            <h2>${section.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: \`${section.content}\` }} />
          </div>`).join('');
}

function generateContactSection(collaborator: Collaborator): string {
  return `
          {/* Contact Card */}
          <div className={styles.card}>
            <h2>Questions?</h2>
            <p>
              Reach out anytime if you have questions about the project or need clarification
              on the implementation.
            </p>
            <a
              href="https://elijahbrown.info/contact"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
            >
              Contact Elijah
            </a>
          </div>`;
}

// Generate login page code
export function generateLoginPageCode(collaborator: Collaborator): string {
  return `'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/${collaborator.slug}';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    params.set('password', password);

    window.location.href = \`\${redirect}?\${params.toString()}\`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>${collaborator.projectName}</h1>
        <p className={styles.subtitle}>Please enter the password to continue</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={styles.input}
            autoFocus
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Verifying...' : 'Access Project Hub'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className={styles.container}><div className={styles.loginCard}>Loading...</div></div>}>
      <LoginForm />
    </Suspense>
  );
}
`;
}

// Generate middleware entry for collaborator
export function generateMiddlewareEntry(collaborator: Collaborator): string {
  return `
  ${collaborator.slug}: {
    password: '${collaborator.password}',
    cookieName: '${collaborator.slug}-auth',
    loginPath: '/${collaborator.slug}/login',
  },`;
}

// Helper function
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Email template generator
export function generateWelcomeEmail(collaborator: Collaborator, baseUrl: string = 'https://elijahbrown.info'): {
  subject: string;
  html: string;
  text: string;
} {
  const accessUrl = collaborator.subdomain
    ? `https://${collaborator.subdomain}.elijahbrown.info`
    : `${baseUrl}/${collaborator.slug}`;

  const subject = `Your ${collaborator.projectName} Project Hub is Ready`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Your Project Hub is Ready!</h1>
    </div>
    <div style="padding: 30px;">
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Hi ${collaborator.name},
      </p>
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        I've created a dedicated project hub for our <strong>${collaborator.projectName}</strong> collaboration. Here you'll find:
      </p>
      <ul style="color: #374151; font-size: 16px; line-height: 1.8;">
        <li>Meeting recordings and AI-generated notes</li>
        <li>Technical documentation and architecture plans</li>
        <li>Action items and project updates</li>
      </ul>

      <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 25px 0;">
        <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Access your project hub:</p>
        <p style="margin: 0 0 15px 0;">
          <a href="${accessUrl}" style="color: #6366f1; font-weight: 600; font-size: 16px;">${accessUrl}</a>
        </p>
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          Password: <code style="background: #e5e7eb; padding: 2px 8px; border-radius: 4px; font-family: monospace;">${collaborator.password}</code>
        </p>
      </div>

      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        After each of our meetings, I'll update this hub with the latest notes and action items. You'll receive a notification whenever new content is available.
      </p>

      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Looking forward to our collaboration!
      </p>

      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Best,<br>
        Elijah Brown
      </p>
    </div>
    <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
        AdvancingTechnology &bull; <a href="https://elijahbrown.info" style="color: #6366f1;">elijahbrown.info</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `
Your ${collaborator.projectName} Project Hub is Ready!

Hi ${collaborator.name},

I've created a dedicated project hub for our ${collaborator.projectName} collaboration. Here you'll find:

- Meeting recordings and AI-generated notes
- Technical documentation and architecture plans
- Action items and project updates

Access your project hub:
${accessUrl}
Password: ${collaborator.password}

After each of our meetings, I'll update this hub with the latest notes and action items. You'll receive a notification whenever new content is available.

Looking forward to our collaboration!

Best,
Elijah Brown

---
AdvancingTechnology | elijahbrown.info
`;

  return { subject, html, text };
}

// Meeting notification email
export function generateMeetingNotificationEmail(
  collaborator: Collaborator,
  meetingTitle: string,
  shareUrl: string
): {
  subject: string;
  html: string;
  text: string;
} {
  const accessUrl = collaborator.subdomain
    ? `https://${collaborator.subdomain}.elijahbrown.info`
    : `https://elijahbrown.info/${collaborator.slug}`;

  const subject = `New Meeting Notes: ${meetingTitle}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Meeting Notes Available</h1>
    </div>
    <div style="padding: 30px;">
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Hi ${collaborator.name},
      </p>
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Our latest meeting notes for <strong>${collaborator.projectName}</strong> are now available:
      </p>

      <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
        <p style="margin: 0 0 15px 0; color: #374151; font-weight: 600; font-size: 18px;">
          ${meetingTitle}
        </p>
        <a href="${shareUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Watch Recording
        </a>
      </div>

      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        The recording includes AI-generated:
      </p>
      <ul style="color: #374151; font-size: 16px; line-height: 1.8;">
        <li>Meeting summary</li>
        <li>Action items and assignments</li>
        <li>Full transcript</li>
      </ul>

      <p style="color: #6b7280; font-size: 14px; margin-top: 25px;">
        View all your meetings in the <a href="${accessUrl}" style="color: #6366f1;">Project Hub</a>
      </p>
    </div>
    <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
        AdvancingTechnology &bull; <a href="https://elijahbrown.info" style="color: #6366f1;">elijahbrown.info</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `
New Meeting Notes: ${meetingTitle}

Hi ${collaborator.name},

Our latest meeting notes for ${collaborator.projectName} are now available:

${meetingTitle}
Watch Recording: ${shareUrl}

The recording includes AI-generated:
- Meeting summary
- Action items and assignments
- Full transcript

View all your meetings in the Project Hub: ${accessUrl}

---
AdvancingTechnology | elijahbrown.info
`;

  return { subject, html, text };
}
