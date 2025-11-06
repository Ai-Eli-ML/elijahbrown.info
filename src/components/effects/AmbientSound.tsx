'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AmbientSound.module.css';

interface AmbientSoundProps {
  enabled?: boolean;
}

export default function AmbientSound({ enabled = false }: AmbientSoundProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userEnabled, setUserEnabled] = useState(enabled);

  useEffect(() => {
    if (!userEnabled) return;

    // Create audio context
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    audioContextRef.current = audioContext;

    // Create ambient drone
    const createAmbientDrone = () => {
      // Low frequency hum (like a server room)
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, audioContext.currentTime); // A1 note
      gain1.gain.setValueAtTime(0.02, audioContext.currentTime);
      osc1.connect(gain1);
      gain1.connect(audioContext.destination);

      // Harmonic overtone
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110, audioContext.currentTime); // A2 note
      gain2.gain.setValueAtTime(0.015, audioContext.currentTime);
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);

      // Very low sub-bass
      const osc3 = audioContext.createOscillator();
      const gain3 = audioContext.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(27.5, audioContext.currentTime); // A0 note
      gain3.gain.setValueAtTime(0.01, audioContext.currentTime);
      osc3.connect(gain3);
      gain3.connect(audioContext.destination);

      return { oscillators: [osc1, osc2, osc3], gains: [gain1, gain2, gain3] };
    };

    // Create pulse effect
    const createPulse = () => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, audioContext.currentTime); // A3 note

      // Fade in and out (breathing)
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.008, audioContext.currentTime + 2);
      gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 4);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + 4);

      return { oscillators: [osc], gains: [gain] };
    };

    // Start ambient drone
    const { oscillators, gains } = createAmbientDrone();
    oscillators.forEach(osc => osc.start());
    oscillatorsRef.current = oscillators;
    gainNodesRef.current = gains;

    // Pulse every 8 seconds
    const pulseInterval = setInterval(() => {
      if (audioContext.state === 'running') {
        createPulse();
      }
    }, 8000);

    setIsPlaying(true);

    return () => {
      clearInterval(pulseInterval);
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch {
          // Already stopped
        }
      });
      gainNodesRef.current.forEach(gain => gain.disconnect());
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [userEnabled]);

  const toggleSound = () => {
    setUserEnabled(!userEnabled);
  };

  return (
    <button
      className={`${styles.soundToggle} ${isPlaying ? styles.active : ''}`}
      onClick={toggleSound}
      aria-label={isPlaying ? 'Mute ambient sound' : 'Enable ambient sound'}
      title={isPlaying ? 'Mute ambient sound' : 'Enable ambient sound'}
    >
      {isPlaying ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
