// NextJS doesn't support the proper `node:crypto` module name.
import { createHmac } from 'crypto';

/**
 *   This should be private; but NextJS does not support environment variables
 * for image loaders, and we're not using ImageKit beyond free tier testing.
 */
const IMAGEKIT_KEY = 'private_xvrnszuazhYS4Gdmg9nO3nH3rig=';

export default function sign(data) {
  return createHmac('sha1', IMAGEKIT_KEY).update(data).digest('hex');
}
