import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Living History AI - Jermaine',
  robots: {
    index: false,
    follow: false,
  },
};

export default function JermaineLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1510 0%, #2d2318 50%, #1a1510 100%)'
    }}>
      {children}
    </div>
  );
}
