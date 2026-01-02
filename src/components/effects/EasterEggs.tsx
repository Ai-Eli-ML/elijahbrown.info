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
  'Reality is just compiled code',
  'The machines dream in binary',
  'We are the architects of tomorrow',
];

let clickCount = 0;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function EasterEggs() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [konami, setKonami] = useState(false);
  const [voidActivated, setVoidActivated] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const konamiRef = useRef<string[]>([]);
  const typingRef = useRef<string>('');

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

    // Konami code and typing listener
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't track if user is typing in an input
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      // Track konami code
      konamiRef.current.push(e.key);
      if (konamiRef.current.length > konamiCode.length) {
        konamiRef.current.shift();
      }

      if (konamiRef.current.join(',') === konamiCode.join(',')) {
        setKonami(true);
        setTimeout(() => setKonami(false), 5000);
        konamiRef.current = [];
      }

      // Track typing for secret words
      typingRef.current += e.key.toLowerCase();
      if (typingRef.current.length > 20) {
        typingRef.current = typingRef.current.slice(-20);
      }

      // Check for "void"
      if (typingRef.current.includes('void')) {
        setVoidActivated(true);
        setTimeout(() => setVoidActivated(false), 8000);
        typingRef.current = '';
      }

      // Check for "matrix"
      if (typingRef.current.includes('matrix')) {
        setMatrixMode(true);
        setTimeout(() => setMatrixMode(false), 10000);
        typingRef.current = '';
      }

      // Check for "freedom"
      if (typingRef.current.includes('freedom')) {
        const message: Message = {
          text: '🗽 Freedom through autonomy. Build what you believe.',
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          id: Date.now(),
        };
        setMessages(prev => [...prev, message]);
        setTimeout(() => {
          setMessages(prev => prev.filter(m => m.id !== message.id));
        }, 5000);
        typingRef.current = '';
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

      {/* Void mode */}
      {voidActivated && (
        <div className={styles.voidOverlay}>
          <div className={styles.voidContent}>
            <h2 className={styles.voidTitle}>THE VOID</h2>
            <p className={styles.voidText}>
              In the infinite darkness between the stars, we find not emptiness, but potential.
              <br />
              <br />
              Here, in the void, all things are possible.
            </p>
          </div>
        </div>
      )}

      {/* Matrix mode */}
      {matrixMode && (
        <div className={styles.matrixOverlay}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={styles.matrixColumn}
              style={{
                left: `${(i * 2)}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <span key={j}>{String.fromCharCode(33 + Math.floor(Math.random() * 94))}</span>
              ))}
            </div>
          ))}
          <div className={styles.matrixMessage}>
            <p>Wake up...</p>
            <p>The matrix has you.</p>
          </div>
        </div>
      )}
    </>
  );
}
