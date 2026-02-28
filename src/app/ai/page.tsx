import type { Metadata } from 'next';
import AICreator from './ai-creator';

export const metadata: Metadata = {
  title: 'AI Voice Lab',
  description: 'Create your own AI personality and get a phone call from it. Choose a preset or design your own.',
};

export default function AIPage() {
  return <AICreator />;
}
