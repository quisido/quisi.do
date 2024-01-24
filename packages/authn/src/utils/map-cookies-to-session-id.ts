import StatusCode from '../constants/status-code.js';
import assert from './assert.js';

export default function mapCookiesToSessionId(
  cookies: Partial<Record<string, string>>,
): string {
  const sessionId: string | undefined = cookies['__Secure-Session-ID'];

  assert(
    typeof sessionId === 'string',
    'Expected a session ID.',
    StatusCode.BadRequest,
  );

  return sessionId;
}
