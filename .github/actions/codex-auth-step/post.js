/// <reference types="node" />
import { getInput, info, setFailed } from '@actions/core';
import { exec } from '@actions/exec';

const COMMANDS = [
  'base64 --wrap 0 "$CODEX_HOME/auth.json" | gh secret set CODEX_AUTH_JSON --app actions --env "$ENV" --repo $REPO',
];

for (const cmd of COMMANDS) {
  info(`\x1b[1m$ ${cmd}\x1b[0m`);

  // eslint-disable-next-line no-await-in-loop
  const exitCode = await exec('bash', ['-c', cmd], {
    env: {
      CODEX_HOME: getInput('codex-home', { required: true }),
      ENV: getInput('secrets-environment', { required: true }),
      GH_TOKEN: getInput('github-token', { required: true }),
      REPO: getInput('repository', { required: true }),
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
