import { chmod, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

const OWNER_READ_WRITE = 0o600;

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
  await mkdir(codexHome, { recursive: true });
  const authJsonBase64 = getInput('auth-json');
  const authJsonPath = join(codexHome, 'auth.json');
  /* global Buffer */
  await writeFile(authJsonPath, Buffer.from(authJsonBase64, 'base64'));
  await chmod(authJsonPath, OWNER_READ_WRITE);
} catch (err) {
  if (err instanceof Error) {
    setFailed(err.message);
  } else {
    setFailed(`Action failed with error: ${err}`);
  }
}
