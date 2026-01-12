import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Working - Elijah Brown',
  robots: {
    index: false,
    follow: false,
  },
};

export default function WorkingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    }}>
      {children}
    </div>
  );
}
