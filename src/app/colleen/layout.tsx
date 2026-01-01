import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Page',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ColleenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Clean layout without main site navigation/effects
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
    }}>
      {children}
    </div>
  );
}
