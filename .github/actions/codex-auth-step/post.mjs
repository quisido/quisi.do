/// <reference types="node" />
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

const escapeData = data =>
  data.replace(/%/gu, '%25').replace(/\r/gu, '%0D').replace(/\n/gu, '%0A');

const getState = name => process.env[`STATE_${name}`] ?? '';

const setFailed = message => {
  process.exitCode = 1;
  process.stdout.write(`::error::${escapeData(message)}\n`);
};

try {
  // Get auth token hash.
  const codexHome = getState('codex-home');
  const previousAuthJsonHash = getState('auth-json-hash');
  const authJsonPath = join(codexHome, 'auth.json');
  const authJsonBase64 = await readFile(authJsonPath, 'base64');
  const authJsonHash = createHash('sha256').update(authJsonBase64).digest('hex');

  // If the auth token has changed,
  if (previousAuthJsonHash !== authJsonBase64) {
    const env = getState('secrets-environment');
    const repo = getState('repository');
    const flags = ['--app', 'actions', '--env', env, '--repo', repo];
    const args = ['secret', 'set', 'CODEX_AUTH_JSON', ...flags];
    const { status: exitCode } = spawnSync('gh', args, {
      env: {
        ...process.env,
        GH_TOKEN: getState('github-token'),
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
