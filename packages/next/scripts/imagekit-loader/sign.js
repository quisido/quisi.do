import { createHmac } from 'crypto'; // node:crypto

const { IMAGEKIT_KEY } = process.env;

if (typeof IMAGEKIT_KEY === 'undefined') {
  throw new Error('Expected an environment variable named "IMAGEKIT_KEY"');
}

export default function sign(data) {
  return createHmac('sha1', IMAGEKIT_KEY).update(data).digest('hex');
}
