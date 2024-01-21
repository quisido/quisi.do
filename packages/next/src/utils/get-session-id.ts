import createSessionId from './create-session-id.js';
import getCookie from './get-cookie.js';
import setCookie from './set-cookie.js';

export default function getSessionId(): string {
  const id: null | string = getCookie('Session-ID');
  if (id !== null) {
    return id;
  }

  const newId: string = createSessionId();
  setCookie('Session-ID', newId, {
    partitioned: true,
    subdomains: true,
  });
  return newId;
}
