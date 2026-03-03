import { access, constants } from 'node:fs/promises';
import joinCwdPath from './join-path.js';

export default async function hasPackageFile(path: string): Promise<boolean> {
  try {
    await access(joinCwdPath(path), constants.F_OK);
    return true;
  } catch (_err: unknown) {
    return false;
  }
}
