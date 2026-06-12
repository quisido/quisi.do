import { appendFile, chmod, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import process from 'node:process';

const OWNER_READ_WRITE = 0o600;

const { GITHUB_STATE } = process.env;

const escapeData = data =>
  data.replace(/%/gu, '%25').replace(/\r/gu, '%0D').replace(/\n/gu, '%0A');

const getInput = name =>
  process.env[`INPUT_${name.replace(/ /gu, '_').toUpperCase()}`] ?? '';

const saveState = async (name, value) => {
  await appendFile(GITHUB_STATE, `${name}=${value}\n`);
};

const setFailed = message => {
  process.exitCode = 1;
  process.stdout.write(`::error::${escapeData(message)}\n`);
};

try {
  // Create home directory.
  const codexHome = getInput('codex-home');
  await mkdir(codexHome, { recursive: true });

  // Write authentication file.
  const authJsonBase64 = getInput('auth-json');
  const authJsonPath = join(codexHome, 'auth.json');
  const authJson = Buffer.from(authJsonBase64, 'base64');
  /* global Buffer */
  await writeFile(authJsonPath, authJson);
  await chmod(authJsonPath, OWNER_READ_WRITE);

  // Save state for `post.mjs`, which does not have access to input.
  const authJsonHash = createHash('sha256').update(authJsonBase64).digest('hex');
  const githubToken = getInput('github-token');
  const repository = getInput('repository');
  const secretsEnvironment = getInput('secrets-environment');
  await saveState('auth-json-hash', authJsonHash);
  await saveState('codex-home', codexHome);
  await saveState('github-token', githubToken);
  await saveState('repository', repository);
  await saveState('secrets-environment', secretsEnvironment);
} catch (err) {
  if (err instanceof Error) {
    setFailed(err.message);
  } else {
    setFailed(`Action failed with error: ${err}`);
  }
}
