import { parse } from 'cookie';
import StatusCode from '../constants/status-code.js';
import assert from './assert.js';

export default function mapRequestToSessionId(request: Request): string {
  const cookies: string | null = request.headers.get('Cookie');

  assert(
    cookies !== null,
    'Expected cookies.',
    StatusCode.BadRequest,
    request.headers.entries(),
  );

  const cookiesRecord: Record<string, string> = parse(cookies);
  const sessionId: string | undefined = cookiesRecord['__Secure-Session-ID'];

  assert(
    typeof sessionId === 'string',
    'Expected a session ID.',
    StatusCode.BadRequest,
  );

  return sessionId;
}
