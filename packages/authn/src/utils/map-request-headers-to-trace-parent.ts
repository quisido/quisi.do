import type { TraceParent } from '../modules/trace-parent/index.js';
import mapTraceparentRequestHeaderToTraceParent from './map-traceparent-request-header-to-trace-parent.js';

export default function mapRequestHeadersToTraceParent(
  headers: Headers,
): TraceParent | null {
  const header: string | null = headers.get('traceparent');
  return mapTraceparentRequestHeaderToTraceParent(header);
}
