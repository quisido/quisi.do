import { type TraceParent } from '../modules/trace-parent/index.js';
import mapRequestHeadersToTraceParent from './map-request-headers-to-trace-parent.js';

export default function mapRequestToTraceParent(
  request: Request,
): TraceParent | null {
  return mapRequestHeadersToTraceParent(request.headers);
}
