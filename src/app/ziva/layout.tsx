import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ziva - Team Portal',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ZivaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
    }}>
      {children}
    </div>
  );
}
