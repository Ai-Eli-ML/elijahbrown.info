# Website Builder - Phase 3 Effect Agents

This directory contains the **Phase 3 Effect Agents** for the Website Builder Agent System. These agents create stunning visual and audio effects for modern web applications.

## 📦 Agent Overview

### 1. **ThreeJS Agent** (`threejs-agent.js`)
Creates 3D WebGL scenes using Three.js.

**Components Generated:**
- `FloatingOrb.tsx` - 3D floating orb with custom shaders and glow effects
- `ParticleField3D.tsx` - 3D particle system with 5000+ animated particles

**Features:**
- Custom GLSL vertex and fragment shaders
- Fresnel glow effects
- Floating animations with sin wave motion
- Responsive canvas sizing
- Performance-optimized rendering

**Usage:**
```bash
node threejs-agent.js
```

---

### 2. **Shader Agent** (`shader-agent.js`)
Writes custom GLSL shaders for stunning visual effects.

**Shader Library:**
- `liquid-chrome.glsl` - Flowing metallic chrome effect
- `void-waves.glsl` - Dark undulating void patterns
- `holographic.glsl` - Rainbow holographic shimmer

**Components Generated:**
- `LiquidChromeBackground.tsx` - Flowing chrome shader background
- `VoidWavesBackground.tsx` - Dark atmospheric void waves
- `HolographicBackground.tsx` - Rainbow holographic effect

**Features:**
- Fractal Brownian Motion (FBM) for organic patterns
- Simplex noise for smooth animations
- HSV to RGB color conversion
- Animated uniforms (time, resolution)
- Multiple oscillator types

**Usage:**
```bash
node shader-agent.js
```

---

### 3. **Canvas Agent** (`canvas-agent.js`)
Builds Canvas 2D particle systems with mouse interaction.

**Components Generated:**
- `ParticleBackground.tsx` - Interactive particle background with depth layering
- `CanvasNetwork.tsx` - Connected network visualization

**Features:**
- Multi-layer depth system (parallax effect)
- Mouse interaction (attraction/repulsion)
- Dynamic connection lines between particles
- Edge bouncing physics
- Performance-optimized rendering
- Responsive design

**Usage:**
```bash
node canvas-agent.js
```

---

### 4. **Audio Agent** (`audio-agent.js`)
Implements Web Audio API for ambient soundscapes and interactive instruments.

**Components Generated:**
- `AmbientSoundscape.tsx` - Multi-layer ambient drone with breathing pulse
- `InteractiveSynth.tsx` - Playable synthesizer with touch/mouse support

**Features:**
- Multi-layer drones (A0: 27.5Hz, A1: 55Hz, A2: 110Hz)
- LFO breathing pulse (0.2 Hz = 5-second cycle)
- Low-pass filter (800Hz) for warmth
- Multiple oscillator types (sine, triangle, sawtooth)
- User controls (play/pause)
- Smooth envelope automation

**Usage:**
```bash
node audio-agent.js
```

---

## 🔧 MCP API Integration

All agents integrate with the **Personal Dashboard MCP API** for component management.

**API Configuration:**
- **API Key:** `pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y`
- **Base URL:** `https://dashboard.advancingtechnology.online/api/mcp`

**MCP Tools Used:**
1. `getReusableComponents` - Query component library for existing effects
2. `saveComponent` - Save generated components to library
3. `updateAgentTask` - Update agent execution status and output

---

## 📊 Components Generated

| Agent | Components | Total Lines | Features |
|-------|-----------|-------------|----------|
| ThreeJS | 2 | ~350 | 3D meshes, custom shaders, animations |
| Shader | 3 | ~400 | GLSL shaders, FBM, noise functions |
| Canvas | 2 | ~450 | Particle systems, mouse interaction |
| Audio | 2 | ~350 | Web Audio API, oscillators, LFOs |
| **Total** | **9** | **~1,550** | **Production-ready effect components** |

---

## 🚀 Quick Start

### Run All Agents
```bash
# From this directory
node threejs-agent.js
node shader-agent.js
node canvas-agent.js
node audio-agent.js
```

### Run Individual Agent
```bash
# Example: Generate shader components only
node shader-agent.js
```

### Test MCP Integration
```bash
# Test that MCP API is accessible
node test-agents.js
```

---

## 📝 Component Usage Examples

### FloatingOrb (Three.js)
```tsx
import FloatingOrb from '@/components/effects/FloatingOrb';

<FloatingOrb
  size="medium"
  color="#00ffff"
  speed={1}
  className="w-full h-screen"
/>
```

### LiquidChromeBackground (Shader)
```tsx
import LiquidChromeBackground from '@/components/effects/LiquidChromeBackground';

<LiquidChromeBackground
  speed={1}
  className="fixed inset-0"
/>
```

### ParticleBackground (Canvas)
```tsx
import ParticleBackground from '@/components/effects/ParticleBackground';

<ParticleBackground
  particleCount={100}
  color="#00ffff"
  mouseInteraction={true}
  className="fixed inset-0"
/>
```

### AmbientSoundscape (Audio)
```tsx
import AmbientSoundscape from '@/components/effects/AmbientSoundscape';

<AmbientSoundscape
  autoPlay={false}
  volume={0.3}
  breathingRate={0.2}
  className="fixed bottom-4 right-4"
/>
```

---

## 🎨 Design Patterns

### Agent Architecture
All agents follow a consistent pattern:
1. **Query Phase:** Check component library for existing components
2. **Generation Phase:** Create new components based on templates
3. **Save Phase:** Save components to MCP API
4. **Update Phase:** Update agent task status with output

### Component Structure
All generated components:
- Use TypeScript with strict typing
- Implement React hooks (useRef, useEffect, useState)
- Support responsive design
- Include cleanup on unmount
- Accept customizable props
- Follow accessibility best practices

---

## 🔍 Troubleshooting

### MCP API Connection Issues
```bash
# Test API connectivity
curl -X POST https://dashboard.advancingtechnology.online/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"tool":"getReusableComponents","params":{},"apiKey":"pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y"}'
```

### Node.js Version
Ensure you're running Node.js 20.x:
```bash
node --version
# Should output: v20.x.x
```

### Dependencies
These agents use only Node.js built-in modules (`https`, `require`). No external dependencies needed for execution.

---

## 📚 Technical Details

### Three.js Agent
- **Geometry:** SphereGeometry with configurable segments
- **Materials:** ShaderMaterial with custom GLSL
- **Lighting:** AmbientLight + PointLight
- **Animation:** RequestAnimationFrame loop

### Shader Agent
- **Noise Functions:** Simplex noise, FBM
- **Color Spaces:** RGB, HSV conversion
- **Uniforms:** time, resolution
- **Performance:** Optimized fragment shader calculations

### Canvas Agent
- **Physics:** Velocity-based motion with friction
- **Collision:** Edge bouncing, mouse interaction
- **Rendering:** CanvasRenderingContext2D
- **Optimization:** RequestAnimationFrame, culling

### Audio Agent
- **Synthesis:** OscillatorNode (sine, triangle, sawtooth)
- **Modulation:** LFO for breathing pulse
- **Filtering:** BiquadFilterNode (low-pass)
- **Automation:** GainNode automation curves

---

## 🎯 Next Steps

1. **Test Components:** Import and test each component in a Next.js page
2. **Component Library:** Verify components saved to MCP API
3. **Documentation:** Add TypeScript docs and Storybook stories
4. **Performance:** Profile components and optimize if needed
5. **Accessibility:** Add ARIA labels and keyboard controls

---

## 🤝 Contributing

To add new effect agents:
1. Follow the existing agent pattern
2. Implement MCP API integration
3. Generate production-ready React components
4. Update this README with new agent details

---

## 📄 License

Part of the AdvancingTechnology Business Ecosystem.

**Author:** Elijah Brown
**Project:** elijahbrown.info
**Phases:** 3 - Effect Agents ✅ | 4 - Polish Agents ✅
**Status:** ✅ Complete

---

# Website Builder - Phase 4 Polish Agents

Phase 4 focuses on adding polish, interactivity, and performance optimization to websites.

## 📦 Phase 4 Agent Overview

### 1. **Animation Agent** (`animation-agent.js`)
Implements sophisticated Framer Motion animations and transitions.

**Components Generated:**
- `PageTransition.tsx` - Smooth route transitions
- `RevealText.tsx` - Character-by-character text reveal
- `StaggerContainer.tsx` - Stagger children animations for lists/grids
- `ScrollReveal.tsx` - Scroll-triggered reveal animations
- `ScaleOnHover.tsx` - Interactive hover scale effects

**Features:**
- Page transitions with AnimatePresence
- Character-by-character reveal (based on HolographicText pattern)
- Stagger effects with configurable delays (0.03-0.1s)
- Scroll-triggered animations with viewport detection
- Smooth easing curves `[0.22, 1, 0.36, 1]`
- GPU-accelerated transforms

**Usage:**
```bash
# Analyze existing animations
node animation-agent.js --analyze

# Create all animation components
node animation-agent.js --create-all

# Create specific animation
node animation-agent.js --feature=revealText
node animation-agent.js --feature=pageTransition

# Generate documentation
node animation-agent.js --docs
```

---

### 2. **Interaction Agent** (`interaction-agent.js`)
Creates delightful interactive elements and easter eggs.

**Components Generated:**
- `EasterEggs.tsx` - Hidden surprises (click counters, Konami code)
- `RippleEffect.tsx` - Material Design click ripples
- `CursorGlow.tsx` - Glowing cursor effect

**Hooks Created:**
- `useKonami.ts` - Konami code detection (↑ ↑ ↓ ↓ ← → ← → B A)
- `useClickCounter.ts` - Click milestone tracking

**Utilities Created:**
- `consoleArt.ts` - Developer console messages and hidden commands

**Features:**
- Click milestone detection (10, 50, 100 clicks)
- Konami code easter egg system
- Console art with ASCII banners
- Hidden developer commands (`showSkills()`, `showProjects()`, `contactMe()`)
- Achievement unlocking system
- Click ripple animation
- Cursor glow following mouse

**Usage:**
```bash
# Analyze existing interactions
node interaction-agent.js --analyze

# Create all interaction components
node interaction-agent.js --create-all

# Create specific interaction
node interaction-agent.js --feature=easterEggs
node interaction-agent.js --feature=rippleEffect

# Generate documentation
node interaction-agent.js --docs
```

---

### 3. **Performance Agent** (`performance-agent.js`)
Optimizes build size, code quality, and performance.

**Analysis Features:**
- Production build analysis
- Bundle size breakdown by chunk
- Large dependency identification
- Unused imports detection
- Image optimization checks
- Comprehensive performance reporting

**Output Files:**
- `performance-report.json` - Detailed JSON report
- `OPTIMIZATION_CHECKLIST.md` - Actionable checklist

**Performance Thresholds:**
- Max Bundle Size: 1 MB
- Max Chunk Size: 500 KB
- Max Dependency Size: 200 KB
- Max Image Size: 1 MB
- Min Image Optimization: 50% compression

**Usage:**
```bash
# Run production build
node performance-agent.js --build

# Analyze existing build
node performance-agent.js --analyze

# Generate full report
node performance-agent.js --report

# Run optimization suggestions
node performance-agent.js --optimize

# Full workflow
node performance-agent.js --full
```

---

### 4. **Polish Orchestrator** (`polish-orchestrator.js`)
Master coordinator for all Phase 4 polish agents.

**Workflows:**
- `--analyze` - Analyze all systems
- `--quick` - Quick polish (essential components only)
- `--polish` - Full polish (all components)
- `--performance` - Performance analysis
- `--docs` - Generate documentation
- `--complete` - Complete workflow (analyze + polish + docs)

**Usage:**
```bash
# Quick analysis
node polish-orchestrator.js --analyze

# Quick polish
node polish-orchestrator.js --quick

# Full polish
node polish-orchestrator.js --polish

# Complete workflow
node polish-orchestrator.js --complete
```

---

## 📊 Phase 4 Components Summary

| Agent | Components/Files | Total Lines | Features |
|-------|-----------------|-------------|----------|
| Animation | 5 components | ~500 | Framer Motion, page transitions, reveals |
| Interaction | 3 components, 2 hooks, 1 util | ~600 | Easter eggs, Konami code, ripple effects |
| Performance | Analysis scripts | ~700 | Build optimization, bundle analysis |
| **Total** | **11 files** | **~1,800** | **Production-ready polish system** |

---

## 🚀 Phase 4 Quick Start

### Run Full Polish Workflow
```bash
# From this directory
node polish-orchestrator.js --complete
```

This will:
1. Analyze existing animations, interactions, and performance
2. Create all animation components
3. Create all interaction components
4. Run performance optimizations
5. Generate complete documentation

### Run Individual Agents
```bash
# Animation agent
node animation-agent.js --create-all

# Interaction agent
node interaction-agent.js --create-all

# Performance agent
node performance-agent.js --full
```

---

## 📝 Phase 4 Component Usage

### PageTransition (in app/layout.tsx)
```tsx
import PageTransition from '@/components/animations/PageTransition';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
```

### RevealText (for hero sections)
```tsx
import RevealText from '@/components/animations/RevealText';

<RevealText
  text="Welcome to my site"
  delay={0.5}
  stagger={0.05}
  className="text-6xl font-bold"
/>
```

### EasterEggs (in app/layout.tsx)
```tsx
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
```

### RippleEffect
```tsx
import RippleEffect from '@/components/interactions/RippleEffect';

<RippleEffect className="rounded-lg">
  <button>Click me!</button>
</RippleEffect>
```

### Console Art (in root component)
```tsx
import { initConsoleArt, trackClicks } from '@/utils/consoleArt';

useEffect(() => {
  initConsoleArt();
  trackClicks();
}, []);
```

---

## 🎨 Phase 4 Design Patterns

### Animation Principles
1. **Smooth easing**: Use `[0.22, 1, 0.36, 1]` for elegant motion
2. **Stagger effects**: 0.03-0.1s delay between elements
3. **Scroll margins**: -100px viewport margin for early triggers
4. **Performance**: GPU-accelerated transforms and opacity
5. **Accessibility**: Respect `prefers-reduced-motion`

### Easter Egg Guidelines
1. Keep them subtle - don't interfere with core functionality
2. Make discoveries rewarding
3. Log for analytics
4. Provide hints in console
5. Test across devices

### Performance Optimization
1. Run analysis on every major release
2. Set performance budgets
3. Monitor bundle size trends
4. Test on 3G networks
5. Use Lighthouse for validation

---

## 🔧 Phase 4 MCP Integration

All Phase 4 agents integrate with the Personal Dashboard MCP API:
- **API Key:** `pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y`
- **Analytics:** `logBuilderAnalytics()` for metrics
- **Task Tracking:** `updateTaskDuration()` for completion times

**Tracked Metrics:**
- Component creation count
- Build duration (minutes)
- Bundle size (KB)
- Performance recommendations
- Task completion times

---

## 📚 Complete Agent List

### Phase 3 - Effect Agents
1. `threejs-agent.js` - 3D WebGL scenes
2. `shader-agent.js` - Custom GLSL shaders
3. `canvas-agent.js` - Canvas 2D particle systems
4. `audio-agent.js` - Web Audio API soundscapes

### Phase 4 - Polish Agents
1. `animation-agent.js` - Framer Motion animations
2. `interaction-agent.js` - Easter eggs and interactions
3. `performance-agent.js` - Build optimization
4. `polish-orchestrator.js` - Master coordinator

**Total Agents:** 8
**Total Components Generated:** 20+
**Total Lines of Code:** ~3,350+

---

## 🎯 Integration Workflow

1. **Generate Components:**
   ```bash
   node polish-orchestrator.js --complete
   ```

2. **Review Generated Files:**
   - Check `src/components/animations/`
   - Check `src/components/interactions/`
   - Check `src/hooks/`
   - Check `src/utils/`

3. **Integrate into App:**
   - Add PageTransition to layout
   - Add EasterEggs to layout
   - Add console art initialization
   - Use animations in pages

4. **Test Performance:**
   ```bash
   node performance-agent.js --full
   ```

5. **Review Reports:**
   - Check `performance-report.json`
   - Follow `OPTIMIZATION_CHECKLIST.md`
   - Review generated `docs/`

---

## 🔍 Troubleshooting Phase 4

### Animations not working
- Ensure `'use client'` directive is present
- Check framer-motion is installed (v12.23.24+)
- Verify no CSS conflicts

### Easter eggs not triggering
- Check browser console for errors
- Verify EasterEggs component is mounted
- Test in different browsers

### Build fails
- Check TypeScript errors with `npm run type-check`
- Verify all imports exist
- Run `npm run build` for detailed errors

### Performance issues
- Review `performance-report.json`
- Check for large dependencies
- Use dynamic imports for heavy components
- Convert images to WebP

---

## 📖 Documentation Files

Generated documentation:
- `docs/animations.md` - Animation system guide
- `docs/interactions.md` - Interaction and easter egg guide
- `OPTIMIZATION_CHECKLIST.md` - Performance checklist
- `performance-report.json` - Detailed performance metrics

---

## 🎉 Next Steps

1. **Phase 5 Planning:** Content generation and SEO optimization
2. **Testing:** Unit tests for polish components
3. **Storybook:** Component documentation
4. **Analytics:** Track easter egg discoveries
5. **A/B Testing:** Test animation variants

---

## 🏆 Achievement System

When users discover easter eggs:
- **10 Clicks:** "Clicker" achievement
- **50 Clicks:** "Super Clicker" achievement
- **100 Clicks:** "Click Master" achievement
- **Konami Code:** "Secret Gamer" achievement
- **Console Commands:** "Curious Developer" achievement

---

## 📦 Dependencies

Phase 4 uses existing project dependencies:
- **framer-motion** v12.23.24 (already installed)
- **Node.js built-in modules** (fs, path, child_process)
- **No additional packages required**

---

**Status:** Phase 3 ✅ Complete | Phase 4 ✅ Complete
**Ready for:** Phase 5 - Content & SEO Optimization
