import { parse } from 'cookie';
import StatusCode from '../constants/status-code.js';
import assert from './assert.js';

export default function mapHeadersToCookies(
  headers: Headers,
): Partial<Record<string, string>> {
  const cookies: string | null = headers.get('Cookie');

  assert(
    cookies !== null,
    'Expected cookies.',
    StatusCode.BadRequest,
    headers.entries(),
  );

  return parse(cookies);
}
