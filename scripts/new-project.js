#!/usr/bin/env node
/**
 * San Patrik — New Project Scaffold
 *
 * Usage:
 *   node scripts/new-project.js [project-name]
 *
 * Example:
 *   node scripts/new-project.js villa-luna
 *
 * Creates: C:\aureus-development\san-patrik\[project-name]\
 */

const { execSync } = require('child_process');
const path         = require('path');
const fs           = require('fs');

// ─── Args ─────────────────────────────────────────────────────────────────────

const projectName = process.argv[2];

if (!projectName) {
  console.error('\n  ❌  Usage: node scripts/new-project.js [project-name]\n');
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(projectName)) {
  console.error('\n  ❌  Project name must be lowercase letters, numbers, and hyphens only.\n');
  process.exit(1);
}

// ─── Paths ────────────────────────────────────────────────────────────────────

const templateDir = path.resolve(__dirname, '..');
const targetDir   = path.resolve(templateDir, '..', projectName);

if (fs.existsSync(targetDir)) {
  console.error(`\n  ❌  Directory already exists: ${targetDir}\n`);
  process.exit(1);
}

// ─── Copy ─────────────────────────────────────────────────────────────────────

console.log(`\n  Scaffolding "${projectName}"…`);
console.log(`  Source : ${templateDir}`);
console.log(`  Target : ${targetDir}\n`);

try {
  // robocopy exit codes 0–7 are all success variants
  execSync(
    `robocopy "${templateDir}" "${targetDir}" /E /XD node_modules .next .git /XF .env.local /NP /NFL /NDL`,
    { stdio: 'inherit' }
  );
} catch (err) {
  // robocopy exits with 1 when files are copied successfully — that throws in
  // execSync. Only treat exit codes > 7 as genuine failures.
  if (err.status > 7) {
    console.error(`\n  ❌  robocopy failed (exit code ${err.status})\n`);
    process.exit(1);
  }
}

// ─── Done ─────────────────────────────────────────────────────────────────────

console.log('\n  ✅  Project created successfully!\n');
console.log('  Next steps:');
console.log(`    1. cd C:\\aureus-development\\san-patrik\\${projectName}`);
console.log('    2. Open /lib/content.ts — replace every PLACEHOLDER_ value');
console.log('    3. Drop images into /public/images/ (see TEMPLATE-GUIDE.md Step 3)');
console.log('    4. cp .env.local.example .env.local  →  fill in all 6 variables');
console.log('    5. npm install && npm run dev\n');
