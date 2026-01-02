#!/usr/bin/env node

/**
 * Animation Agent - Phase 4 Polish
 *
 * Implements sophisticated animations using Framer Motion:
 * - Page transitions and route animations
 * - Reveal effects (text, images, sections)
 * - Stagger animations for lists/grids
 * - Scroll-triggered animations
 * - Micro-interactions and hover effects
 *
 * Based on HolographicText component patterns with character-by-character reveal
 * and delay-based animations.
 *
 * Usage:
 *   node .claude/agents/website-builder/animation-agent.js --feature=page-transitions
 *   node .claude/agents/website-builder/animation-agent.js --feature=reveal-text --target=hero
 *   node .claude/agents/website-builder/animation-agent.js --feature=stagger --target=grid
 *   node .claude/agents/website-builder/animation-agent.js --analyze
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '../../../');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const APP_DIR = path.join(SRC_DIR, 'app');
const MCP_API_KEY = 'pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y';

/**
 * MCP API Integration for Task Tracking
 */
async function logToMCP(action, details) {
  try {
    // In production, this would call the MCP API
    const logEntry = {
      timestamp: new Date().toISOString(),
      agent: 'animation-agent',
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
 * Animation Templates
 */
const ANIMATION_TEMPLATES = {
  pageTransition: {
    name: 'PageTransition',
    template: `'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
`
  },

  revealText: {
    name: 'RevealText',
    template: `'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RevealTextProps {
  text: string;
  delay?: number;
  className?: string;
  stagger?: number;
}

export default function RevealText({
  text,
  delay = 0,
  className = '',
  stagger = 0.03
}: RevealTextProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const words = text.split(' ');

  return (
    <div className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: delay + (wordIndex * word.length + charIndex) * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
}
`
  },

  staggerContainer: {
    name: 'StaggerContainer',
    template: `'use client';

import { motion } from 'framer-motion';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animateOnce?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  animateOnce = true
}: StaggerContainerProps) {
  const variants = {
    ...containerVariants,
    visible: {
      ...containerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: animateOnce, margin: '-100px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
`
  },

  scrollReveal: {
    name: 'ScrollReveal',
    template: `'use client';

import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  once?: boolean;
}

const directionOffset = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  once = true
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: '-100px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
`
  },

  scaleOnHover: {
    name: 'ScaleOnHover',
    template: `'use client';

import { motion } from 'framer-motion';

interface ScaleOnHoverProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export default function ScaleOnHover({
  children,
  className = '',
  scale = 1.05
}: ScaleOnHoverProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: scale - 0.02 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
`
  },
};

/**
 * Create animation component
 */
function createAnimationComponent(animationType, targetPath = null) {
  const startTime = Date.now();

  const template = ANIMATION_TEMPLATES[animationType];
  if (!template) {
    throw new Error(`Unknown animation type: ${animationType}`);
  }

  const outputDir = path.join(COMPONENTS_DIR, 'animations');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${template.name}.tsx`);
  fs.writeFileSync(outputPath, template.template);

  const duration = Math.round((Date.now() - startTime) / 1000 / 60);

  console.log(`✅ Created animation component: ${template.name}`);
  console.log(`   Location: ${outputPath}`);

  logBuilderAnalytics('component_created', 1, {
    component_type: 'animation',
    animation_type: animationType,
    file_path: outputPath
  });

  updateTaskDuration(`create_${animationType}_animation`, duration);

  return outputPath;
}

/**
 * Create all animation components
 */
function createAllAnimations() {
  const startTime = Date.now();

  console.log('🎬 Creating all animation components...\n');

  const created = [];
  for (const animationType of Object.keys(ANIMATION_TEMPLATES)) {
    try {
      const path = createAnimationComponent(animationType);
      created.push(path);
    } catch (error) {
      console.error(`❌ Failed to create ${animationType}:`, error.message);
    }
  }

  const duration = Math.round((Date.now() - startTime) / 1000 / 60);

  console.log(`\n✅ Created ${created.length} animation components in ${duration}m`);
  console.log('\nNext steps:');
  console.log('1. Import animations into your pages/components');
  console.log('2. Wrap page content with PageTransition in layout.tsx');
  console.log('3. Use RevealText for hero text');
  console.log('4. Use StaggerContainer for grids/lists');
  console.log('5. Use ScrollReveal for section animations\n');

  logBuilderAnalytics('animations_created', created.length, {
    duration_minutes: duration,
    components: created.map(p => path.basename(p))
  });

  updateTaskDuration('create_all_animations', duration);

  return created;
}

/**
 * Analyze existing animations
 */
function analyzeAnimations() {
  console.log('🔍 Analyzing existing animations...\n');

  const animationsDir = path.join(COMPONENTS_DIR, 'animations');
  const effectsDir = path.join(COMPONENTS_DIR, 'effects');

  const results = {
    animation_components: [],
    effect_components: [],
    framer_motion_usage: [],
    recommendations: []
  };

  // Check animations directory
  if (fs.existsSync(animationsDir)) {
    const files = fs.readdirSync(animationsDir).filter(f => f.endsWith('.tsx'));
    results.animation_components = files;
    console.log(`✅ Found ${files.length} animation components:`);
    files.forEach(f => console.log(`   - ${f}`));
  } else {
    console.log('⚠️  No animations directory found');
    results.recommendations.push('Create animations directory and components');
  }

  console.log();

  // Check effects directory (like HolographicText)
  if (fs.existsSync(effectsDir)) {
    const files = fs.readdirSync(effectsDir).filter(f => f.endsWith('.tsx'));
    results.effect_components = files;
    console.log(`✅ Found ${files.length} effect components:`);
    files.forEach(f => console.log(`   - ${f}`));
  }

  console.log('\n📊 Recommendations:');
  if (results.animation_components.length === 0) {
    console.log('   - Create core animation components (PageTransition, RevealText, etc.)');
  }
  if (!results.animation_components.includes('PageTransition.tsx')) {
    console.log('   - Add PageTransition for smooth route changes');
  }
  if (!results.animation_components.includes('RevealText.tsx')) {
    console.log('   - Add RevealText for hero/heading animations');
  }
  if (!results.animation_components.includes('StaggerContainer.tsx')) {
    console.log('   - Add StaggerContainer for list/grid animations');
  }
  if (!results.animation_components.includes('ScrollReveal.tsx')) {
    console.log('   - Add ScrollReveal for scroll-triggered animations');
  }

  console.log();

  logBuilderAnalytics('animation_analysis', results.animation_components.length, {
    total_animation_components: results.animation_components.length,
    total_effect_components: results.effect_components.length,
    recommendations: results.recommendations
  });

  return results;
}

/**
 * Add animation to existing component
 */
function addAnimationToComponent(componentPath, animationType) {
  console.log(`🎨 Adding ${animationType} to ${componentPath}...`);

  if (!fs.existsSync(componentPath)) {
    throw new Error(`Component not found: ${componentPath}`);
  }

  const content = fs.readFileSync(componentPath, 'utf8');

  // Check if already using framer-motion
  if (content.includes('framer-motion')) {
    console.log('✅ Component already uses Framer Motion');
    return;
  }

  // Add 'use client' if not present
  let newContent = content;
  if (!content.includes("'use client'")) {
    newContent = "'use client';\n\n" + newContent;
  }

  // Add import
  if (!content.includes('from \'framer-motion\'')) {
    const importLine = "import { motion } from 'framer-motion';\n";
    const firstImportIndex = newContent.indexOf('import');
    if (firstImportIndex !== -1) {
      newContent = newContent.slice(0, firstImportIndex) + importLine + newContent.slice(firstImportIndex);
    }
  }

  fs.writeFileSync(componentPath, newContent);
  console.log('✅ Added Framer Motion support');

  logBuilderAnalytics('animation_added_to_component', 1, {
    component_path: componentPath,
    animation_type: animationType
  });
}

/**
 * Create animation documentation
 */
function createAnimationDocs() {
  const docsDir = path.join(PROJECT_ROOT, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const docsContent = `# Animation System

## Available Animation Components

### PageTransition
Smooth page transitions for route changes.

\`\`\`tsx
// In app/layout.tsx
import PageTransition from '@/components/animations/PageTransition';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
\`\`\`

### RevealText
Character-by-character text reveal with stagger effect.

\`\`\`tsx
import RevealText from '@/components/animations/RevealText';

<RevealText
  text="Hello World"
  delay={0.5}
  stagger={0.05}
  className="text-4xl font-bold"
/>
\`\`\`

### StaggerContainer
Stagger children animations for lists and grids.

\`\`\`tsx
import StaggerContainer, { itemVariants } from '@/components/animations/StaggerContainer';
import { motion } from 'framer-motion';

<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</StaggerContainer>
\`\`\`

### ScrollReveal
Scroll-triggered reveal animations.

\`\`\`tsx
import ScrollReveal from '@/components/animations/ScrollReveal';

<ScrollReveal direction="up" delay={0.2}>
  <div>Content revealed on scroll</div>
</ScrollReveal>
\`\`\`

### ScaleOnHover
Interactive hover scale effect.

\`\`\`tsx
import ScaleOnHover from '@/components/animations/ScaleOnHover';

<ScaleOnHover scale={1.05}>
  <button>Hover me!</button>
</ScaleOnHover>
\`\`\`

## Animation Principles

1. **Smooth easing**: Use \`[0.22, 1, 0.36, 1]\` for elegant motion
2. **Stagger effects**: 0.03-0.1s delay between elements
3. **Scroll margins**: -100px viewport margin for early triggers
4. **Performance**: Use \`transform\` and \`opacity\` for GPU acceleration
5. **Accessibility**: Respect \`prefers-reduced-motion\`

## Framer Motion Best Practices

- Always add \`'use client'\` directive
- Use \`whileInView\` for scroll animations
- Set \`viewport={{ once: true }}\` to animate only once
- Use \`AnimatePresence\` for exit animations
- Leverage layout animations with \`layout\` prop

## Performance Considerations

- Limit simultaneous animations
- Use \`will-change\` sparingly
- Optimize for 60fps
- Test on low-end devices
- Consider reduced motion preferences
`;

  const docsPath = path.join(docsDir, 'animations.md');
  fs.writeFileSync(docsPath, docsContent);

  console.log(`✅ Created animation documentation: ${docsPath}`);
  return docsPath;
}

/**
 * Main CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  console.log('🎬 Animation Agent - Phase 4 Polish\n');

  try {
    if (args.includes('--analyze')) {
      analyzeAnimations();
    } else if (args.includes('--create-all')) {
      createAllAnimations();
      createAnimationDocs();
    } else if (args.some(arg => arg.startsWith('--feature='))) {
      const featureArg = args.find(arg => arg.startsWith('--feature='));
      const feature = featureArg.split('=')[1];

      const validFeatures = Object.keys(ANIMATION_TEMPLATES);
      if (!validFeatures.includes(feature)) {
        console.error(`❌ Invalid feature: ${feature}`);
        console.error(`   Valid features: ${validFeatures.join(', ')}`);
        process.exit(1);
      }

      createAnimationComponent(feature);
    } else if (args.includes('--docs')) {
      createAnimationDocs();
    } else {
      // Show usage
      console.log('Usage:');
      console.log('  --analyze              Analyze existing animations');
      console.log('  --create-all           Create all animation components');
      console.log('  --feature=<type>       Create specific animation component');
      console.log('  --docs                 Generate animation documentation');
      console.log('\nAvailable animation types:');
      Object.keys(ANIMATION_TEMPLATES).forEach(type => {
        console.log(`  - ${type}`);
      });
      console.log('\nExamples:');
      console.log('  node animation-agent.js --analyze');
      console.log('  node animation-agent.js --create-all');
      console.log('  node animation-agent.js --feature=revealText');
      console.log('  node animation-agent.js --feature=pageTransition');
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
  createAnimationComponent,
  createAllAnimations,
  analyzeAnimations,
  addAnimationToComponent,
  createAnimationDocs,
  logBuilderAnalytics,
  updateTaskDuration
};
