import { getInput, setFailed } from '@actions/core';
import { chmod, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OWNER_READ_WRITE = 0o600;

try {
  const codexHome = getInput('codex-home', { required: true });
  await mkdir(codexHome, { recursive: true });
  const authJsonBase64 = getInput('auth-json', { required: true });
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
