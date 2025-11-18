#!/usr/bin/env node
/**
 * Domain Registration Agent (Phase 0)
 * Handles domain availability checking, registration, and DNS configuration
 *
 * This agent runs BEFORE website building starts and ensures:
 * 1. Domain is available
 * 2. Domain is registered (if client approves)
 * 3. DNS is configured for Vercel
 * 4. SSL will auto-provision
 *
 * Usage:
 *   node domain-registration-agent.js \
 *     --domain "teslacorp.com" \
 *     --client-name "Tesla Corp" \
 *     --client-email "admin@teslacorp.com" \
 *     --auto-register
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// ============================================================================
// CONFIGURATION
// ============================================================================

const PYTHON_PATH = 'python3';
const AJ_AGI_DIR = path.resolve(__dirname, '../../../../../Agentic Ecosystem/AJ-AGI');

// Pricing
const DOMAIN_PRICING = {
  standard: 10,    // .com, .net, .org
  premium: 15,     // .io, .dev, .ai
  country: 12,     // .us, .uk, .ca
  exotic: 25       // .app, .xyz, .tech
};

// ============================================================================
// DOMAIN REGISTRATION AGENT
// ============================================================================

class DomainRegistrationAgent {
  constructor(options = {}) {
    this.domain = options.domain;
    this.clientName = options.clientName || '';
    this.clientEmail = options.clientEmail || '';
    this.autoRegister = options.autoRegister || false;
    this.results = {};
  }

  /**
   * Run the complete domain registration workflow
   */
  async run() {
    console.log('\n' + '='.repeat(70));
    console.log('DOMAIN REGISTRATION AGENT - Phase 0');
    console.log('='.repeat(70));
    console.log(`Domain: ${this.domain}`);
    console.log(`Client: ${this.clientName || 'Not specified'}`);
    console.log(`Auto-register: ${this.autoRegister ? 'YES' : 'NO'}`);
    console.log('='.repeat(70) + '\n');

    try {
      // Step 1: Check availability
      await this.checkAvailability();

      // Step 2: Estimate cost
      this.estimateCost();

      // Step 3: Register domain (if auto-register or approved)
      if (this.autoRegister && this.results.available) {
        await this.registerDomain();

        // Step 4: Configure DNS for Vercel
        if (this.results.registered) {
          await this.configureDNS();
        }
      } else if (!this.results.available) {
        console.log('\n⚠️  Domain not available - cannot proceed with registration');
        this.suggestAlternatives();
      } else {
        console.log('\n⏸️  Auto-register disabled - waiting for client approval');
        console.log(`   To register, run: node domain-registration-agent.js --domain "${this.domain}" --auto-register`);
      }

      // Generate report
      this.generateReport();

      return this.results;

    } catch (error) {
      console.error('\n❌ Error:', error.message);
      this.results.error = error.message;
      return this.results;
    }
  }

  /**
   * Check if domain is available
   */
  async checkAvailability() {
    console.log('\n[1/4] Checking domain availability...');

    const result = await this.callPythonTool('check_domain_availability', {
      domain_names: this.domain
    });

    // Parse result (simplified - in production, parse actual API response)
    const available = result.includes('AVAILABLE');
    const premium = result.includes('Premium');

    this.results.available = available;
    this.results.premium = premium;
    this.results.checkResult = result;

    if (available) {
      console.log(`   ✅ ${this.domain} is AVAILABLE${premium ? ' (Premium)' : ''}`);
    } else {
      console.log(`   ❌ ${this.domain} is TAKEN`);
    }
  }

  /**
   * Estimate registration cost
   */
  estimateCost() {
    console.log('\n[2/4] Estimating costs...');

    const tld = this.domain.split('.').pop();
    let baseCost = DOMAIN_PRICING.standard;

    // Determine pricing tier
    if (['io', 'dev', 'ai'].includes(tld)) {
      baseCost = DOMAIN_PRICING.premium;
    } else if (['us', 'uk', 'ca'].includes(tld)) {
      baseCost = DOMAIN_PRICING.country;
    } else if (['app', 'xyz', 'tech'].includes(tld)) {
      baseCost = DOMAIN_PRICING.exotic;
    }

    // Add markup
    const cost = baseCost;
    const markup = 40; // Your profit margin
    const clientPrice = cost + markup;

    // Additional services
    const whoisPrivacy = 15;
    const dnsManagement = 25;
    const sslSetup = 50;

    const totalCost = cost;
    const totalPrice = clientPrice + whoisPrivacy + dnsManagement + sslSetup;
    const totalProfit = totalPrice - totalCost;

    this.results.pricing = {
      domainCost: cost,
      domainPrice: clientPrice,
      whoisPrivacy,
      dnsManagement,
      sslSetup,
      totalCost,
      totalPrice,
      totalProfit
    };

    console.log(`   Domain Registration: $${cost} (sell: $${clientPrice})`);
    console.log(`   WhoisGuard Privacy: $${whoisPrivacy}`);
    console.log(`   DNS Management: $${dnsManagement}`);
    console.log(`   SSL Setup: $${sslSetup}`);
    console.log(`   ─────────────────────────────────`);
    console.log(`   Total Cost: $${totalCost}`);
    console.log(`   Total Price: $${totalPrice}`);
    console.log(`   Total Profit: $${totalProfit} 💰`);
  }

  /**
   * Register the domain
   */
  async registerDomain() {
    console.log('\n[3/4] Registering domain...');

    const result = await this.callPythonTool('register_domain_for_client', {
      domain: this.domain,
      client_name: this.clientName,
      client_email: this.clientEmail
    });

    const success = result.includes('✅') || result.includes('successfully');
    this.results.registered = success;
    this.results.registerResult = result;

    if (success) {
      console.log(`   ✅ Domain registered successfully!`);
      console.log(`   Privacy protection: ENABLED`);
      console.log(`   Registration period: 1 year`);
    } else {
      console.log(`   ❌ Registration failed`);
      console.log(result);
    }
  }

  /**
   * Configure DNS for Vercel
   */
  async configureDNS() {
    console.log('\n[4/4] Configuring DNS for Vercel...');

    const result = await this.callPythonTool('configure_dns_for_vercel', {
      domain: this.domain
    });

    const success = result.includes('✅') || result.includes('successfully');
    this.results.dnsConfigured = success;
    this.results.dnsResult = result;

    if (success) {
      console.log(`   ✅ DNS configured successfully!`);
      console.log(`   A Record: @ → 76.76.21.21 (Vercel)`);
      console.log(`   CNAME: www → cname.vercel-dns.com`);
      console.log(`   Propagation time: 5-30 minutes`);
      console.log(`   SSL: Will auto-provision via Vercel`);
    } else {
      console.log(`   ❌ DNS configuration failed`);
      console.log(result);
    }
  }

  /**
   * Suggest alternative domains
   */
  suggestAlternatives() {
    const baseName = this.domain.split('.')[0];
    const alternatives = [
      `${baseName}.io`,
      `${baseName}.dev`,
      `get${baseName}.com`,
      `${baseName}hq.com`,
      `try${baseName}.com`
    ];

    console.log('\n💡 Suggested alternatives:');
    alternatives.forEach(alt => {
      console.log(`   - ${alt}`);
    });
  }

  /**
   * Call Python tool via subprocess
   */
  async callPythonTool(toolName, args) {
    return new Promise((resolve, reject) => {
      const pythonScript = `
import sys
sys.path.append('${AJ_AGI_DIR}')
from aj_namecheap_tools import ${toolName}

result = ${toolName}.invoke(${JSON.stringify(args)})
print(result)
`;

      const pythonProcess = spawn(PYTHON_PATH, ['-c', pythonScript], {
        cwd: AJ_AGI_DIR
      });

      let output = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(new Error(`Python tool failed: ${error || output}`));
        }
      });
    });
  }

  /**
   * Generate final report
   */
  generateReport() {
    console.log('\n' + '='.repeat(70));
    console.log('DOMAIN REGISTRATION REPORT');
    console.log('='.repeat(70));

    console.log(`\nDomain: ${this.domain}`);
    console.log(`Available: ${this.results.available ? 'YES ✅' : 'NO ❌'}`);

    if (this.results.registered) {
      console.log(`Registered: YES ✅`);
      console.log(`DNS Configured: ${this.results.dnsConfigured ? 'YES ✅' : 'NO ❌'}`);
      console.log(`\nStatus: READY FOR DEPLOYMENT 🚀`);
      console.log(`\nNext Steps:`);
      console.log(`  1. Build website (architect, design-system, etc.)`);
      console.log(`  2. Deploy to Vercel`);
      console.log(`  3. Wait 5-30 min for DNS propagation`);
      console.log(`  4. Verify SSL certificate issued`);
      console.log(`  5. Website will be live at https://${this.domain}`);
    } else if (this.results.available && !this.autoRegister) {
      console.log(`\nStatus: AWAITING CLIENT APPROVAL 💵`);
      const pricing = this.results.pricing;
      console.log(`\nClient Quote:`);
      console.log(`  Domain + Setup: $${pricing.totalPrice}`);
      console.log(`  Includes: Registration, Privacy, DNS, SSL`);
    } else {
      console.log(`\nStatus: DOMAIN NOT AVAILABLE ❌`);
      console.log(`\nRecommendation: Suggest alternatives to client`);
    }

    console.log('\n' + '='.repeat(70) + '\n');

    // Save report to file
    const reportPath = path.join(process.cwd(), `domain-report-${this.domain}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`📄 Report saved: ${reportPath}\n`);
  }
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    domain: '',
    clientName: '',
    clientEmail: '',
    autoRegister: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--domain' && args[i + 1]) {
      options.domain = args[i + 1];
      i++;
    } else if (args[i] === '--client-name' && args[i + 1]) {
      options.clientName = args[i + 1];
      i++;
    } else if (args[i] === '--client-email' && args[i + 1]) {
      options.clientEmail = args[i + 1];
      i++;
    } else if (args[i] === '--auto-register') {
      options.autoRegister = true;
    }
  }

  return options;
}

async function main() {
  const options = parseArgs();

  if (!options.domain) {
    console.error('\n❌ Error: --domain is required\n');
    console.log('Usage:');
    console.log('  node domain-registration-agent.js --domain "example.com" [options]\n');
    console.log('Options:');
    console.log('  --domain           Domain to register (required)');
    console.log('  --client-name      Client name for WHOIS');
    console.log('  --client-email     Client email for WHOIS');
    console.log('  --auto-register    Auto-register if available (skip approval)');
    console.log('');
    process.exit(1);
  }

  const agent = new DomainRegistrationAgent(options);
  await agent.run();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = { DomainRegistrationAgent };
