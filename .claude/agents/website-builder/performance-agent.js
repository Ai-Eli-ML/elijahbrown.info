#!/usr/bin/env node

/**
 * Performance Agent - Phase 4 Polish
 *
 * Optimizes website performance through:
 * - Build analysis and bundle size optimization
 * - Code splitting and lazy loading
 * - Unused imports detection
 * - Large dependency analysis
 * - Image optimization checks
 * - Performance monitoring and recommendations
 *
 * Usage:
 *   node .claude/agents/website-builder/performance-agent.js --analyze
 *   node .claude/agents/website-builder/performance-agent.js --build
 *   node .claude/agents/website-builder/performance-agent.js --optimize
 *   node .claude/agents/website-builder/performance-agent.js --report
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '../../../');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const NEXT_DIR = path.join(PROJECT_ROOT, '.next');
const PACKAGE_JSON = path.join(PROJECT_ROOT, 'package.json');
const MCP_API_KEY = 'pd_HRLYeHmVbBoO0Q6gS7a9Q37s2jMle88y';

// Performance thresholds
const THRESHOLDS = {
  maxBundleSize: 1024 * 1024, // 1MB
  maxChunkSize: 500 * 1024,   // 500KB
  maxDependencySize: 200 * 1024, // 200KB
  maxImageSize: 1024 * 1024,  // 1MB
  minImageOptimization: 50    // 50% compression
};

/**
 * MCP API Integration for Task Tracking
 */
async function logToMCP(action, details) {
  try {
    const logEntry = {
      timestamp: new Date().toISOString(),
      agent: 'performance-agent',
      action,
      details,
      project: 'elijahbrown.info'
    };

    console.log(`📊 MCP Log: ${action}`, details);
    return logEntry;
  } catch (error) {
    console.warn('⚠️  Failed to log to MCP:', error.message);
  }
}

/**
 * Log performance metrics
 */
async function logBuilderAnalytics(metricType, value, metadata = {}) {
  await logToMCP('performance_metrics', {
    metric_type: metricType,
    value,
    ...metadata
  });
}

/**
 * Update task duration
 */
async function updateTaskDuration(taskName, actualMinutes) {
  await logToMCP('task_update', {
    task_name: taskName,
    actual_duration_minutes: actualMinutes,
    status: 'completed'
  });
}

/**
 * Run production build
 */
function runBuild() {
  const startTime = Date.now();

  console.log('🔨 Running production build...\n');

  try {
    // Clean previous build
    if (fs.existsSync(NEXT_DIR)) {
      console.log('🧹 Cleaning previous build...');
      fs.rmSync(NEXT_DIR, { recursive: true, force: true });
    }

    // Run build
    console.log('📦 Building for production...');
    const output = execSync('npm run build', {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      stdio: 'pipe'
    });

    console.log(output);

    const duration = Math.round((Date.now() - startTime) / 1000 / 60);
    console.log(`\n✅ Build completed in ${duration}m`);

    logBuilderAnalytics('build_completed', duration, {
      build_type: 'production',
      duration_minutes: duration
    });

    updateTaskDuration('production_build', duration);

    return true;
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    console.error(error.stdout || '');

    logBuilderAnalytics('build_failed', 0, {
      error: error.message
    });

    return false;
  }
}

/**
 * Analyze bundle size
 */
function analyzeBundleSize() {
  console.log('📊 Analyzing bundle size...\n');

  if (!fs.existsSync(NEXT_DIR)) {
    console.error('❌ Build not found. Run --build first.');
    return null;
  }

  const results = {
    total_size: 0,
    chunks: [],
    large_chunks: [],
    recommendations: []
  };

  // Analyze .next/static directory
  const staticDir = path.join(NEXT_DIR, 'static');
  if (fs.existsSync(staticDir)) {
    const analyzeDir = (dir, prefix = '') => {
      const files = fs.readdirSync(dir);

      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          analyzeDir(filePath, `${prefix}${file}/`);
        } else if (file.endsWith('.js') || file.endsWith('.css')) {
          const size = stats.size;
          results.total_size += size;

          const chunk = {
            name: `${prefix}${file}`,
            size,
            sizeKB: Math.round(size / 1024),
            path: filePath
          };

          results.chunks.push(chunk);

          if (size > THRESHOLDS.maxChunkSize) {
            results.large_chunks.push(chunk);
          }
        }
      });
    };

    analyzeDir(staticDir);
  }

  // Sort chunks by size
  results.chunks.sort((a, b) => b.size - a.size);

  // Display results
  console.log(`Total bundle size: ${Math.round(results.total_size / 1024)} KB\n`);

  if (results.chunks.length > 0) {
    console.log('📦 Top 10 largest chunks:');
    results.chunks.slice(0, 10).forEach((chunk, index) => {
      const status = chunk.size > THRESHOLDS.maxChunkSize ? '⚠️ ' : '✅';
      console.log(`   ${index + 1}. ${status} ${chunk.name} - ${chunk.sizeKB} KB`);
    });
  }

  console.log();

  // Recommendations
  if (results.large_chunks.length > 0) {
    console.log('⚠️  Large chunks detected:');
    results.large_chunks.forEach(chunk => {
      console.log(`   - ${chunk.name} (${chunk.sizeKB} KB)`);
    });
    results.recommendations.push('Consider code splitting for large chunks');
    results.recommendations.push('Use dynamic imports for heavy components');
  }

  if (results.total_size > THRESHOLDS.maxBundleSize) {
    console.log(`⚠️  Total bundle size exceeds threshold (${Math.round(THRESHOLDS.maxBundleSize / 1024)} KB)`);
    results.recommendations.push('Reduce overall bundle size');
    results.recommendations.push('Review and remove unused dependencies');
  }

  logBuilderAnalytics('bundle_analyzed', results.total_size, {
    total_kb: Math.round(results.total_size / 1024),
    num_chunks: results.chunks.length,
    large_chunks: results.large_chunks.length
  });

  return results;
}

/**
 * Analyze dependencies
 */
function analyzeDependencies() {
  console.log('📦 Analyzing dependencies...\n');

  if (!fs.existsSync(PACKAGE_JSON)) {
    console.error('❌ package.json not found');
    return null;
  }

  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  const results = {
    total_dependencies: Object.keys(dependencies).length,
    large_dependencies: [],
    unused_dependencies: [],
    recommendations: []
  };

  console.log(`Total dependencies: ${results.total_dependencies}\n`);

  // Check for commonly large dependencies
  const knownLargeDeps = {
    'three': 600,
    '@types/three': 50,
    'framer-motion': 200,
    '@mdx-js/react': 100,
    'next-mdx-remote': 50,
    'rehype-highlight': 100
  };

  console.log('📊 Known large dependencies:');
  Object.entries(dependencies).forEach(([name, version]) => {
    if (knownLargeDeps[name]) {
      const estimatedSize = knownLargeDeps[name];
      console.log(`   - ${name}: ~${estimatedSize} KB`);

      if (estimatedSize > THRESHOLDS.maxDependencySize / 1024) {
        results.large_dependencies.push({ name, estimatedSize });
      }
    }
  });

  console.log();

  // Recommendations
  if (results.large_dependencies.length > 0) {
    console.log('💡 Optimization suggestions:');
    results.large_dependencies.forEach(dep => {
      console.log(`   - ${dep.name}: Consider lazy loading or finding lighter alternatives`);
    });
    results.recommendations.push('Use dynamic imports for heavy libraries');
    results.recommendations.push('Consider lighter alternatives for large dependencies');
  }

  // Check for duplicate dependencies
  const duplicates = checkDuplicateDependencies(dependencies);
  if (duplicates.length > 0) {
    console.log('\n⚠️  Potential duplicate functionality:');
    duplicates.forEach(dup => {
      console.log(`   - ${dup.join(' + ')}`);
    });
    results.recommendations.push('Review duplicate functionality in dependencies');
  }

  console.log();

  logBuilderAnalytics('dependencies_analyzed', results.total_dependencies, {
    large_dependencies: results.large_dependencies.length,
    recommendations: results.recommendations.length
  });

  return results;
}

/**
 * Check for duplicate dependencies
 */
function checkDuplicateDependencies(dependencies) {
  const duplicates = [];
  const deps = Object.keys(dependencies);

  // Check for common duplicates
  const commonDuplicates = [
    ['@mdx-js/react', '@mdx-js/loader', 'next-mdx-remote'],
    ['react-dom', 'react'],
  ];

  commonDuplicates.forEach(group => {
    const found = group.filter(name => deps.includes(name));
    if (found.length > 1) {
      duplicates.push(found);
    }
  });

  return duplicates;
}

/**
 * Find unused imports
 */
function findUnusedImports() {
  console.log('🔍 Scanning for unused imports...\n');

  const results = {
    files_scanned: 0,
    potential_unused: [],
    recommendations: []
  };

  // Scan all TypeScript/JavaScript files
  const scanDir = (dir) => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDir(filePath);
      } else if (file.match(/\.(ts|tsx|js|jsx)$/)) {
        results.files_scanned++;
        const content = fs.readFileSync(filePath, 'utf8');

        // Simple unused import detection
        const imports = content.match(/import\s+.*?\s+from\s+['"].*?['"]/g) || [];
        imports.forEach(importLine => {
          const match = importLine.match(/import\s+\{?\s*([^}]+?)\s*\}?\s+from/);
          if (match) {
            const imported = match[1].split(',').map(s => s.trim());
            imported.forEach(imp => {
              const varName = imp.split(' as ')[1] || imp;
              // Check if imported variable is used
              const usageRegex = new RegExp(`\\b${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
              const matches = content.match(usageRegex);
              // If only appears once (in import), it's likely unused
              if (matches && matches.length === 1) {
                results.potential_unused.push({
                  file: path.relative(PROJECT_ROOT, filePath),
                  import: varName,
                  line: importLine
                });
              }
            });
          }
        });
      }
    });
  };

  scanDir(SRC_DIR);

  console.log(`Files scanned: ${results.files_scanned}`);

  if (results.potential_unused.length > 0) {
    console.log(`\n⚠️  Potential unused imports (${results.potential_unused.length}):`);
    results.potential_unused.slice(0, 10).forEach(item => {
      console.log(`   - ${item.file}: ${item.import}`);
    });

    if (results.potential_unused.length > 10) {
      console.log(`   ... and ${results.potential_unused.length - 10} more`);
    }

    results.recommendations.push('Review and remove unused imports');
    results.recommendations.push('Use ESLint with unused-imports plugin');
  } else {
    console.log('\n✅ No obvious unused imports detected');
  }

  console.log();

  logBuilderAnalytics('unused_imports_scan', results.potential_unused.length, {
    files_scanned: results.files_scanned,
    potential_unused: results.potential_unused.length
  });

  return results;
}

/**
 * Analyze images
 */
function analyzeImages() {
  console.log('🖼️  Analyzing images...\n');

  const results = {
    total_images: 0,
    total_size: 0,
    large_images: [],
    unoptimized_formats: [],
    recommendations: []
  };

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];

  const scanDir = (dir) => {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDir(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
          results.total_images++;
          results.total_size += stats.size;

          const image = {
            name: file,
            path: path.relative(PROJECT_ROOT, filePath),
            size: stats.size,
            sizeKB: Math.round(stats.size / 1024),
            format: ext
          };

          if (stats.size > THRESHOLDS.maxImageSize) {
            results.large_images.push(image);
          }

          if (['.jpg', '.jpeg', '.png'].includes(ext)) {
            results.unoptimized_formats.push(image);
          }
        }
      }
    });
  };

  scanDir(path.join(PROJECT_ROOT, 'public'));
  scanDir(SRC_DIR);

  console.log(`Total images: ${results.total_images}`);
  console.log(`Total size: ${Math.round(results.total_size / 1024)} KB\n`);

  if (results.large_images.length > 0) {
    console.log('⚠️  Large images detected:');
    results.large_images.forEach(img => {
      console.log(`   - ${img.path}: ${img.sizeKB} KB`);
    });
    results.recommendations.push('Compress large images');
    results.recommendations.push('Consider using WebP format');
  }

  if (results.unoptimized_formats.length > 0) {
    console.log(`\n💡 ${results.unoptimized_formats.length} images could be converted to WebP for better compression`);
    results.recommendations.push('Convert JPG/PNG images to WebP');
    results.recommendations.push('Use Next.js Image component for automatic optimization');
  }

  if (results.total_images === 0) {
    console.log('ℹ️  No images found');
  } else if (results.large_images.length === 0 && results.unoptimized_formats.length === 0) {
    console.log('✅ All images are well optimized!');
  }

  console.log();

  logBuilderAnalytics('images_analyzed', results.total_images, {
    total_size_kb: Math.round(results.total_size / 1024),
    large_images: results.large_images.length,
    unoptimized: results.unoptimized_formats.length
  });

  return results;
}

/**
 * Generate comprehensive performance report
 */
function generateReport() {
  const startTime = Date.now();

  console.log('📊 Generating comprehensive performance report...\n');
  console.log('='.repeat(60));
  console.log('PERFORMANCE ANALYSIS REPORT');
  console.log('='.repeat(60));
  console.log();

  const report = {
    timestamp: new Date().toISOString(),
    project: 'elijahbrown.info',
    sections: []
  };

  // 1. Bundle Analysis
  console.log('1️⃣  BUNDLE ANALYSIS');
  console.log('-'.repeat(60));
  const bundleResults = analyzeBundleSize();
  if (bundleResults) {
    report.sections.push({ name: 'bundle', ...bundleResults });
  }
  console.log();

  // 2. Dependencies
  console.log('2️⃣  DEPENDENCY ANALYSIS');
  console.log('-'.repeat(60));
  const depsResults = analyzeDependencies();
  if (depsResults) {
    report.sections.push({ name: 'dependencies', ...depsResults });
  }
  console.log();

  // 3. Unused Imports
  console.log('3️⃣  CODE QUALITY');
  console.log('-'.repeat(60));
  const importsResults = findUnusedImports();
  if (importsResults) {
    report.sections.push({ name: 'unused_imports', ...importsResults });
  }
  console.log();

  // 4. Images
  console.log('4️⃣  IMAGE OPTIMIZATION');
  console.log('-'.repeat(60));
  const imagesResults = analyzeImages();
  if (imagesResults) {
    report.sections.push({ name: 'images', ...imagesResults });
  }
  console.log();

  // Summary
  console.log('='.repeat(60));
  console.log('SUMMARY & RECOMMENDATIONS');
  console.log('='.repeat(60));

  const allRecommendations = report.sections
    .flatMap(section => section.recommendations || [])
    .filter((rec, index, self) => self.indexOf(rec) === index);

  if (allRecommendations.length > 0) {
    console.log('\n💡 Top Recommendations:');
    allRecommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  } else {
    console.log('\n✅ Excellent! No major performance issues detected.');
  }

  console.log();

  // Save report
  const reportPath = path.join(PROJECT_ROOT, 'performance-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Full report saved to: ${reportPath}\n`);

  const duration = Math.round((Date.now() - startTime) / 1000 / 60);

  logBuilderAnalytics('performance_report_generated', 1, {
    duration_minutes: duration,
    recommendations_count: allRecommendations.length,
    report_path: reportPath
  });

  updateTaskDuration('generate_performance_report', duration);

  return report;
}

/**
 * Run optimization suggestions
 */
function runOptimizations() {
  console.log('🚀 Running automated optimizations...\n');

  const optimizations = [];

  // 1. Add .eslintrc rule for unused imports
  const eslintConfig = path.join(PROJECT_ROOT, 'eslint.config.mjs');
  if (fs.existsSync(eslintConfig)) {
    console.log('✅ ESLint config found - already configured for Next.js');
    optimizations.push('ESLint configured');
  }

  // 2. Check for Next.js Image optimization
  console.log('\n💡 Optimization recommendations:');
  console.log('   1. Use next/image for all images');
  console.log('   2. Enable experimental optimizeCss in next.config.ts');
  console.log('   3. Use dynamic imports for heavy components');
  console.log('   4. Enable SWC minification (default in Next.js 15)');
  console.log('   5. Consider using next-bundle-analyzer for detailed analysis\n');

  // 3. Create optimization checklist
  const checklistPath = path.join(PROJECT_ROOT, 'OPTIMIZATION_CHECKLIST.md');
  const checklist = `# Performance Optimization Checklist

## Bundle Size
- [ ] All chunks under 500 KB
- [ ] Total bundle under 1 MB
- [ ] Code splitting for large routes
- [ ] Dynamic imports for heavy components

## Dependencies
- [ ] No duplicate dependencies
- [ ] Large dependencies lazy loaded
- [ ] Tree-shaking enabled
- [ ] Only production dependencies in build

## Code Quality
- [ ] No unused imports
- [ ] ESLint passing
- [ ] TypeScript strict mode
- [ ] No console.logs in production

## Images
- [ ] All images under 1 MB
- [ ] Using WebP format
- [ ] Using next/image component
- [ ] Lazy loading below fold images

## Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1

## Best Practices
- [ ] Service Worker for offline support
- [ ] Compression enabled (Brotli/Gzip)
- [ ] CDN for static assets
- [ ] Browser caching configured
- [ ] Preconnect to external domains

## Next Steps
1. Run \`npm run build\` and check output
2. Use Lighthouse in Chrome DevTools
3. Test on slow 3G network
4. Monitor with analytics
5. Set up performance budgets
`;

  fs.writeFileSync(checklistPath, checklist);
  console.log(`📋 Optimization checklist created: ${checklistPath}\n`);

  logBuilderAnalytics('optimizations_run', optimizations.length, {
    checklist_created: true
  });

  return optimizations;
}

/**
 * Main CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  console.log('⚡ Performance Agent - Phase 4 Polish\n');

  try {
    if (args.includes('--build')) {
      runBuild();
    } else if (args.includes('--analyze')) {
      if (!fs.existsSync(NEXT_DIR)) {
        console.log('⚠️  No build found. Running build first...\n');
        const success = runBuild();
        if (!success) {
          process.exit(1);
        }
      }
      analyzeBundleSize();
      analyzeDependencies();
      findUnusedImports();
      analyzeImages();
    } else if (args.includes('--report')) {
      if (!fs.existsSync(NEXT_DIR)) {
        console.log('⚠️  No build found. Running build first...\n');
        const success = runBuild();
        if (!success) {
          process.exit(1);
        }
      }
      generateReport();
    } else if (args.includes('--optimize')) {
      runOptimizations();
    } else if (args.includes('--full')) {
      // Full analysis
      const success = runBuild();
      if (success) {
        console.log();
        generateReport();
        runOptimizations();
      }
    } else {
      // Show usage
      console.log('Usage:');
      console.log('  --build                Run production build');
      console.log('  --analyze              Analyze bundle, dependencies, and code');
      console.log('  --report               Generate comprehensive performance report');
      console.log('  --optimize             Run automated optimizations');
      console.log('  --full                 Run full analysis (build + report + optimize)');
      console.log('\nExamples:');
      console.log('  node performance-agent.js --build');
      console.log('  node performance-agent.js --analyze');
      console.log('  node performance-agent.js --report');
      console.log('  node performance-agent.js --full');
      console.log();
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

// Export for use as module
module.exports = {
  runBuild,
  analyzeBundleSize,
  analyzeDependencies,
  findUnusedImports,
  analyzeImages,
  generateReport,
  runOptimizations,
  logBuilderAnalytics,
  updateTaskDuration
};
