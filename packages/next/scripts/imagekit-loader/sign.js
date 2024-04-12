import { createHmac } from 'crypto'; // node:crypto

/*
const { IMAGEKIT_KEY } = process.env;

if (typeof IMAGEKIT_KEY === 'undefined') {
  throw new Error('Expected an environment variable named "IMAGEKIT_KEY".');
}
*/

// NextJS image loaders do not support environment variables.
const IMAGEKIT_KEY = 'private_xvrnszuazhYS4Gdmg9nO3nH3rig=';

export default function sign(data) {
  return createHmac('sha1', IMAGEKIT_KEY).update(data).digest('hex');
}
