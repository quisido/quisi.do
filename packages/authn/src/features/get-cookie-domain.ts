import { getEnv } from '../constants/worker.js';
import handleInvalidCookieDomain from './handle-invalid-cookie-domain.js';
import handleMissingCookieDomain from './handle-missing-cookie-domain.js';

export default function getCookieDomain(): string {
  const cookieDomain: unknown = getEnv('COOKIE_DOMAIN');
  if (typeof cookieDomain === 'string') {
    return cookieDomain;
  }

  if (typeof cookieDomain === 'undefined') {
    return handleMissingCookieDomain();
  }

  return handleInvalidCookieDomain(cookieDomain);
}
