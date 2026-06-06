/// <reference types="node" />
import { getInput, setFailed } from '@actions/core';
import { exec } from '@actions/exec';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

try {
  const codexHome = getInput('codex-home', { required: true });
  const authJsonPath = join(codexHome, 'auth.json');
  const originalAuthJsonBase64 = getInput('auth-json', { required: true });
  const authJsonBase64 = await readFile(authJsonPath, 'base64');

  // If the auth token has changed,
  if (originalAuthJsonBase64 !== authJsonBase64) {
    const env = getInput('secrets-environment', { required: true });
    const repo = getInput('repository', { required: true });
    const flags = ['--app', 'actions', '--env', env, '--repo', repo];
    const args = ['secret', 'set', 'CODEX_AUTH_JSON', ...flags];
    const exitCode = await exec('gh', args, {
      env: {
        ...process.env,
        GH_TOKEN: getInput('github-token', { required: true }),
      },
      /* global Buffer */
      input: Buffer.from(authJsonBase64),
      silent: true,
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
