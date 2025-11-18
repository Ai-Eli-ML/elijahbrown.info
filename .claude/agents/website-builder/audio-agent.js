#!/usr/bin/env node

/**
 * Audio Agent - Phase 3 Effect Agent
 *
 * Responsibilities:
 * - Implements Web Audio API ambient soundscapes
 * - Creates multi-layer drone systems (A1, A2, A0 notes)
 * - Manages oscillators, gain nodes, and filters
 * - Implements breathing pulse effects
 * - Saves audio components via MCP API
 *
 * Features:
 * - Layered ambient drones with frequency modulation
 * - Breathing pulse automation (0.2 Hz cycle)
 * - Multiple oscillator types (sine, triangle, sawtooth)
 * - Low-pass filter for warmth
 * - User-controlled play/pause
 */

const https = require('https');

const MCP_CONFIG = {
  apiKey: 'pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y',
  baseUrl: 'https://dashboard.advancingtechnology.online/api/mcp',
  agentName: 'audio-agent',
  projectId: 'elijahbrown.info'
};

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function log(message, color = 'cyan') {
  console.log(`${colors[color]}${colors.bright}[Audio Agent]${colors.reset} ${message}`);
}

/**
 * Make MCP API request
 */
function mcpRequest(tool, params) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      tool,
      params,
      apiKey: MCP_CONFIG.apiKey
    });

    const options = {
      hostname: 'dashboard.advancingtechnology.online',
      path: '/api/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (response.success) {
            resolve(response.data);
          } else {
            reject(new Error(response.error || 'MCP API error'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Musical note frequencies (in Hz)
 */
const NOTE_FREQUENCIES = {
  A0: 27.5,
  A1: 55.0,
  A2: 110.0,
  A3: 220.0,
  C2: 65.41,
  D2: 73.42,
  E2: 82.41,
  F2: 87.31,
  G2: 98.0
};

/**
 * Generate Ambient Soundscape Component
 */
function generateAmbientSoundscapeComponent() {
  return `'use client';

import { useRef, useEffect, useState } from 'react';

interface AmbientSoundscapeProps {
  autoPlay?: boolean;
  volume?: number;
  breathingRate?: number; // Breathing pulse rate in Hz (default: 0.2 = 5 seconds per cycle)
  className?: string;
}

export default function AmbientSoundscape({
  autoPlay = false,
  volume = 0.3,
  breathingRate = 0.2,
  className = ''
}: AmbientSoundscapeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<{
    A0: OscillatorNode;
    A1: OscillatorNode;
    A2: OscillatorNode;
  } | null>(null);
  const gainNodesRef = useRef<{
    master: GainNode;
    A0: GainNode;
    A1: GainNode;
    A2: GainNode;
  } | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);

  // Initialize Web Audio API
  const initAudio = () => {
    if (audioContextRef.current) return;

    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    // Create master gain (volume control)
    const masterGain = audioContext.createGain();
    masterGain.gain.value = volume;

    // Create low-pass filter for warmth
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 1;

    // Connect filter -> master gain -> destination
    filter.connect(masterGain);
    masterGain.connect(audioContext.destination);

    filterRef.current = filter;
    gainNodesRef.current = { master: masterGain } as any;

    // Create LFO for breathing effect
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();

    lfo.frequency.value = breathingRate; // Breathing rate
    lfoGain.gain.value = 0.15; // Modulation depth

    lfo.connect(lfoGain);
    lfo.start();

    lfoRef.current = lfo;
    lfoGainRef.current = lfoGain;

    // Create three-layer drone (A0, A1, A2)
    const layers = [
      { name: 'A0', freq: 27.5, type: 'sine' as OscillatorType, volume: 0.4 },
      { name: 'A1', freq: 55.0, type: 'triangle' as OscillatorType, volume: 0.3 },
      { name: 'A2', freq: 110.0, type: 'sawtooth' as OscillatorType, volume: 0.2 }
    ];

    const oscillators = {} as any;
    const gainNodes = gainNodesRef.current!;

    layers.forEach(layer => {
      // Create oscillator
      const osc = audioContext.createOscillator();
      osc.type = layer.type;
      osc.frequency.value = layer.freq;

      // Create gain node for this layer
      const gain = audioContext.createGain();
      gain.gain.value = layer.volume;

      // Connect LFO to this layer's gain for breathing effect
      lfoGain.connect(gain.gain);

      // Connect: oscillator -> layer gain -> filter
      osc.connect(gain);
      gain.connect(filter);

      oscillators[layer.name] = osc;
      (gainNodes as any)[layer.name] = gain;
    });

    oscillatorsRef.current = oscillators;
  };

  // Start audio
  const startAudio = () => {
    if (!audioContextRef.current || !oscillatorsRef.current) {
      initAudio();
    }

    // Resume context if suspended (browser autoplay policy)
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }

    // Start all oscillators
    const oscillators = oscillatorsRef.current!;
    try {
      oscillators.A0.start();
      oscillators.A1.start();
      oscillators.A2.start();
      setIsPlaying(true);
    } catch (e) {
      // Oscillators already started
      setIsPlaying(true);
    }
  };

  // Stop audio
  const stopAudio = () => {
    if (!audioContextRef.current || !oscillatorsRef.current) return;

    // Fade out
    const masterGain = gainNodesRef.current?.master;
    if (masterGain) {
      const currentTime = audioContextRef.current.currentTime;
      masterGain.gain.setValueAtTime(masterGain.gain.value, currentTime);
      masterGain.gain.linearRampToValueAtTime(0, currentTime + 1);

      setTimeout(() => {
        if (audioContextRef.current) {
          audioContextRef.current.suspend();
        }
        setIsPlaying(false);

        // Reset volume
        if (masterGain) {
          masterGain.gain.value = volume;
        }
      }, 1000);
    }
  };

  // Toggle play/pause
  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Auto-play on mount
  useEffect(() => {
    if (autoPlay) {
      initAudio();
      // Delay start to respect autoplay policies
      const timer = setTimeout(() => {
        startAudio();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorsRef.current) {
        try {
          oscillatorsRef.current.A0.stop();
          oscillatorsRef.current.A1.stop();
          oscillatorsRef.current.A2.stop();
        } catch (e) {
          // Already stopped
        }
      }

      if (lfoRef.current) {
        try {
          lfoRef.current.stop();
        } catch (e) {
          // Already stopped
        }
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (gainNodesRef.current?.master) {
      gainNodesRef.current.master.gain.value = volume;
    }
  }, [volume]);

  return (
    <div className={\`ambient-soundscape \${className}\`}>
      <button
        onClick={togglePlayback}
        className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg transition-all"
        aria-label={isPlaying ? 'Pause ambient soundscape' : 'Play ambient soundscape'}
      >
        {isPlaying ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Pause Ambient Sound
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play Ambient Sound
          </span>
        )}
      </button>

      {isPlaying && (
        <div className="mt-2 text-xs text-cyan-400/60">
          Multi-layer ambient drone active
        </div>
      )}
    </div>
  );
}`;
}

/**
 * Generate Interactive Synth Component
 */
function generateInteractiveSynthComponent() {
  return `'use client';

import { useRef, useState } from 'react';

const NOTES = [
  { name: 'C2', freq: 65.41 },
  { name: 'D2', freq: 73.42 },
  { name: 'E2', freq: 82.41 },
  { name: 'F2', freq: 87.31 },
  { name: 'G2', freq: 98.0 },
  { name: 'A2', freq: 110.0 }
];

interface InteractiveSynthProps {
  waveType?: OscillatorType;
  volume?: number;
  className?: string;
}

export default function InteractiveSynth({
  waveType = 'sine',
  volume = 0.3,
  className = ''
}: InteractiveSynthProps) {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const playNote = (frequency: number, noteName: string) => {
    // Stop any currently playing note
    stopNote();

    // Create audio context if needed
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;

    // Create oscillator
    const oscillator = audioContext.createOscillator();
    oscillator.type = waveType;
    oscillator.frequency.value = frequency;

    // Create gain node
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start oscillator
    oscillator.start();

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    setActiveNote(noteName);
  };

  const stopNote = () => {
    if (oscillatorRef.current) {
      const currentTime = audioContextRef.current?.currentTime || 0;

      // Fade out
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0, currentTime + 0.1);
      }

      // Stop oscillator
      oscillatorRef.current.stop(currentTime + 0.1);
      oscillatorRef.current = null;
      setActiveNote(null);
    }
  };

  return (
    <div className={\`interactive-synth \${className}\`}>
      <div className="flex gap-2 flex-wrap">
        {NOTES.map(note => (
          <button
            key={note.name}
            onMouseDown={() => playNote(note.freq, note.name)}
            onMouseUp={stopNote}
            onMouseLeave={stopNote}
            onTouchStart={() => playNote(note.freq, note.name)}
            onTouchEnd={stopNote}
            className={\`
              px-6 py-4 rounded-lg border-2 transition-all
              \${activeNote === note.name
                ? 'bg-cyan-500/40 border-cyan-400 scale-95'
                : 'bg-cyan-500/10 border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400/50'
              }
            \`}
          >
            <div className="font-mono font-bold">{note.name}</div>
            <div className="text-xs text-cyan-400/60">{note.freq.toFixed(2)} Hz</div>
          </button>
        ))}
      </div>

      <div className="mt-4 text-sm text-cyan-400/60">
        Wave: {waveType} | Volume: {Math.round(volume * 100)}%
      </div>
    </div>
  );
}`;
}

/**
 * Save component to component library
 */
async function saveComponent(name, code, description, tags) {
  log(`Saving audio component: ${name}...`, 'blue');

  try {
    await mcpRequest('saveComponent', {
      name,
      code,
      description,
      category: 'effects',
      tags,
      framework: 'react',
      language: 'typescript'
    });

    log(`✓ Saved ${name} to component library`, 'green');
    return true;
  } catch (error) {
    log(`Error saving ${name}: ${error.message}`, 'yellow');
    return false;
  }
}

/**
 * Update agent task status
 */
async function updateTaskStatus(filesCreated, output) {
  log('Updating agent task status...', 'blue');

  try {
    await mcpRequest('updateAgentTask', {
      agentName: MCP_CONFIG.agentName,
      projectId: MCP_CONFIG.projectId,
      status: 'completed',
      files_created: filesCreated,
      output
    });

    log('✓ Task status updated', 'green');
  } catch (error) {
    log(`Error updating task: ${error.message}`, 'yellow');
  }
}

/**
 * Main execution
 */
async function main() {
  log('Starting Audio Agent - Phase 3 Effect Agent', 'magenta');

  const filesCreated = [];
  const output = {
    componentsGenerated: [],
    audioFeatures: [
      'Web Audio API implementation',
      'Multi-layer drones (A0, A1, A2)',
      'Breathing pulse automation (0.2 Hz)',
      'Low-pass filtering',
      'User controls (play/pause)',
      'Oscillator types: sine, triangle, sawtooth'
    ],
    timestamp: new Date().toISOString()
  };

  // Generate AmbientSoundscape component
  log('Generating AmbientSoundscape component...', 'blue');
  const ambientComponent = generateAmbientSoundscapeComponent();

  const ambientSaved = await saveComponent(
    'AmbientSoundscape',
    ambientComponent,
    'A calming ambient soundscape with multi-layer drones, breathing pulse effect, and user controls',
    ['audio', 'webaudio', 'ambient', 'soundscape', 'drone', 'interactive']
  );

  if (ambientSaved) {
    filesCreated.push('AmbientSoundscape.tsx');
    output.componentsGenerated.push({
      name: 'AmbientSoundscape',
      type: 'Web Audio API Soundscape',
      features: [
        'Three-layer drone (A0: 27.5Hz, A1: 55Hz, A2: 110Hz)',
        'LFO breathing pulse (0.2 Hz = 5s cycle)',
        'Low-pass filter (800Hz) for warmth',
        'Auto-play support',
        'Volume control',
        'Smooth fade in/out'
      ]
    });
  }

  // Generate InteractiveSynth component
  log('Generating InteractiveSynth component...', 'blue');
  const synthComponent = generateInteractiveSynthComponent();

  const synthSaved = await saveComponent(
    'InteractiveSynth',
    synthComponent,
    'An interactive synthesizer with playable notes, multiple waveforms, and touch/mouse support',
    ['audio', 'webaudio', 'synth', 'interactive', 'music', 'instrument']
  );

  if (synthSaved) {
    filesCreated.push('InteractiveSynth.tsx');
    output.componentsGenerated.push({
      name: 'InteractiveSynth',
      type: 'Interactive Web Audio Synth',
      features: [
        '6 playable notes (C2-A2)',
        'Multiple waveform types',
        'Mouse and touch support',
        'Smooth envelope (fade out)',
        'Visual feedback',
        'Frequency display'
      ]
    });
  }

  // Update task status
  await updateTaskStatus(filesCreated, output);

  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('Audio Agent Execution Complete', 'green');
  log(`Components Generated: ${output.componentsGenerated.length}`, 'cyan');
  log(`Files Created: ${filesCreated.length}`, 'cyan');
  log('Audio Features:', 'cyan');
  output.audioFeatures.forEach(feature => log(`  - ${feature}`, 'blue'));
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
}

// Execute if run directly
if (require.main === module) {
  main().catch(error => {
    log(`Fatal error: ${error.message}`, 'yellow');
    process.exit(1);
  });
}

module.exports = { generateAmbientSoundscapeComponent, generateInteractiveSynthComponent, NOTE_FREQUENCIES };
