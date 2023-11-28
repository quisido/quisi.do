import getRequestHeaders from './get-request-headers.js';

export default function getIp(): string | null {
  const headers: Headers = getRequestHeaders();
  return headers.get('CF-Connecting-IP');
}
