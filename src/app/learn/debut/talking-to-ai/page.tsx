'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../what-is-claude/page.module.css';

const LESSON_STEPS = [
  {
    id: 'intro',
    title: 'The Art of Conversation',
    icon: '💬',
    content: `Taylor doesn't just sing words—she tells stories. She knows exactly how to make you *feel* something.

Talking to AI is the same. The better you communicate, the better results you get.

This module teaches you the **art of prompting**—how to ask questions that get you exactly what you need.

**Think of it this way:**
- Vague question = vague answer
- Specific question = specific answer
- Great question = magical answer ✨`,
    taylorQuote: "People haven't always been there for me, but music always has.",
  },
  {
    id: 'bad-vs-good',
    title: 'Bad vs. Good Prompts',
    icon: '⚖️',
    content: `Let's compare some prompts:

**❌ Vague:**
"Help me with code"

**Claude's thought:** Code? What code? What language? What problem?

---

**✅ Specific:**
"I have a JavaScript function that should filter an array of users by age, but it's returning an empty array. Can you help me debug it?"

**Claude's thought:** Perfect! I know the language, the goal, and the problem!

---

**❌ Lazy:**
"Make me a website"

---

**✅ Helpful:**
"I want to create a personal portfolio website with Next.js. It should have a home page, about page, and contact form. Can you start with the basic structure?"

---

**The Pattern:** Be specific. Give context. State your goal.`,
    taylorQuote: "If you're horrible to me, I'm going to write a song about it, and you won't like it.",
  },
  {
    id: 'context-is-queen',
    title: 'Context is Queen 👑',
    icon: '📚',
    content: `Claude can only help with what it knows. Give it context!

**Without Context:**
"Why isn't this working?"

Claude: "I'd love to help, but I can't see what 'this' is!"

---

**With Context:**
"I'm building a React app. This component should show a list of items, but nothing appears. Here's my code: [paste code]. The items array has 5 items in it."

Claude: "Ah! I see the issue—you're not mapping over the items..."

---

**What to include:**
- **What you're building** (React app, Python script, etc.)
- **What you're trying to do** (filter data, fix a bug, etc.)
- **What's happening** (error message, unexpected behavior)
- **What you've tried** (helps avoid repeated suggestions)

**Pro tip:** Paste error messages directly! They're super helpful.`,
    taylorQuote: "I've always been good at compartmentalizing.",
  },
  {
    id: 'magic-phrases',
    title: 'Magic Phrases That Work',
    icon: '🪄',
    content: `Some phrases unlock Claude's full potential:

**"Explain like I'm a beginner"**
Gets simpler explanations without jargon.

**"Step by step"**
Gets organized, numbered instructions.

**"Show me an example"**
Gets actual code you can use.

**"What are the pros and cons?"**
Gets balanced analysis of options.

**"Is there a better way?"**
Gets alternative approaches you might not know.

**"Can you make this simpler?"**
Gets refactored, cleaner code.

---

**Combining them:**
"Explain how async/await works in JavaScript. I'm a beginner, so please use simple terms and show me a basic example."

This tells Claude exactly what you need!`,
    taylorQuote: "In fairytales, the weights of the world are nowhere to be seen.",
  },
  {
    id: 'conversation-not-command',
    title: "It's a Conversation, Not Commands",
    icon: '🎤',
    content: `Remember: you're having a conversation, not giving orders to a robot.

**You can:**
- Ask follow-up questions
- Say "that's not quite what I meant"
- Ask "can you explain that part again?"
- Say "make it shorter" or "more detailed"
- Change direction mid-conversation

---

**Example conversation:**

**You:** "How do I center a div?"

**Claude:** "You can use flexbox: display: flex; justify-content: center; align-items: center..."

**You:** "What if I need to support old browsers?"

**Claude:** "For older browser support, you could use..."

**You:** "Actually, let's stick with flexbox. Can you show me the full CSS?"

**Claude:** "Sure! Here's a complete example..."

---

Claude remembers the whole conversation. Use that!`,
    taylorQuote: "You are not the opinion of someone who doesn't know you.",
  },
  {
    id: 'practice',
    title: "Let's Practice!",
    icon: '🎯',
    content: `Try rewriting these vague prompts:

**Vague:** "Fix my code"
**Better:** "My Python function returns None instead of the list. Here's the code: [paste]. What's wrong?"

---

**Vague:** "How do I make an app?"
**Better:** "I want to make a to-do list app with React. What files and components would I need to start?"

---

**Vague:** "This is broken"
**Better:** "I'm getting 'TypeError: Cannot read property 'map' of undefined' on line 15 of my React component. The data comes from an API. How can I fix this?"

---

**Your turn!** Open Claude Code and try asking something specific about a topic you're curious about. Use the magic phrases!`,
    taylorQuote: "Just because something is over doesn't mean it wasn't incredibly beautiful.",
  },
  {
    id: 'quiz',
    title: 'Quick Check!',
    icon: '📝',
    isQuiz: true,
    questions: [
      {
        question: "Which prompt is better?",
        options: [
          "Help me with JavaScript",
          "My JS function should return the sum of an array, but returns NaN. Can you help?",
          "Code doesn't work",
          "Debug this"
        ],
        correct: 1,
        explanation: "The specific prompt gives Claude context: language, goal, and the actual problem!"
      },
      {
        question: "What makes context helpful?",
        options: [
          "Writing longer messages",
          "Using fancy words",
          "Telling Claude what you're building and what's happening",
          "Asking multiple questions at once"
        ],
        correct: 2,
        explanation: "Context = what you're building + what you're trying to do + what's happening. Simple but specific!"
      },
      {
        question: "What's a magic phrase for getting simpler explanations?",
        options: [
          "Make it complicated",
          "Use more jargon",
          "Explain like I'm a beginner",
          "Just figure it out"
        ],
        correct: 2,
        explanation: "'Explain like I'm a beginner' tells Claude to use simple terms and avoid jargon!"
      }
    ]
  },
  {
    id: 'complete',
    title: 'Debut Era Complete! 🎉',
    icon: '🏆',
    content: `**CONGRATULATIONS!** You've completed the entire Debut Era!

**What you've mastered:**
- What Claude Code is and how it's different from ChatGPT
- How to open a terminal and start Claude Code
- How to have your first AI conversation
- The art of writing great prompts
- Using context and magic phrases

**Era Achievement Unlocked:** 🎸 Debut Master

**Your skills so far:**
- ✅ First Steps
- ✅ First Performance
- ✅ Conversation Artist

---

**What's Next?**
The **Fearless Era** awaits! You'll learn:
- Terminal navigation like a pro
- Reading and writing files with Claude
- Git basics to save your progress

Are you ready to be fearless? 💛`,
    taylorQuote: "I think fearless is having fears but jumping anyway.",
  },
];

export default function TalkingToAIPage() {
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
          <h1 className={styles.title}>How to Talk to AI</h1>
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
            <Link href="/learn" className={styles.navButtonPrimary}>
              Back to Eras →
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
