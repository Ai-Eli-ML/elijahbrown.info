# Website Builder Agent System - Index

**Quick Navigation Guide for all agents and documentation**

---

## Phase 3: Effect Agents ✅ COMPLETE

### Agents
- [threejs-agent.js](threejs-agent.js) - 3D WebGL components with Three.js
- [shader-agent.js](shader-agent.js) - GLSL shader backgrounds
- [canvas-agent.js](canvas-agent.js) - Canvas 2D particle systems
- [audio-agent.js](audio-agent.js) - Web Audio API soundscapes

### Documentation
- [README.md](README.md) - Complete system documentation
- [PHASE3-SUMMARY.md](PHASE3-SUMMARY.md) - Phase 3 detailed summary
- [COMPONENTS.json](COMPONENTS.json) - Component catalog (JSON)
- [INDEX.md](INDEX.md) - This file

### Testing & Utilities
- [test-agents.js](test-agents.js) - Automated test suite
- [run-all.sh](run-all.sh) - Run all agents in sequence

---

## Phase 2: Additional Agents (Pre-existing)

### Agents
- [architect-agent.js](architect-agent.js) - Site architecture planning
- [design-system-agent.js](design-system-agent.js) - Design system creation
- [animation-agent.js](animation-agent.js) - Framer Motion animations
- [content-mdx-agent.js](content-mdx-agent.js) - MDX content generation
- [interaction-agent.js](interaction-agent.js) - Interactive components
- [performance-agent.js](performance-agent.js) - Performance optimization
- [polish-orchestrator.js](polish-orchestrator.js) - Final polish orchestration

### Documentation
- [PHASE2-README.md](PHASE2-README.md) - Phase 2 documentation

### Testing
- [test-orchestration.js](test-orchestration.js) - Orchestration tests

---

## Quick Command Reference

### Run Single Agent
```bash
node threejs-agent.js
node shader-agent.js
node canvas-agent.js
node audio-agent.js
```

### Run All Phase 3 Agents
```bash
./run-all.sh
```

### Test Suite
```bash
node test-agents.js
```

### Check File Structure
```bash
ls -lh
```

---

## Component Categories

### 3D Effects (2 components)
- FloatingOrb.tsx
- ParticleField3D.tsx

### Shader Backgrounds (3 components)
- LiquidChromeBackground.tsx
- VoidWavesBackground.tsx
- HolographicBackground.tsx

### Canvas Particles (2 components)
- ParticleBackground.tsx
- CanvasNetwork.tsx

### Audio Components (2 components)
- AmbientSoundscape.tsx
- InteractiveSynth.tsx

---

## MCP API Integration

All Phase 3 agents integrate with the Personal Dashboard MCP API.

**Configuration:**
- API Key: `pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y`
- Base URL: `https://dashboard.advancingtechnology.online/api/mcp`
- Project ID: `elijahbrown.info`

**Tools:**
- `getReusableComponents` - Query component library
- `saveComponent` - Save generated components
- `updateAgentTask` - Update task status

---

## Technology Stack

- **Three.js** v0.181.0 - 3D WebGL rendering
- **React 19** - Component framework
- **TypeScript** - Type safety
- **GLSL** - Custom shaders
- **Canvas 2D API** - Particle rendering
- **Web Audio API** - Sound synthesis
- **Next.js 15** - Framework (target)

---

## File Statistics

| Category | Files | Total Size |
|----------|-------|------------|
| Phase 3 Agents | 4 | ~65KB |
| Phase 2 Agents | 7 | ~135KB |
| Tests | 2 | ~14KB |
| Documentation | 5 | ~47KB |
| Utilities | 1 | ~2KB |
| **Total** | **19** | **~263KB** |

---

## Status Overview

| Phase | Status | Agents | Components |
|-------|--------|--------|------------|
| Phase 1 | - | - | - |
| Phase 2 | Complete | 7 | Multiple |
| Phase 3 | ✅ Complete | 4 | 9 |

---

## Development Workflow

1. **Plan** - Review requirements and component needs
2. **Execute** - Run appropriate agent(s)
3. **Test** - Use test suite to validate
4. **Integrate** - Import components into Next.js project
5. **Polish** - Optimize and refine as needed

---

## Support & Troubleshooting

### Common Issues

**Agent execution fails:**
- Ensure Node.js 20.x is installed
- Check file permissions (chmod +x)
- Verify working directory

**MCP API errors:**
- Check network connectivity
- Verify API key is valid
- Test with curl command (see README)

**Component rendering issues:**
- Ensure dependencies installed (three, framer-motion)
- Check browser console for errors
- Verify TypeScript compilation

---

## Links & Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Web Audio API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [GLSL Reference](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
- [React 19 Documentation](https://react.dev/)
- [Next.js 15 Documentation](https://nextjs.org/docs)

---

**Last Updated:** November 6, 2025
**Project:** elijahbrown.info
**System:** Website Builder Agent System
**Phase:** 3 - Effect Agents
**Status:** ✅ Production Ready
