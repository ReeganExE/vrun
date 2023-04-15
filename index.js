#!/usr/bin/env node

import { spawn } from 'node:child_process';

const npmCommands = process.argv.slice(2);

if (!npmCommands.length) {
  console.error('Nothing to run');
  console.error('Usage: vrun <npm-command-1> ...');
  process.exit(1);
}

const childs = npmCommands.map((command) => {
  console.error(`[vrun] Triggering "npm run ${command}"`);
  return spawn(`npm run ${command}`, {
    shell: true,
    stdio: [null, 'inherit', 'inherit'],
  });
});

process.on('SIGTERM', () => childs.forEach((c) => c.kill('SIGTERM')));
childs.forEach((child) => child.on('close', onClose));

let closed = 0;
let exitCode = 0;
function onClose(code) {
  exitCode |= code;
  closed++;
  if (closed === childs.length) {
    process.exit(exitCode);
  }
}
