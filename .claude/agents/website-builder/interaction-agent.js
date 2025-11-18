#!/usr/bin/env node

/**
 * Interaction Agent - Phase 4 Polish
 *
 * Creates delightful interactive elements and easter eggs:
 * - Click counters and hidden messages
 * - Konami code detection
 * - Click ripple effects
 * - Hover effects and micro-interactions
 * - Secret developer console messages
 * - Interactive cursor effects
 * - Fun surprises for engaged users
 *
 * Usage:
 *   node .claude/agents/website-builder/interaction-agent.js --feature=easter-eggs
 *   node .claude/agents/website-builder/interaction-agent.js --feature=ripple-effect
 *   node .claude/agents/website-builder/interaction-agent.js --feature=konami
 *   node .claude/agents/website-builder/interaction-agent.js --create-all
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '../../../');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const HOOKS_DIR = path.join(SRC_DIR, 'hooks');
const MCP_API_KEY = 'pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y';

/**
 * MCP API Integration for Task Tracking
 */
async function logToMCP(action, details) {
  try {
    const logEntry = {
      timestamp: new Date().toISOString(),
      agent: 'interaction-agent',
      action,
      details,
      project: 'elijahbrown.info'
    };

    console.log(`📊 MCP Log: ${action}`, details);
    return logEntry;
  } catch (error) {
    console.warn('⚠️  Failed to log to MCP:', error.message);
  }
}

/**
 * Log performance metrics
 */
async function logBuilderAnalytics(metricType, value, metadata = {}) {
  await logToMCP('performance_metrics', {
    metric_type: metricType,
    value,
    ...metadata
  });
}

/**
 * Update task duration
 */
async function updateTaskDuration(taskName, actualMinutes) {
  await logToMCP('task_update', {
    task_name: taskName,
    actual_duration_minutes: actualMinutes,
    status: 'completed'
  });
}

/**
 * Interaction Templates
 */
const INTERACTION_TEMPLATES = {
  easterEggs: {
    name: 'EasterEggs',
    type: 'component',
    path: 'interactions/EasterEggs.tsx',
    template: `'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EasterEgg {
  id: string;
  trigger: 'clicks' | 'konami' | 'time';
  threshold?: number;
  message: string;
  emoji?: string;
}

const EASTER_EGGS: EasterEgg[] = [
  {
    id: 'click-counter',
    trigger: 'clicks',
    threshold: 10,
    message: 'Wow, you really like clicking! 🖱️',
    emoji: '🎉'
  },
  {
    id: 'super-clicker',
    trigger: 'clicks',
    threshold: 50,
    message: 'You are a clicking champion! 🏆',
    emoji: '👑'
  },
  {
    id: 'konami',
    trigger: 'konami',
    message: 'Konami code activated! You found the secret! 🎮',
    emoji: '🕹️'
  }
];

export default function EasterEggs() {
  const [clickCount, setClickCount] = useState(0);
  const [discoveredEggs, setDiscoveredEggs] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<EasterEgg | null>(null);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);

  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    // Click counter
    const handleClick = () => {
      setClickCount(prev => prev + 1);
    };

    // Konami code detection
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiSequence(prev => {
        const newSequence = [...prev, e.key].slice(-KONAMI_CODE.length);

        // Check if konami code matches
        if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
          triggerEasterEgg('konami');
          return [];
        }

        return newSequence;
      });
    };

    // Console messages
    console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; color: #3b82f6;');
    console.log('%cLooking for easter eggs? Try clicking around or entering the Konami code... 🎮', 'font-size: 14px; color: #10b981;');
    console.log('%cArrow keys: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #8b5cf6;');

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Check for click-based easter eggs
    EASTER_EGGS.forEach(egg => {
      if (egg.trigger === 'clicks' && egg.threshold && clickCount === egg.threshold) {
        triggerEasterEgg(egg.id);
      }
    });
  }, [clickCount]);

  const triggerEasterEgg = (eggId: string) => {
    if (discoveredEggs.includes(eggId)) return;

    const egg = EASTER_EGGS.find(e => e.id === eggId);
    if (!egg) return;

    setDiscoveredEggs(prev => [...prev, eggId]);
    setActiveMessage(egg);

    // Hide message after 5 seconds
    setTimeout(() => {
      setActiveMessage(null);
    }, 5000);

    // Log discovery
    console.log(\`%c🎉 Easter Egg Discovered: \${egg.message}\`, 'font-size: 16px; color: #f59e0b;');
  };

  return (
    <>
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 max-w-sm"
          >
            <div className="flex items-center gap-3">
              {activeMessage.emoji && (
                <span className="text-3xl">{activeMessage.emoji}</span>
              )}
              <div>
                <p className="font-bold text-lg">Easter Egg Found!</p>
                <p className="text-sm opacity-90">{activeMessage.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Developer overlay - only visible in dev mode */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs px-3 py-2 rounded font-mono z-50">
          Clicks: {clickCount} | Eggs: {discoveredEggs.length}/{EASTER_EGGS.length}
        </div>
      )}
    </>
  );
}
`
  },

  rippleEffect: {
    name: 'RippleEffect',
    type: 'component',
    path: 'interactions/RippleEffect.tsx',
    template: `'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export default function RippleEffect({
  children,
  className = '',
  color = 'rgba(255, 255, 255, 0.5)'
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <div
      className={\`relative overflow-hidden \${className}\`}
      onClick={createRipple}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            initial={{
              opacity: 0.6,
              scale: 0,
              x: ripple.x,
              y: ripple.y
            }}
            animate={{
              opacity: 0,
              scale: 2
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut'
            }}
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: color,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
`
  },

  useKonami: {
    name: 'useKonami',
    type: 'hook',
    path: 'hooks/useKonami.ts',
    template: `'use client';

import { useEffect, useState } from 'react';

export function useKonami(callback: () => void) {
  const [sequence, setSequence] = useState<string[]>([]);
  const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setSequence(prev => {
        const newSequence = [...prev, e.key].slice(-KONAMI_CODE.length);

        if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
          callback();
          return [];
        }

        return newSequence;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [callback]);

  return sequence.length;
}
`
  },

  useClickCounter: {
    name: 'useClickCounter',
    type: 'hook',
    path: 'hooks/useClickCounter.ts',
    template: `'use client';

import { useEffect, useState } from 'react';

interface ClickThreshold {
  count: number;
  callback: () => void;
  triggered?: boolean;
}

export function useClickCounter(thresholds: ClickThreshold[] = []) {
  const [clickCount, setClickCount] = useState(0);
  const [triggeredThresholds, setTriggeredThresholds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleClick = () => {
      setClickCount(prev => prev + 1);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    thresholds.forEach(threshold => {
      if (
        clickCount >= threshold.count &&
        !triggeredThresholds.has(threshold.count)
      ) {
        threshold.callback();
        setTriggeredThresholds(prev => new Set(prev).add(threshold.count));
      }
    });
  }, [clickCount, thresholds, triggeredThresholds]);

  return { clickCount, triggeredCount: triggeredThresholds.size };
}
`
  },

  cursorGlow: {
    name: 'CursorGlow',
    type: 'component',
    path: 'interactions/CursorGlow.tsx',
    template: `'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0
      }}
    >
      <motion.div
        className="absolute rounded-full bg-blue-500/20 blur-3xl"
        style={{
          width: '400px',
          height: '400px',
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200
        }}
      />
    </motion.div>
  );
}
`
  },

  consoleArt: {
    name: 'ConsoleArt',
    type: 'util',
    path: 'utils/consoleArt.ts',
    template: `/**
 * Console Art - Fun developer console messages
 */

export function initConsoleArt() {
  if (typeof window === 'undefined') return;

  // ASCII Art Banner
  console.log(\`
%c
╔═══════════════════════════════════════╗
║                                       ║
║     Welcome, Curious Developer! 👋    ║
║                                       ║
╚═══════════════════════════════════════╝
\`,
    'color: #3b82f6; font-weight: bold;'
  );

  // Tips and Easter Eggs
  console.log('%c🎮 Easter Egg Hint:', 'font-size: 14px; color: #10b981; font-weight: bold;');
  console.log('%cTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #8b5cf6;');

  console.log('%c\\n💼 Looking to hire?', 'font-size: 14px; color: #f59e0b; font-weight: bold;');
  console.log('%cCheck out my work and get in touch!', 'font-size: 12px; color: #6b7280;');

  console.log('%c\\n🔧 Tech Stack:', 'font-size: 14px; color: #ec4899; font-weight: bold;');
  console.log('%cNext.js 15 • React 19 • TypeScript • Tailwind • Framer Motion', 'font-size: 12px; color: #6b7280;');

  // Hidden commands
  (window as any).easterEgg = () => {
    console.log('%c🎉 You found the secret command!', 'font-size: 20px; color: #f59e0b;');
    console.log('%cTry these commands:', 'font-size: 14px; color: #3b82f6;');
    console.log('%c  - showSkills()', 'font-size: 12px; color: #6b7280;');
    console.log('%c  - showProjects()', 'font-size: 12px; color: #6b7280;');
    console.log('%c  - contactMe()', 'font-size: 12px; color: #6b7280;');
  };

  (window as any).showSkills = () => {
    console.table([
      { Category: 'Frontend', Skills: 'React, Next.js, TypeScript, Tailwind' },
      { Category: 'Backend', Skills: 'Node.js, Python, PostgreSQL, Supabase' },
      { Category: 'AI/ML', Skills: 'OpenAI, Claude, LangChain, Vector DBs' },
      { Category: 'DevOps', Skills: 'Docker, CI/CD, Vercel, AWS' }
    ]);
  };

  (window as any).showProjects = () => {
    console.log('%c🚀 Featured Projects:', 'font-size: 16px; color: #10b981; font-weight: bold;');
    console.log('%c  1. Life-Coach-Ai - Therapeutic AI companion', 'font-size: 12px; color: #6b7280;');
    console.log('%c  2. Personal Dashboard - Project management platform', 'font-size: 12px; color: #6b7280;');
    console.log('%c  3. MyCrashApp - Accident claims platform', 'font-size: 12px; color: #6b7280;');
  };

  (window as any).contactMe = () => {
    console.log('%c📧 Contact Information:', 'font-size: 16px; color: #ec4899; font-weight: bold;');
    console.log('%c  Email: contact@elijahbrown.info', 'font-size: 12px; color: #6b7280;');
    console.log('%c  GitHub: github.com/elijahbrown', 'font-size: 12px; color: #6b7280;');
    console.log('%c  LinkedIn: linkedin.com/in/elijahbrown', 'font-size: 12px; color: #6b7280;');
  };

  // Achievement system
  (window as any).__achievements = [];
  (window as any).unlockAchievement = (name: string) => {
    (window as any).__achievements.push(name);
    console.log(\`%c🏆 Achievement Unlocked: \${name}\`, 'font-size: 16px; color: #f59e0b;');
  };
}

// Click counter achievement
export function trackClicks() {
  let clicks = 0;
  document.addEventListener('click', () => {
    clicks++;
    if (clicks === 10) {
      (window as any).unlockAchievement?.('Clicker - 10 clicks');
    } else if (clicks === 50) {
      (window as any).unlockAchievement?.('Super Clicker - 50 clicks');
    } else if (clicks === 100) {
      (window as any).unlockAchievement?.('Click Master - 100 clicks');
    }
  });
}
`
  }
};

/**
 * Create interaction component or hook
 */
function createInteraction(interactionType) {
  const startTime = Date.now();

  const template = INTERACTION_TEMPLATES[interactionType];
  if (!template) {
    throw new Error(`Unknown interaction type: ${interactionType}`);
  }

  let outputDir;
  if (template.type === 'hook') {
    outputDir = HOOKS_DIR;
  } else if (template.type === 'util') {
    outputDir = path.join(SRC_DIR, 'utils');
  } else {
    outputDir = path.join(COMPONENTS_DIR, 'interactions');
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(SRC_DIR, template.path);
  const outputDirForFile = path.dirname(outputPath);
  if (!fs.existsSync(outputDirForFile)) {
    fs.mkdirSync(outputDirForFile, { recursive: true });
  }

  fs.writeFileSync(outputPath, template.template);

  const duration = Math.round((Date.now() - startTime) / 1000 / 60);

  console.log(`✅ Created ${template.type}: ${template.name}`);
  console.log(`   Location: ${outputPath}`);

  logBuilderAnalytics(`${template.type}_created`, 1, {
    interaction_type: interactionType,
    file_path: outputPath
  });

  updateTaskDuration(`create_${interactionType}`, duration);

  return outputPath;
}

/**
 * Create all interactions
 */
function createAllInteractions() {
  const startTime = Date.now();

  console.log('🎮 Creating all interaction components...\n');

  const created = [];
  for (const interactionType of Object.keys(INTERACTION_TEMPLATES)) {
    try {
      const filePath = createInteraction(interactionType);
      created.push(filePath);
    } catch (error) {
      console.error(`❌ Failed to create ${interactionType}:`, error.message);
    }
  }

  const duration = Math.round((Date.now() - startTime) / 1000 / 60);

  console.log(`\n✅ Created ${created.length} interactive elements in ${duration}m`);
  console.log('\nNext steps:');
  console.log('1. Add EasterEggs component to your root layout');
  console.log('2. Initialize consoleArt in your app');
  console.log('3. Wrap interactive buttons with RippleEffect');
  console.log('4. Add CursorGlow for premium feel');
  console.log('5. Use hooks for custom interactions\n');

  logBuilderAnalytics('interactions_created', created.length, {
    duration_minutes: duration,
    components: created.map(p => path.basename(p))
  });

  updateTaskDuration('create_all_interactions', duration);

  return created;
}

/**
 * Create interaction documentation
 */
function createInteractionDocs() {
  const docsDir = path.join(PROJECT_ROOT, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const docsContent = `# Interactive Elements & Easter Eggs

## Components

### EasterEggs
Automatically tracks user interactions and reveals hidden messages.

\`\`\`tsx
// In app/layout.tsx
import EasterEggs from '@/components/interactions/EasterEggs';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <EasterEggs />
        {children}
      </body>
    </html>
  );
}
\`\`\`

### RippleEffect
Material Design ripple effect for interactive elements.

\`\`\`tsx
import RippleEffect from '@/components/interactions/RippleEffect';

<RippleEffect className="rounded-lg">
  <button>Click me for ripple!</button>
</RippleEffect>
\`\`\`

### CursorGlow
Glowing cursor effect that follows mouse movement.

\`\`\`tsx
import CursorGlow from '@/components/interactions/CursorGlow';

<CursorGlow />
\`\`\`

## Hooks

### useKonami
Detect Konami code input (↑ ↑ ↓ ↓ ← → ← → B A).

\`\`\`tsx
import { useKonami } from '@/hooks/useKonami';

function MyComponent() {
  useKonami(() => {
    alert('Konami code activated!');
  });
}
\`\`\`

### useClickCounter
Track clicks and trigger callbacks at thresholds.

\`\`\`tsx
import { useClickCounter } from '@/hooks/useClickCounter';

function MyComponent() {
  const { clickCount } = useClickCounter([
    { count: 10, callback: () => console.log('10 clicks!') },
    { count: 50, callback: () => console.log('50 clicks!') }
  ]);

  return <div>Clicks: {clickCount}</div>;
}
\`\`\`

## Console Art

Initialize fun developer console messages:

\`\`\`tsx
// In app/layout.tsx or root component
import { initConsoleArt, trackClicks } from '@/utils/consoleArt';

useEffect(() => {
  initConsoleArt();
  trackClicks();
}, []);
\`\`\`

Try these console commands:
- \`easterEgg()\` - Show hidden commands
- \`showSkills()\` - Display skills table
- \`showProjects()\` - List featured projects
- \`contactMe()\` - Show contact info

## Easter Egg Ideas

1. **Click Milestones**: Trigger messages at 10, 50, 100 clicks
2. **Konami Code**: Classic cheat code reveals special content
3. **Time-based**: Special message if user stays for 5+ minutes
4. **Console Commands**: Hidden developer commands
5. **Secret Pages**: Hidden routes only accessible via special actions
6. **Cursor Trails**: Fun cursor effects on certain pages
7. **Dark Mode Toggle**: Hidden keyboard shortcut
8. **Achievement System**: Unlock badges for different actions

## Best Practices

- Don't overdo it - easter eggs should be subtle
- Ensure they don't interfere with core functionality
- Make them fun and rewarding to discover
- Log discoveries for analytics
- Respect user privacy
- Test across devices and browsers
`;

  const docsPath = path.join(docsDir, 'interactions.md');
  fs.writeFileSync(docsPath, docsContent);

  console.log(`✅ Created interaction documentation: ${docsPath}`);
  return docsPath;
}

/**
 * Analyze existing interactions
 */
function analyzeInteractions() {
  console.log('🔍 Analyzing existing interactive elements...\n');

  const results = {
    interaction_components: [],
    hooks: [],
    utils: [],
    recommendations: []
  };

  // Check interactions directory
  const interactionsDir = path.join(COMPONENTS_DIR, 'interactions');
  if (fs.existsSync(interactionsDir)) {
    const files = fs.readdirSync(interactionsDir).filter(f => f.endsWith('.tsx'));
    results.interaction_components = files;
    console.log(`✅ Found ${files.length} interaction components:`);
    files.forEach(f => console.log(`   - ${f}`));
  } else {
    console.log('⚠️  No interactions directory found');
    results.recommendations.push('Create interaction components');
  }

  console.log();

  // Check hooks
  if (fs.existsSync(HOOKS_DIR)) {
    const files = fs.readdirSync(HOOKS_DIR).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
    results.hooks = files;
    console.log(`✅ Found ${files.length} custom hooks:`);
    files.forEach(f => console.log(`   - ${f}`));
  }

  console.log('\n📊 Recommendations:');
  if (results.interaction_components.length === 0) {
    console.log('   - Add EasterEggs component for hidden surprises');
    console.log('   - Add RippleEffect for interactive buttons');
    console.log('   - Add CursorGlow for premium feel');
  }
  if (!results.hooks.includes('useKonami.ts')) {
    console.log('   - Add useKonami hook for cheat code detection');
  }
  if (!results.hooks.includes('useClickCounter.ts')) {
    console.log('   - Add useClickCounter for milestone tracking');
  }

  console.log();

  logBuilderAnalytics('interaction_analysis', results.interaction_components.length, {
    total_components: results.interaction_components.length,
    total_hooks: results.hooks.length,
    recommendations: results.recommendations
  });

  return results;
}

/**
 * Main CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  console.log('🎮 Interaction Agent - Phase 4 Polish\n');

  try {
    if (args.includes('--analyze')) {
      analyzeInteractions();
    } else if (args.includes('--create-all')) {
      createAllInteractions();
      createInteractionDocs();
    } else if (args.some(arg => arg.startsWith('--feature='))) {
      const featureArg = args.find(arg => arg.startsWith('--feature='));
      const feature = featureArg.split('=')[1];

      const validFeatures = Object.keys(INTERACTION_TEMPLATES);
      if (!validFeatures.includes(feature)) {
        console.error(`❌ Invalid feature: ${feature}`);
        console.error(`   Valid features: ${validFeatures.join(', ')}`);
        process.exit(1);
      }

      createInteraction(feature);
    } else if (args.includes('--docs')) {
      createInteractionDocs();
    } else {
      // Show usage
      console.log('Usage:');
      console.log('  --analyze              Analyze existing interactions');
      console.log('  --create-all           Create all interaction components');
      console.log('  --feature=<type>       Create specific interaction');
      console.log('  --docs                 Generate interaction documentation');
      console.log('\nAvailable interaction types:');
      Object.keys(INTERACTION_TEMPLATES).forEach(type => {
        console.log(`  - ${type}`);
      });
      console.log('\nExamples:');
      console.log('  node interaction-agent.js --analyze');
      console.log('  node interaction-agent.js --create-all');
      console.log('  node interaction-agent.js --feature=easterEggs');
      console.log('  node interaction-agent.js --feature=rippleEffect');
      console.log();
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

// Export for use as module
module.exports = {
  createInteraction,
  createAllInteractions,
  analyzeInteractions,
  createInteractionDocs,
  logBuilderAnalytics,
  updateTaskDuration
};
