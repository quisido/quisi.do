import createThrottler from '../utils/create-throttler.js';
import mapRequestToIp from '../utils/map-request-to-ip.js';

// TODO: Make this increase with each call.
const IP_THROTTLE_LIMIT = 10000; // once per 10s
const throttleIp = createThrottler();

export default function throttle(request: Request): void {
  const ip: string = mapRequestToIp(request);
  throttleIp(ip, IP_THROTTLE_LIMIT);
}
