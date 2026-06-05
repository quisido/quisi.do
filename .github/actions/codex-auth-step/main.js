import { getInput, info, setFailed } from '@actions/core';
import { exec } from '@actions/exec';

const COMMANDS = [
  'mkdir --parents "$CODEX_HOME"',
  'printf \'%s\' "$CODEX_AUTH_JSON" | base64 --decode > "$CODEX_HOME/auth.json"',
  'chmod 600 "$CODEX_HOME/auth.json"',
];

for (const cmd of COMMANDS) {
  info(`\x1b[1m$ ${cmd}\x1b[0m`);

  // eslint-disable-next-line no-await-in-loop
  const exitCode = await exec('bash', ['-c', cmd], {
    env: {
      CODEX_AUTH_JSON: getInput('auth-json', { required: true }),
      CODEX_HOME: getInput('codex-home', { required: true }),
    },
    listeners: {
      errline: data => info(data),
      stdline: data => info(data),
    },
    silent: true,
  });

  if (exitCode !== 0) {
    setFailed(`Command "${cmd}" failed with exit code ${exitCode}`);
  }
}
