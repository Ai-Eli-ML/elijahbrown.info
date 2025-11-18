import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Elijah Brown',
  description: 'Get in touch with Elijah Brown. Discuss AI projects, collaborations, or just connect.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
