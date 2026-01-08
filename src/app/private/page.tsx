'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function PrivatePage() {
  const [showStats, setShowStats] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Private Research Hub</h1>
          <p className={styles.subtitle}>Blockchain Development Case Studies & Internal Documentation</p>
        </header>

        <section className={styles.mainContent}>
          {/* Case Studies Card */}
          <div className={styles.card}>
            <h2>Blockchain Case Studies</h2>
            <p>Internal documentation and learnings from blockchain development projects:</p>

            <div className={styles.caseStudyCards}>
              <Link href="/private/arbitrage-bot-v3" className={styles.caseStudyCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>&#x26A1;</span>
                  <span className={styles.cardDate}>January 2026</span>
                </div>
                <h3 className={styles.cardTitle}>DEX Arbitrage Bot V3</h3>
                <p className={styles.cardDesc}>
                  Flash loan arbitrage on Arbitrum with AI-powered opportunity detection.
                  Multi-DEX integration, 6-agent orchestration, and real-time TUI.
                </p>
                <span className={styles.readButton}>Read Case Study &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className={styles.card}>
            <h2>Project Metrics</h2>
            <button
              onClick={() => setShowStats(!showStats)}
              className={styles.secondaryButton}
            >
              {showStats ? 'Hide Metrics' : 'View Current Metrics'}
            </button>

            {showStats && (
              <div className={styles.metricsGrid}>
                <div className={styles.metric}>
                  <span className={styles.metricValue}>4</span>
                  <span className={styles.metricLabel}>DEXes Integrated</span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricValue}>6</span>
                  <span className={styles.metricLabel}>AI Agents</span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricValue}>$0</span>
                  <span className={styles.metricLabel}>Total P&L</span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricValue}>13</span>
                  <span className={styles.metricLabel}>Trades Attempted</span>
                </div>
              </div>
            )}
          </div>

          {/* Tech Stack Card */}
          <div className={styles.card}>
            <h2>Technology Stack</h2>
            <div className={styles.techGrid}>
              <div className={styles.techItem}>
                <strong>Blockchain</strong>
                <span>Arbitrum One L2</span>
              </div>
              <div className={styles.techItem}>
                <strong>Flash Loans</strong>
                <span>Balancer V2 (0% fee)</span>
              </div>
              <div className={styles.techItem}>
                <strong>DEXes</strong>
                <span>Uniswap V3, PancakeSwap, Camelot</span>
              </div>
              <div className={styles.techItem}>
                <strong>AI</strong>
                <span>Claude Opus 4.5 (6 agents)</span>
              </div>
              <div className={styles.techItem}>
                <strong>Smart Contracts</strong>
                <span>Solidity 0.8.19, Hardhat</span>
              </div>
              <div className={styles.techItem}>
                <strong>Hardware</strong>
                <span>RTX 5090 (32GB VRAM)</span>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>AdvancingTechnology Internal Documentation</p>
        </footer>
      </div>
    </div>
  );
}
