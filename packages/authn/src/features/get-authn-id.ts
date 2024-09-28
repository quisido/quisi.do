import type Worker from '@quisido/worker';

export default function getAuthnId(this: Worker): string | undefined {
  const cookies: Partial<Record<string, string>> = this.getCookies();
  const { '__Secure-Authentication-ID': authnId } = cookies;
  return authnId;
}
