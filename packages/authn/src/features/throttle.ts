import StatusCode from '../constants/status-code.js';
import createThrottler from '../utils/create-throttler.js';

// TODO: Make this increase with each call.
const IP_THROTTLE_LIMIT = 10000; // once per 10s
const throttleIp = createThrottler();

export default function throttle(
  request: Request,
  assert: (
    assertion: boolean,
    message: string,
    status: StatusCode,
    data?: unknown,
  ) => asserts assertion,
): void {
  const ip: string | null = request.headers.get('CF-Connecting-IP');

  assert(
    ip !== null,
    'Expected a Cloudflare connecting IP.',
    StatusCode.BadRequest,
  );

  throttleIp(
    ip,
    IP_THROTTLE_LIMIT,
    assert, // <-- Code smell 🦨
  );
}
