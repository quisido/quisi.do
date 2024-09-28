import type Worker from '@quisido/worker';
import handleInvalidCookieDomain from './handle-invalid-cookie-domain.js';
import handleMissingCookieDomain from './handle-missing-cookie-domain.js';

export default function getCookieDomain(this: Worker): string {
  const cookieDomain: unknown = this.getEnv('COOKIE_DOMAIN');
  if (typeof cookieDomain === 'string') {
    return cookieDomain;
  }

  if (typeof cookieDomain === 'undefined') {
    return handleMissingCookieDomain.call(this);
  }

  return handleInvalidCookieDomain.call(this,cookieDomain);
}
