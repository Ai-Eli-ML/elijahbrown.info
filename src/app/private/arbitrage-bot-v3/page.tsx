'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ArbitrageBotCaseStudy() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/private" className={styles.backLink}>
          &larr; Back to Private Hub
        </Link>

        <header className={styles.header}>
          <span className={styles.badge}>CASE STUDY</span>
          <h1 className={styles.title}>DEX Arbitrage Bot V3</h1>
          <p className={styles.subtitle}>
            Flash loan arbitrage on Arbitrum with AI-powered opportunity detection
          </p>
          <div className={styles.meta}>
            <span>January 2026</span>
            <span className={styles.separator}>|</span>
            <span>AdvancingTechnology</span>
            <span className={styles.separator}>|</span>
            <span className={styles.status}>IN DEVELOPMENT</span>
          </div>
        </header>

        <article className={styles.article}>
          {/* Executive Summary */}
          <section className={styles.section}>
            <h2>Executive Summary</h2>
            <p>
              This project represents a deep dive into decentralized exchange (DEX) arbitrage
              on Arbitrum L2, combining flash loans with AI-powered opportunity detection.
              The goal was to build a profitable trading bot using minimal capital by leveraging
              Balancer V2&apos;s 0% fee flash loans.
            </p>
            <div className={styles.keyPoints}>
              <div className={styles.keyPoint}>
                <span className={styles.keyIcon}>&#x1F4B0;</span>
                <div>
                  <strong>Capital Required</strong>
                  <span>0 ETH (flash loans)</span>
                </div>
              </div>
              <div className={styles.keyPoint}>
                <span className={styles.keyIcon}>&#x26A1;</span>
                <div>
                  <strong>Network</strong>
                  <span>Arbitrum One L2</span>
                </div>
              </div>
              <div className={styles.keyPoint}>
                <span className={styles.keyIcon}>&#x1F916;</span>
                <div>
                  <strong>AI Integration</strong>
                  <span>6-agent system</span>
                </div>
              </div>
              <div className={styles.keyPoint}>
                <span className={styles.keyIcon}>&#x1F4CA;</span>
                <div>
                  <strong>Current P&L</strong>
                  <span>$0 (pre-live)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section className={styles.section}>
            <h2>System Architecture</h2>
            <div className={styles.architecture}>
              <pre className={styles.codeBlock}>{`
┌─────────────────────────────────────────────────────────────────────┐
│                        TRADING BOT V3                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────────┐    │
│  │   bot.js    │───▶│   dexes.js   │───▶│  Arbitrum RPC Node  │    │
│  │ (Scanner)   │    │ (4 DEXes)    │    │  (alchemy.com)      │    │
│  └──────┬──────┘    └──────────────┘    └─────────────────────┘    │
│         │                                                            │
│         ▼                                                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    AI OPPORTUNITY FINDER                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │   │
│  │  │ Scanner  │ │ Predictor│ │ Executor │ │ Risk Mgr │       │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │   │
│  │  ┌──────────┐ ┌──────────┐                                  │   │
│  │  │ Optimizer│ │ Reporter │                                  │   │
│  │  └──────────┘ └──────────┘                                  │   │
│  └────────────────────────────────────────────────────────────┬┘   │
│                                                                │    │
│         ▼                                                      │    │
│  ┌─────────────────────┐    ┌──────────────────────────────┐  │    │
│  │  Flash Loan Module  │    │     Smart Contract           │  │    │
│  │  (Balancer V2 0%)   │───▶│  0x8Ca3E873CD2a522183b...   │  │    │
│  └─────────────────────┘    └──────────────────────────────┘  │    │
│                                                                │    │
└────────────────────────────────────────────────────────────────┘    │
              │                                                       │
              ▼                                                       │
┌─────────────────────────────────────────────────────────────────────┤
│                          DEX INTEGRATIONS                           │
├──────────────────┬────────────────┬──────────────┬─────────────────┤
│   Uniswap V3     │  PancakeSwap   │  Camelot V3  │  SushiSwap V3   │
│   (Standard)     │    V3          │  (Algebra)   │  (Disabled)     │
└──────────────────┴────────────────┴──────────────┴─────────────────┘
`}</pre>
            </div>
          </section>

          {/* Technical Challenges */}
          <section className={styles.section}>
            <h2>Technical Challenges & Solutions</h2>

            <div className={styles.challenge}>
              <h3>Challenge 1: Camelot V3 Integration (Algebra Protocol)</h3>
              <p>
                Camelot V3 uses the Algebra protocol instead of standard Uniswap V3.
                This meant different quoter contracts and ABI structures.
              </p>
              <div className={styles.solution}>
                <strong>Solution:</strong>
                <ul>
                  <li>Identified correct quoter: <code>0x0Fc73040b26E9bC8514fA028D998E73A254Fa76E</code></li>
                  <li>Updated ABI to use individual params instead of struct</li>
                  <li>Removed fee tier logic (Algebra uses dynamic fees)</li>
                </ul>
              </div>
            </div>

            <div className={styles.challenge}>
              <h3>Challenge 2: Flashbots on Arbitrum</h3>
              <p>
                Initial research suggested using Flashbots for MEV protection.
                However, Flashbots doesn&apos;t work on Arbitrum L2.
              </p>
              <div className={styles.solution}>
                <strong>Solution:</strong>
                <ul>
                  <li>Discovered Arbitrum has native MEV protection via FIFO sequencer</li>
                  <li>Removed Flashbots integration attempt</li>
                  <li>Relied on Arbitrum&apos;s built-in transaction ordering</li>
                </ul>
              </div>
            </div>

            <div className={styles.challenge}>
              <h3>Challenge 3: Fake Spread Detection</h3>
              <p>
                Early versions showed massive 378% spreads that were false positives
                due to same-DEX comparisons or unverified quoter contracts.
              </p>
              <div className={styles.solution}>
                <strong>Solution:</strong>
                <ul>
                  <li>Added same-DEX filtering in comparison logic</li>
                  <li>Disabled unverified quoters (SushiSwap V3)</li>
                  <li>Implemented realistic spread validation (&lt;5% threshold)</li>
                </ul>
              </div>
            </div>

            <div className={styles.challenge}>
              <h3>Challenge 4: Small Capital Strategy</h3>
              <p>
                With limited ETH, traditional arbitrage opportunities are unprofitable
                after gas costs. Needed alternative strategies.
              </p>
              <div className={styles.solution}>
                <strong>Solution (In Progress):</strong>
                <ul>
                  <li>Flash loan integration (0% fee from Balancer)</li>
                  <li>Low-competition pairs (GRAIL, MAGIC, SILO)</li>
                  <li>New token launch monitoring</li>
                  <li>Micro-arbitrage accumulation strategy</li>
                </ul>
              </div>
            </div>
          </section>

          {/* DEX Integration Details */}
          <section className={styles.section}>
            <h2>DEX Integration Details</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>DEX</th>
                  <th>Protocol</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Uniswap V3</strong></td>
                  <td>Standard UniV3</td>
                  <td className={styles.statusGreen}>Active</td>
                  <td>Primary liquidity source</td>
                </tr>
                <tr>
                  <td><strong>PancakeSwap V3</strong></td>
                  <td>UniV3 Fork</td>
                  <td className={styles.statusGreen}>Active</td>
                  <td>Good for WETH pairs</td>
                </tr>
                <tr>
                  <td><strong>Camelot V3</strong></td>
                  <td>Algebra</td>
                  <td className={styles.statusGreen}>Active</td>
                  <td>Fixed quoter address</td>
                </tr>
                <tr>
                  <td><strong>SushiSwap V3</strong></td>
                  <td>UniV3 Fork</td>
                  <td className={styles.statusRed}>Disabled</td>
                  <td>Quoter not verified on Arbitrum</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* AI Agent System */}
          <section className={styles.section}>
            <h2>AI-Powered Opportunity Finder</h2>
            <p>
              The bot uses a 6-agent system powered by Claude Opus 4.5 for intelligent
              opportunity detection and risk management:
            </p>
            <div className={styles.agentGrid}>
              <div className={styles.agent}>
                <span className={styles.agentIcon}>&#x1F50D;</span>
                <h4>Scanner Agent</h4>
                <p>Continuously monitors DEX prices and identifies potential spreads</p>
              </div>
              <div className={styles.agent}>
                <span className={styles.agentIcon}>&#x1F4C8;</span>
                <h4>Predictor Agent</h4>
                <p>Uses ML patterns to predict spread persistence and execution success</p>
              </div>
              <div className={styles.agent}>
                <span className={styles.agentIcon}>&#x26A1;</span>
                <h4>Executor Agent</h4>
                <p>Handles transaction preparation, gas estimation, and execution</p>
              </div>
              <div className={styles.agent}>
                <span className={styles.agentIcon}>&#x1F6E1;</span>
                <h4>Risk Manager</h4>
                <p>Validates trades against risk parameters and position limits</p>
              </div>
              <div className={styles.agent}>
                <span className={styles.agentIcon}>&#x2699;</span>
                <h4>Optimizer Agent</h4>
                <p>Optimizes trade size, path selection, and gas settings</p>
              </div>
              <div className={styles.agent}>
                <span className={styles.agentIcon}>&#x1F4CA;</span>
                <h4>Reporter Agent</h4>
                <p>Generates real-time reports and logs all activity</p>
              </div>
            </div>
          </section>

          {/* Smart Contract */}
          <section className={styles.section}>
            <h2>Smart Contract</h2>
            <div className={styles.contractInfo}>
              <div className={styles.contractAddress}>
                <strong>Deployed Address:</strong>
                <code>0x8Ca3E873CD2a522183b0aDfE74bDD654656474E2</code>
              </div>
              <div className={styles.contractDetails}>
                <div>
                  <strong>Network:</strong>
                  <span>Arbitrum One</span>
                </div>
                <div>
                  <strong>Flash Loan Provider:</strong>
                  <span>Balancer V2 Vault</span>
                </div>
                <div>
                  <strong>Router:</strong>
                  <span>Uniswap V3 SwapRouter</span>
                </div>
              </div>
            </div>
            <pre className={styles.codeBlock}>{`// Simplified contract structure
contract Arbitrage is IFlashLoanRecipient, ReentrancyGuard {
    IVault public immutable vault;      // Balancer V2
    ISwapRouter public immutable router; // Uniswap V3

    function executeArbitrage(
        address tokenIn,
        address tokenOut,
        uint256 amount,
        uint24 fee
    ) external onlyOwner {
        // 1. Flash loan from Balancer (0% fee)
        vault.flashLoan(this, tokens, amounts, userData);
    }

    function receiveFlashLoan(
        IERC20[] memory tokens,
        uint256[] memory amounts,
        uint256[] memory feeAmounts,
        bytes memory userData
    ) external {
        require(msg.sender == address(vault), "Only Balancer");

        // 2. Execute arbitrage swap
        uint256 amountOut = router.exactInputSingle(...);

        // 3. Repay flash loan
        tokens[0].transfer(address(vault), amounts[0]);

        // 4. Keep profit
        uint256 profit = amountOut - amounts[0];
    }
}`}</pre>
          </section>

          {/* Current Results */}
          <section className={styles.section}>
            <h2>Current Results</h2>
            <div className={styles.resultsGrid}>
              <div className={styles.result}>
                <span className={styles.resultValue}>13</span>
                <span className={styles.resultLabel}>Trades Attempted</span>
              </div>
              <div className={styles.result}>
                <span className={styles.resultValue}>0</span>
                <span className={styles.resultLabel}>Successful Trades</span>
              </div>
              <div className={styles.result}>
                <span className={styles.resultValue}>-$0.002</span>
                <span className={styles.resultLabel}>Net P&L</span>
              </div>
              <div className={styles.result}>
                <span className={styles.resultValue}>0.05%</span>
                <span className={styles.resultLabel}>Avg Spread</span>
              </div>
            </div>
            <div className={styles.analysisBox}>
              <h4>Analysis</h4>
              <p>
                The realistic 0.05% spreads we&apos;re now detecting are accurate but too small
                for profitable execution with current gas costs (~$0.50 per trade on Arbitrum).
                This confirms the need for the small-capital strategies we&apos;re implementing.
              </p>
            </div>
          </section>

          {/* Next Steps */}
          <section className={styles.section}>
            <h2>Next Steps</h2>
            <div className={styles.roadmap}>
              <div className={styles.roadmapItem}>
                <span className={styles.roadmapNumber}>1</span>
                <div>
                  <h4>New Token Launch Detector</h4>
                  <p>Monitor factory contracts for PairCreated events - catch early liquidity</p>
                </div>
              </div>
              <div className={styles.roadmapItem}>
                <span className={styles.roadmapNumber}>2</span>
                <div>
                  <h4>Low-Competition Pairs</h4>
                  <p>GRAIL, MAGIC, SILO, VSTA - less competitive, larger spreads</p>
                </div>
              </div>
              <div className={styles.roadmapItem}>
                <span className={styles.roadmapNumber}>3</span>
                <div>
                  <h4>Micro-Arbitrage Accumulation</h4>
                  <p>Execute small profitable trades consistently, compound over time</p>
                </div>
              </div>
              <div className={styles.roadmapItem}>
                <span className={styles.roadmapNumber}>4</span>
                <div>
                  <h4>Live Trading Activation</h4>
                  <p>Arm the bot with real capital and monitor for 24-48 hours</p>
                </div>
              </div>
            </div>
          </section>

          {/* Lessons Learned */}
          <section className={styles.section}>
            <h2>Key Learnings</h2>
            <ul className={styles.lessonsList}>
              <li>
                <strong>Research Before Integration:</strong> Each DEX has unique quirks.
                Camelot&apos;s Algebra protocol required different handling than standard UniV3.
              </li>
              <li>
                <strong>L2 MEV is Different:</strong> Flashbots patterns don&apos;t apply to Arbitrum.
                The sequencer provides built-in protection.
              </li>
              <li>
                <strong>Validate Everything:</strong> Fake spreads from same-DEX comparisons
                wasted initial development time.
              </li>
              <li>
                <strong>Capital Matters:</strong> Traditional arbitrage requires significant capital
                or flash loans to overcome gas costs.
              </li>
              <li>
                <strong>AI Adds Value:</strong> The 6-agent system provides intelligent filtering
                that would be difficult to code manually.
              </li>
            </ul>
          </section>
        </article>

        <footer className={styles.footer}>
          <p>AdvancingTechnology | Blockchain Division</p>
          <p className={styles.footerNote}>Last updated: January 7, 2026</p>
        </footer>
      </div>
    </div>
  );
}
