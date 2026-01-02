'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import styles from './CommandPalette.module.css';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  action: () => void;
  shortcut?: string;
  category?: string;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // Define all commands
  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      label: 'Home',
      description: 'Go to home page',
      action: () => router.push('/'),
      category: 'Navigation',
    },
    {
      id: 'nav-about',
      label: 'About',
      description: 'Learn more about me',
      action: () => router.push('/about'),
      category: 'Navigation',
    },
    {
      id: 'nav-projects',
      label: 'Projects',
      description: 'View my projects',
      action: () => router.push('/projects'),
      category: 'Navigation',
    },
    {
      id: 'nav-blog',
      label: 'Blog',
      description: 'Read my thoughts',
      action: () => router.push('/blog'),
      category: 'Navigation',
    },
    {
      id: 'nav-contact',
      label: 'Contact',
      description: 'Get in touch',
      action: () => router.push('/contact'),
      category: 'Navigation',
    },
    {
      id: 'nav-now',
      label: 'Now',
      description: 'See what I\'m working on',
      action: () => router.push('/now'),
      category: 'Navigation',
    },
    // Actions
    {
      id: 'action-scroll-top',
      label: 'Scroll to Top',
      description: 'Jump to the top of the page',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      shortcut: 'g g',
      category: 'Actions',
    },
    {
      id: 'action-scroll-bottom',
      label: 'Scroll to Bottom',
      description: 'Jump to the bottom of the page',
      action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
      shortcut: 'shift+g',
      category: 'Actions',
    },
    {
      id: 'action-back',
      label: 'Go Back',
      description: 'Navigate to previous page',
      action: () => router.back(),
      shortcut: 'h',
      category: 'Actions',
    },
    {
      id: 'action-forward',
      label: 'Go Forward',
      description: 'Navigate to next page',
      action: () => router.forward(),
      shortcut: 'l',
      category: 'Actions',
    },
    // Links
    {
      id: 'link-github',
      label: 'GitHub',
      description: 'Open my GitHub profile',
      action: () => window.open('https://github.com/Sxilent', '_blank'),
      category: 'Links',
    },
    {
      id: 'link-linkedin',
      label: 'LinkedIn',
      description: 'Connect on LinkedIn',
      action: () => window.open('https://linkedin.com/in/elijahbrown0', '_blank'),
      category: 'Links',
    },
    {
      id: 'link-twitter',
      label: 'X (Twitter)',
      description: 'Follow me on X',
      action: () => window.open('https://x.com/sxilentscream', '_blank'),
      category: 'Links',
    },
  ];

  // Toggle command palette
  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Handle command selection
  const handleSelect = useCallback((item: CommandItem) => {
    setOpen(false);
    setSearch('');
    // Small delay to allow the dialog to close smoothly
    setTimeout(() => {
      item.action();
    }, 100);
  }, []);

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }

      // ESC to close
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }

      // Cmd/Ctrl + / to show help
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle, open]);

  // Group commands by category
  const categories = Array.from(new Set(commands.map(c => c.category || 'Other')));

  return (
    <>
      {/* Keyboard hint */}
      <div className={styles.hint}>
        <kbd>⌘</kbd>
        <span>+</span>
        <kbd>K</kbd>
      </div>

      {/* Command Dialog */}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Menu"
        className={styles.dialog}
      >
        <div className={styles.dialogInner}>
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Type a command or search..."
            className={styles.input}
          />

          <Command.List className={styles.list}>
            <Command.Empty className={styles.empty}>
              No results found.
            </Command.Empty>

            {categories.map((category) => (
              <Command.Group key={category} heading={category} className={styles.group}>
                {commands
                  .filter((cmd) => (cmd.category || 'Other') === category)
                  .map((cmd) => (
                    <Command.Item
                      key={cmd.id}
                      value={cmd.label}
                      onSelect={() => handleSelect(cmd)}
                      className={styles.item}
                    >
                      <div className={styles.itemContent}>
                        <div>
                          <div className={styles.itemLabel}>{cmd.label}</div>
                          {cmd.description && (
                            <div className={styles.itemDescription}>
                              {cmd.description}
                            </div>
                          )}
                        </div>
                        {cmd.shortcut && (
                          <div className={styles.itemShortcut}>
                            {cmd.shortcut.split(' ').map((key, i) => (
                              <kbd key={i}>{key}</kbd>
                            ))}
                          </div>
                        )}
                      </div>
                    </Command.Item>
                  ))}
              </Command.Group>
            ))}
          </Command.List>

          <div className={styles.footer}>
            <div className={styles.footerHints}>
              <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
              <span><kbd>↵</kbd> to select</span>
              <span><kbd>esc</kbd> to close</span>
            </div>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}
