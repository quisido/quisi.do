import StatusCode from '../constants/status-code.js';
import assert from './assert.js';

export default function mapRequestHeadersToIp(headers: Headers): string {
  const cfConnectingIp: string | null = headers.get('CF-Connecting-IP');

  assert(
    cfConnectingIp !== null,
    'Expected a Cloudflare connecting IP.',
    StatusCode.BadRequest,
  );

  return cfConnectingIp;
}
