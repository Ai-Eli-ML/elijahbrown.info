'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Global keyboard shortcuts for navigation
 * - j/k: Scroll down/up
 * - g g: Scroll to top
 * - shift+g: Scroll to bottom
 * - h/l: Navigate back/forward
 * - /: Focus search (command palette)
 */
export default function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    let gPressed = false;
    let gTimeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      // Ignore if modifier keys are pressed (except for specific combinations)
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      switch (e.key) {
        case 'j':
          // Scroll down
          e.preventDefault();
          window.scrollBy({ top: 100, behavior: 'smooth' });
          break;

        case 'k':
          // Scroll up
          e.preventDefault();
          window.scrollBy({ top: -100, behavior: 'smooth' });
          break;

        case 'g':
          // g g pattern for scroll to top
          if (!e.shiftKey) {
            if (gPressed) {
              // Second 'g' press - scroll to top
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              gPressed = false;
              clearTimeout(gTimeout);
            } else {
              // First 'g' press - wait for second
              gPressed = true;
              gTimeout = setTimeout(() => {
                gPressed = false;
              }, 500);
            }
          } else {
            // Shift+G - scroll to bottom
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
          break;

        case 'h':
          // Navigate back
          e.preventDefault();
          router.back();
          break;

        case 'l':
          // Navigate forward
          e.preventDefault();
          router.forward();
          break;

        case '/':
          // This is handled by CommandPalette, but we document it here
          // The command palette will open on Cmd/Ctrl + K
          break;

        case '?':
          // Show keyboard shortcuts help
          e.preventDefault();
          showShortcutsHelp();
          break;

        default:
          break;
      }
    };

    const showShortcutsHelp = () => {
      // This will trigger the command palette with help text
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(gTimeout);
    };
  }, [router]);

  return null; // This component doesn't render anything
}
