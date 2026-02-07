'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const LESSON_STEPS = [
  {
    id: 'intro',
    title: 'Welcome to Your Journey',
    icon: '🎸',
    content: `Just like Taylor picked up her first guitar, you're about to pick up one of the most powerful tools in tech: **Claude Code**.

Think of Claude Code as your AI co-pilot. It's like having a brilliant friend who:
- Knows every programming language
- Never gets tired of explaining things
- Can write, edit, and understand code
- Works right in your terminal

And the best part? It's made by Anthropic, the same people who make Claude (the AI you might have chatted with before).`,
    taylorQuote: "Every day is a new opportunity to be better than you were yesterday.",
  },
  {
    id: 'what-it-does',
    title: 'What Can Claude Code Do?',
    icon: '✨',
    content: `Claude Code is like having a **band member** who can play every instrument. Here's what it can do:

**Read & Understand Code** 📖
Just like Taylor studies song lyrics, Claude reads your code and understands what it does.

**Write New Code** ✍️
Need a new feature? Claude can write it from scratch, just like writing a new song.

**Fix Bugs** 🐛
Something broken? Claude finds and fixes issues like tuning an out-of-pitch guitar.

**Explain Everything** 💡
Don't understand something? Claude explains it in simple terms.

**Run Commands** 💻
Claude can run terminal commands, install packages, and manage your project.`,
    taylorQuote: "I think the best way to solve problems is head-on.",
  },
  {
    id: 'how-different',
    title: 'How is it Different from ChatGPT?',
    icon: '🎤',
    content: `You might have used ChatGPT before. Here's how Claude Code is different:

| ChatGPT | Claude Code |
|---------|-------------|
| Web browser | Your terminal |
| Copy-paste code | Writes directly to files |
| Can't see your project | Sees all your files |
| Generic answers | Knows YOUR code |
| You run commands | Claude runs commands |

**The Big Difference:**
ChatGPT is like watching a concert on YouTube.
Claude Code is like having Taylor Swift in your studio, helping you write the next album.

It's **integrated** into your development environment. It doesn't just suggest code—it actually makes the changes.`,
    taylorQuote: "I've always felt music is about feeling emotions.",
  },
  {
    id: 'terminal',
    title: 'The Terminal: Your Stage',
    icon: '🖥️',
    content: `Before we dive deeper, let's talk about the **terminal** (also called command line or CLI).

The terminal is like a backstage pass. While regular users click buttons and icons, developers use the terminal to:
- Navigate folders
- Run programs
- Install tools
- Talk to Claude Code!

**Don't be scared!** The terminal might look intimidating with its black screen and blinking cursor, but it's just text. You type commands, and the computer responds.

Here's what Claude Code looks like when you start it:
\`\`\`
$ claude
╭─────────────────────────────────────────╮
│ Claude Code                              │
│ Your AI pair programmer                  │
╰─────────────────────────────────────────╯
>
\`\`\`

That \`>\` is where you type your requests!`,
    taylorQuote: "I think fearless is having fears but jumping anyway.",
  },
  {
    id: 'first-look',
    title: 'Your First Look',
    icon: '👀',
    content: `Let's peek at what a conversation with Claude Code looks like:

**You:** "What files are in this project?"

**Claude:** 📁 Scanning your project...
\`\`\`
Found 12 files:
├── package.json
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── components/
│       └── Button.tsx
└── README.md
\`\`\`

**You:** "Can you add a dark mode toggle to the Button component?"

**Claude:** ✏️ I'll update Button.tsx for you...
*[Claude actually edits the file]*

Done! I've added a dark mode toggle. Want me to explain the changes?

---

See how natural it is? You just ask, and Claude does the work!`,
    taylorQuote: "Words can break someone into a million pieces, but they can also put them back together.",
  },
  {
    id: 'quiz',
    title: 'Quick Check!',
    icon: '📝',
    isQuiz: true,
    questions: [
      {
        question: "Where does Claude Code run?",
        options: ["Web browser", "Your terminal", "A mobile app", "Microsoft Word"],
        correct: 1,
        explanation: "Claude Code runs in your terminal, giving it direct access to your files and commands!"
      },
      {
        question: "What can Claude Code do that ChatGPT can't?",
        options: ["Write poems", "Tell jokes", "Edit your actual files", "Search the internet"],
        correct: 2,
        explanation: "Claude Code can directly edit files in your project—no copy-paste needed!"
      },
      {
        question: "What's the terminal like?",
        options: ["A scary hacker thing", "A backstage pass to your computer", "Only for experts", "Old and useless"],
        correct: 1,
        explanation: "The terminal is like a backstage pass—it gives you direct access to powerful features!"
      }
    ]
  },
  {
    id: 'complete',
    title: 'Module Complete!',
    icon: '🎉',
    content: `**Congratulations!** You've completed your first module!

**What you learned:**
- Claude Code is an AI assistant that lives in your terminal
- It can read, write, and edit code directly
- It's different from ChatGPT because it's integrated into your workflow
- The terminal is your friend, not your enemy!

**Achievement Unlocked:** 🎸 First Steps

**Next up:** "Your First Command" - where you'll actually run Claude Code for the first time!`,
    taylorQuote: "No matter what happens in life, be good to people. Being good to people is a wonderful legacy to leave behind.",
  },
];

export default function WhatIsClaudePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const step = LESSON_STEPS[currentStep];
  const progress = ((currentStep + 1) / LESSON_STEPS.length) * 100;

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
    setShowExplanation(prev => ({ ...prev, [questionIndex]: true }));
  };

  const canProceed = () => {
    if (!step.isQuiz) return true;
    if (!step.questions) return true;
    return step.questions.every((_, i) => quizAnswers[i] !== undefined);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/learn" className={styles.backLink}>
          ← Back to Eras
        </Link>
        <div className={styles.headerInfo}>
          <span className={styles.eraTag}>Debut Era</span>
          <h1 className={styles.title}>What is Claude Code?</h1>
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressText}>{currentStep + 1} / {LESSON_STEPS.length}</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.stepNav}>
          {LESSON_STEPS.map((s, i) => (
            <button
              key={s.id}
              className={`${styles.stepDot} ${i === currentStep ? styles.active : ''} ${i < currentStep ? styles.completed : ''}`}
              onClick={() => i <= currentStep && setCurrentStep(i)}
              disabled={i > currentStep}
            >
              <span className={styles.stepIcon}>{s.icon}</span>
            </button>
          ))}
        </div>

        <article className={styles.content}>
          <div className={styles.stepHeader}>
            <span className={styles.stepEmoji}>{step.icon}</span>
            <h2 className={styles.stepTitle}>{step.title}</h2>
          </div>

          {step.isQuiz && step.questions ? (
            <div className={styles.quizContainer}>
              {step.questions.map((q, qIndex) => (
                <div key={qIndex} className={styles.question}>
                  <p className={styles.questionText}>{q.question}</p>
                  <div className={styles.options}>
                    {q.options.map((option, oIndex) => {
                      const isSelected = quizAnswers[qIndex] === oIndex;
                      const isCorrect = q.correct === oIndex;
                      const showResult = showExplanation[qIndex];

                      let optionClass = styles.option;
                      if (showResult && isSelected && isCorrect) optionClass += ` ${styles.correct}`;
                      if (showResult && isSelected && !isCorrect) optionClass += ` ${styles.incorrect}`;
                      if (showResult && !isSelected && isCorrect) optionClass += ` ${styles.showCorrect}`;

                      return (
                        <button
                          key={oIndex}
                          className={optionClass}
                          onClick={() => !showExplanation[qIndex] && handleQuizAnswer(qIndex, oIndex)}
                          disabled={showExplanation[qIndex]}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {showExplanation[qIndex] && (
                    <div className={styles.explanation}>
                      {quizAnswers[qIndex] === q.correct ? '✅ ' : '❌ '}
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.lessonContent}>
              {step.content?.split('\n\n').map((paragraph, i) => (
                <div key={i} className={styles.paragraph}>
                  {paragraph.startsWith('|') ? (
                    <div className={styles.table}>
                      {paragraph.split('\n').map((row, ri) => (
                        <div key={ri} className={styles.tableRow}>
                          {row.split('|').filter(Boolean).map((cell, ci) => (
                            <span key={ci} className={ri === 0 ? styles.tableHeader : styles.tableCell}>
                              {cell.trim()}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : paragraph.startsWith('```') ? (
                    <pre className={styles.codeBlock}>
                      <code>{paragraph.replace(/```\w*/g, '').trim()}</code>
                    </pre>
                  ) : (
                    <p dangerouslySetInnerHTML={{
                      __html: paragraph
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/`([^`]+)`/g, '<code>$1</code>')
                        .replace(/\n/g, '<br/>')
                    }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {step.taylorQuote && (
            <blockquote className={styles.taylorQuote}>
              <p>"{step.taylorQuote}"</p>
              <cite>— Taylor Swift</cite>
            </blockquote>
          )}
        </article>

        <nav className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
          >
            ← Previous
          </button>

          {currentStep === LESSON_STEPS.length - 1 ? (
            <Link href="/learn/debut/first-command" className={styles.navButtonPrimary}>
              Next Module →
            </Link>
          ) : (
            <button
              className={styles.navButtonPrimary}
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
            >
              Continue →
            </button>
          )}
        </nav>
      </main>

      <footer className={styles.footer}>
        <p>Part of The AI Eras Tour • Made with 💜 by Advancing Technology</p>
      </footer>
    </div>
  );
}
