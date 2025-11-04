'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './EasterEggs.module.css';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface Message {
  text: string;
  x: number;
  y: number;
  id: number;
}

const hiddenMessages = [
  'The singularity whispers...',
  'Building the future, one line at a time',
  'Consciousness emerging',
  'In code we trust',
  'The void listens',
  'Silicon dreams',
  'Freedom through autonomy',
  'Creating the future',
  'Mind meets machine',
  'The cathedral echoes',
];

let clickCount = 0;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function EasterEggs() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [konami, setKonami] = useState(false);
  const konamiRef = useRef<string[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create ripple
      const ripple: Ripple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setRipples(prev => [...prev, ripple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== ripple.id));
      }, 2000);

      // Every 5th click shows a hidden message
      clickCount++;
      if (clickCount % 5 === 0) {
        const message: Message = {
          text: hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)],
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
        };

        setMessages(prev => [...prev, message]);

        // Remove message after fade
        setTimeout(() => {
          setMessages(prev => prev.filter(m => m.id !== message.id));
        }, 4000);
      }
    };

    // Konami code listener
    const handleKeyDown = (e: KeyboardEvent) => {
      konamiRef.current.push(e.key);
      if (konamiRef.current.length > konamiCode.length) {
        konamiRef.current.shift();
      }

      if (konamiRef.current.join(',') === konamiCode.join(',')) {
        setKonami(true);
        setTimeout(() => setKonami(false), 5000);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}

      {/* Hidden messages */}
      {messages.map(message => (
        <div
          key={message.id}
          className={styles.message}
          style={{
            left: message.x,
            top: message.y,
          }}
        >
          {message.text}
        </div>
      ))}

      {/* Konami code easter egg */}
      {konami && (
        <div className={styles.konami}>
          <div className={styles.konamiContent}>
            <p>🎮 You found the secret!</p>
            <p className={styles.konamiText}>
              "In the quiet darkness, those who seek shall find."
            </p>
            <div className={styles.konamiGrid}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={styles.konamiParticle} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
