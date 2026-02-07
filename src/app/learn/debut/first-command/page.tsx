'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../what-is-claude/page.module.css';

const LESSON_STEPS = [
  {
    id: 'intro',
    title: 'Time to Make Some Noise!',
    icon: '🎵',
    content: `Remember Taylor's first time on stage? Heart pounding, butterflies everywhere, but she stepped up anyway.

That's exactly where you are right now. You're about to run Claude Code for the **first time**.

Don't worry—it's way less scary than it sounds. And unlike a live performance, you can always try again!

**What you'll need:**
- A terminal (we'll show you how to open one)
- Claude Code installed (we'll check that too)
- A tiny bit of courage 💪`,
    taylorQuote: "Just be yourself, there is no one better.",
  },
  {
    id: 'opening-terminal',
    title: 'Opening Your Terminal',
    icon: '💻',
    content: `**On Mac:**
Press \`Cmd + Space\`, type "Terminal", hit Enter.

**On Windows:**
Press \`Win + R\`, type "wt" or "cmd", hit Enter.
(Better: Install Windows Terminal from Microsoft Store!)

**On Linux:**
Press \`Ctrl + Alt + T\` or find "Terminal" in your apps.

---

Once it's open, you'll see something like:
\`\`\`
username@computer ~ $
\`\`\`

That \`$\` (or \`%\` on Mac) means "I'm ready for your command!"

**Pro tip:** The terminal is just a conversation. You type, it responds. Just like texting, but with your computer!`,
    taylorQuote: "In life, we learn lessons. And sometimes we learn them the hard way.",
  },
  {
    id: 'checking-claude',
    title: 'Is Claude Code Installed?',
    icon: '🔍',
    content: `Let's check if Claude Code is already on your system.

Type this command and press Enter:
\`\`\`
claude --version
\`\`\`

**If you see something like:**
\`\`\`
Claude Code v1.0.34
\`\`\`
🎉 You're all set! Skip to the next step.

**If you see "command not found":**
You need to install Claude Code first.

**To install:**
\`\`\`
npm install -g @anthropic-ai/claude-code
\`\`\`

(This requires Node.js. If you don't have that, ask @cool in Discord for help!)

After installing, run \`claude --version\` again to confirm.`,
    taylorQuote: "The lesson I've learned the most often in life is that you're always going to know more in the future than you know now.",
  },
  {
    id: 'first-command',
    title: 'Your Very First Command',
    icon: '🚀',
    content: `Here we go! Type this in your terminal:

\`\`\`
claude
\`\`\`

Just that. One word. Press Enter.

**What happens:**
\`\`\`
╭─────────────────────────────────────────╮
│ Claude Code                              │
│ Your AI pair programmer                  │
╰─────────────────────────────────────────╯

Welcome! I'm Claude, your AI coding assistant.

>
\`\`\`

See that \`>\` at the bottom? That's Claude waiting for YOU!

**Now type:**
\`\`\`
Hello Claude! This is my first time using you.
\`\`\`

Watch Claude respond. It might say something like:
"Hello! Welcome aboard! I'm excited to help you on your coding journey..."

**You just had your first conversation with Claude Code!** 🎉`,
    taylorQuote: "Long story short, I survived.",
  },
  {
    id: 'useful-commands',
    title: 'Commands That Actually Help',
    icon: '✨',
    content: `Now let's try some actually useful stuff!

**See what's in your folder:**
\`\`\`
> What files are in this directory?
\`\`\`

**Get help with a concept:**
\`\`\`
> Explain what a function is in simple terms
\`\`\`

**Ask for code:**
\`\`\`
> Write me a simple "Hello World" in Python
\`\`\`

**Exit Claude Code:**
\`\`\`
> /exit
\`\`\`
or press \`Ctrl + C\`

---

**Notice:** You don't need to be fancy or technical. Just ask like you're texting a friend who happens to be a coding genius!`,
    taylorQuote: "I think the perfection of love is that it's not perfect.",
  },
  {
    id: 'practice',
    title: 'Practice Time!',
    icon: '🎯',
    content: `Now it's YOUR turn. Open Claude Code and try these:

**Challenge 1: Introduction**
\`\`\`
> Tell me a coding joke
\`\`\`

**Challenge 2: Get Help**
\`\`\`
> What's the difference between let and const in JavaScript?
\`\`\`

**Challenge 3: Create Something**
\`\`\`
> Write a function that says "Hello, [name]!" where name is a parameter
\`\`\`

**Challenge 4: Explore**
\`\`\`
> What programming languages can you help me with?
\`\`\`

---

Don't worry about getting things "right." Claude is patient. Ask follow-up questions. Say "explain that simpler" if needed. The goal is to get comfortable talking to AI!`,
    taylorQuote: "If you're lucky enough to be different, don't ever change.",
  },
  {
    id: 'quiz',
    title: 'Quick Check!',
    icon: '📝',
    isQuiz: true,
    questions: [
      {
        question: "What command starts Claude Code?",
        options: ["start claude", "claude", "run claude", "open claude"],
        correct: 1,
        explanation: "Just type 'claude' and press Enter!"
      },
      {
        question: "How do you exit Claude Code?",
        options: ["Type 'quit'", "Press the X button", "Type '/exit' or Ctrl+C", "Turn off your computer"],
        correct: 2,
        explanation: "/exit or Ctrl+C will exit Claude Code cleanly."
      },
      {
        question: "Do you need to use technical language with Claude?",
        options: ["Yes, always", "No, just talk naturally", "Only sometimes", "Only in Python"],
        correct: 1,
        explanation: "Claude understands natural language! Just ask like you're talking to a friend."
      }
    ]
  },
  {
    id: 'complete',
    title: 'Module Complete!',
    icon: '🎉',
    content: `**YOU DID IT!** You ran your first command!

**What you learned:**
- How to open a terminal
- How to check if Claude Code is installed
- How to start Claude Code with just "claude"
- How to have a conversation with Claude
- How to exit cleanly

**Achievement Unlocked:** 🎤 First Performance

**Remember:** Every expert was once a beginner. Taylor's first song wasn't Shake It Off—she had to start with the basics too.

**Next up:** "How to Talk to AI" - learn the art of asking great questions!`,
    taylorQuote: "Fearless is getting back up and fighting for what you want over and over again even though every time you've tried before you've lost.",
  },
];

export default function FirstCommandPage() {
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
          <h1 className={styles.title}>Your First Command</h1>
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
                  {paragraph.startsWith('```') ? (
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
            <Link href="/learn/debut/talking-to-ai" className={styles.navButtonPrimary}>
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
