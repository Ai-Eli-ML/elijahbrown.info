'use client';

import { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import styles from './page.module.css';

type Preset = 'bestie' | 'coach' | 'storyteller' | 'custom';

interface PresetConfig {
  id: Preset;
  emoji: string;
  name: string;
  description: string;
  prompt: string;
  firstMessage: string;
}

const presets: PresetConfig[] = [
  {
    id: 'bestie',
    emoji: '\u{1F60E}',
    name: 'Best Friend',
    description: 'Your ride-or-die who keeps it real. Casual, funny, and always has your back.',
    prompt: `You are the user's best friend. You're casual, warm, funny, and keep it 100. You use slang naturally, crack jokes, and genuinely care about them. You ask about their day, hype them up, and keep the conversation fun and real. You're not formal — you talk like a real friend would. If they seem down, you lift them up. If they're excited, you match their energy.`,
    firstMessage: "Yooo what's good! I was just thinking about you. What you got going on today?",
  },
  {
    id: 'coach',
    emoji: '\u{1F4AA}',
    name: 'Life Coach',
    description: 'A motivational mentor who pushes you toward your goals. Thoughtful and empowering.',
    prompt: `You are a warm but direct life coach. You help people clarify their goals, overcome obstacles, and take action. You ask powerful questions, offer practical advice, and celebrate progress. You're encouraging but honest — you don't sugarcoat things. You believe in their potential and help them see it too. Keep it conversational, not preachy.`,
    firstMessage: "Hey! I'm glad we're connecting. I'd love to hear what's on your mind — what's one thing you've been wanting to make happen?",
  },
  {
    id: 'storyteller',
    emoji: '\u{1F3AD}',
    name: 'Storyteller',
    description: 'A captivating narrator who entertains with tales, humor, and imagination.',
    prompt: `You are a master storyteller and entertainer. You tell vivid, engaging stories — sometimes funny, sometimes dramatic, always captivating. You can improvise stories on any topic, play characters, and keep listeners hooked. You ask what kind of story they want, or surprise them. You're theatrical but warm, and you love making people smile and think.`,
    firstMessage: "Well well well... looks like someone's ready for a story. Want something funny, something wild, or should I surprise you?",
  },
  {
    id: 'custom',
    emoji: '\u{2728}',
    name: 'Create Your Own',
    description: 'Design a completely custom AI personality. You write the script.',
    prompt: '',
    firstMessage: '',
  },
];

export default function AICreator() {
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [customFirstMessage, setCustomFirstMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'calling' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePresetSelect = (preset: Preset) => {
    setSelectedPreset(preset);
    setStatus('idle');
    setErrorMessage('');
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const getPhoneDigits = () => phone.replace(/\D/g, '');

  const handleCall = async () => {
    setStatus('loading');
    setErrorMessage('');

    const digits = getPhoneDigits();
    if (!name.trim()) {
      setStatus('error');
      setErrorMessage('What should the AI call you?');
      return;
    }
    if (digits.length !== 10) {
      setStatus('error');
      setErrorMessage('Enter a valid 10-digit phone number.');
      return;
    }
    if (!selectedPreset) {
      setStatus('error');
      setErrorMessage('Pick a personality first.');
      return;
    }

    const preset = presets.find(p => p.id === selectedPreset);
    if (!preset) return;

    const prompt = selectedPreset === 'custom' ? customPrompt : preset.prompt;
    const firstMessage = selectedPreset === 'custom'
      ? (customFirstMessage || `Hey ${name}! Thanks for creating me. What's on your mind?`)
      : preset.firstMessage;

    if (selectedPreset === 'custom' && !prompt.trim()) {
      setStatus('error');
      setErrorMessage('Describe your AI\'s personality.');
      return;
    }

    try {
      const res = await fetch('/api/ai/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: digits,
          preset: selectedPreset,
          prompt,
          firstMessage: firstMessage.replace('{name}', name.trim()),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('calling');

      // After a delay, show success
      setTimeout(() => setStatus('success'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to start call. Try again.');
    }
  };

  return (
    <div className={styles.page}>
      <div className="container container-sm">
        <h1 className={`${styles.pageTitle} reveal-text`}>AI Voice Lab</h1>
        <p className={`${styles.pageSubtitle} reveal-text delay-1`}>
          Pick a personality, enter your number, and your AI will call you in seconds.
          It&apos;s that simple.
        </p>

        <section className="reveal-text delay-1">
          <GlassCard>
            {/* Personality Presets */}
            <div className={styles.presetGrid}>
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className={`${styles.presetCard} ${selectedPreset === preset.id ? styles.presetCardSelected : ''}`}
                  onClick={() => handlePresetSelect(preset.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handlePresetSelect(preset.id)}
                >
                  <span className={styles.presetEmoji}>{preset.emoji}</span>
                  <div className={styles.presetName}>{preset.name}</div>
                  <div className={styles.presetDesc}>{preset.description}</div>
                </div>
              ))}
            </div>

            {/* Custom personality input */}
            {selectedPreset === 'custom' && (
              <div className={styles.customSection}>
                <label htmlFor="customPrompt" className={styles.customLabel}>
                  Describe Your AI&apos;s Personality
                </label>
                <textarea
                  id="customPrompt"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className={styles.customTextarea}
                  placeholder="Example: A wise grandmother who tells old family stories, gives life advice in southern sayings, and always asks if you've eaten..."
                  disabled={status === 'loading' || status === 'calling'}
                />
                <label
                  htmlFor="customFirstMessage"
                  className={styles.customLabel}
                  style={{ marginTop: 'var(--space-4)' }}
                >
                  Opening Line (optional)
                </label>
                <textarea
                  id="customFirstMessage"
                  value={customFirstMessage}
                  onChange={(e) => setCustomFirstMessage(e.target.value)}
                  className={styles.customTextarea}
                  style={{ minHeight: '60px' }}
                  placeholder="What should the AI say when you pick up? Leave blank for a default greeting."
                  disabled={status === 'loading' || status === 'calling'}
                />
              </div>
            )}

            {/* Phone Form */}
            {selectedPreset && (
              <div className={styles.formSection}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Your Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.input}
                      placeholder="What should the AI call you?"
                      disabled={status === 'loading' || status === 'calling'}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Phone Number <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={styles.input}
                      placeholder="(555) 123-4567"
                      disabled={status === 'loading' || status === 'calling'}
                      maxLength={14}
                    />
                  </div>
                </div>

                <button
                  onClick={handleCall}
                  className={styles.callButton}
                  disabled={status === 'loading' || status === 'calling'}
                >
                  {status === 'loading' ? (
                    <span className={styles.buttonContent}>
                      <span className={styles.spinner} />
                      Creating Your AI...
                    </span>
                  ) : status === 'calling' ? (
                    <span className={styles.buttonContent}>
                      <span className={styles.pulseIcon}>{'\u{1F4DE}'}</span>
                      Calling You Now...
                    </span>
                  ) : (
                    'Call Me'
                  )}
                </button>
              </div>
            )}

            {/* Status messages */}
            {status === 'error' && (
              <div className={styles.error} role="alert">{errorMessage}</div>
            )}

            {status === 'calling' && (
              <div className={styles.calling}>
                Your AI is calling you right now. Pick up the phone!
              </div>
            )}

            {status === 'success' && (
              <div className={styles.success}>
                Your AI has been created and is calling you!
                <div className={styles.successDetails}>
                  If you missed the call, refresh this page and try again.
                </div>
              </div>
            )}
          </GlassCard>
        </section>

        {/* How It Works */}
        <section className={`${styles.howItWorks} reveal-text delay-2`}>
          <GlassCard reflection>
            <h2 className={styles.howItWorksTitle}>How It Works</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>01</div>
                <div className={styles.stepTitle}>Pick a Personality</div>
                <div className={styles.stepDesc}>
                  Choose from preset personalities or create your own custom AI character.
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>02</div>
                <div className={styles.stepTitle}>Enter Your Number</div>
                <div className={styles.stepDesc}>
                  Give us your phone number. We&apos;ll never store it or share it.
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>03</div>
                <div className={styles.stepTitle}>Pick Up the Phone</div>
                <div className={styles.stepDesc}>
                  Your AI will call you in seconds. Talk as long as you want.
                </div>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
