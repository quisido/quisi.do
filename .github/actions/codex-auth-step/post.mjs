/// <reference types="node" />
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

const escapeData = data =>
  data.replace(/%/gu, '%25').replace(/\r/gu, '%0D').replace(/\n/gu, '%0A');

const getInput = name =>
  process.env[`INPUT_${name.replace(/ /gu, '_').toUpperCase()}`] ?? '';

const setFailed = message => {
  process.exitCode = 1;
  process.stdout.write(`::error::${escapeData(message)}\n`);
};

try {
  const codexHome = getInput('codex-home');
  const authJsonPath = join(codexHome, 'auth.json');
  const originalAuthJsonBase64 = getInput('auth-json');
  const authJsonBase64 = await readFile(authJsonPath, 'base64');

  // If the auth token has changed,
  if (originalAuthJsonBase64 !== authJsonBase64) {
    const env = getInput('secrets-environment');
    const repo = getInput('repository');
    const flags = ['--app', 'actions', '--env', env, '--repo', repo];
    const args = ['secret', 'set', 'CODEX_AUTH_JSON', ...flags];
    const { status: exitCode } = spawnSync('gh', args, {
      env: {
        ...process.env,
        GH_TOKEN: getInput('github-token'),
      },
      /* global Buffer */
      input: Buffer.from(authJsonBase64),
      stdio: ['pipe', 'ignore', 'ignore'],
    });

    if (exitCode !== 0) {
      setFailed(`Failed to set GitHub secret (code ${exitCode})`);
    }
  }
} catch (err) {
  if (err instanceof Error) {
    setFailed(err.message);
  } else {
    setFailed(`Post-action failed with error: ${err}`);
  }
}
