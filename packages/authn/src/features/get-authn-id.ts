import { getCookies } from '../constants/worker.js';

export default function getAuthnId(): string | undefined {
  const cookies: Partial<Record<string, string>> = getCookies();
  const { '__Secure-Authentication-ID': authnId } = cookies;
  return authnId;
}
