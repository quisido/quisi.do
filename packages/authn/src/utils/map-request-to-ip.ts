import mapRequestHeadersToIp from './map-request-headers-to-ip.js';

export default function mapRequestToIp(request: Request): string {
  return mapRequestHeadersToIp(request.headers);
}
