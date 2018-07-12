import {
  parseTraceParent,
  type TraceParent,
} from '../modules/trace-parent/index.js';

function mapTraceparentRequestHeaderToTraceParent(
  traceparent: string | null,
): TraceParent | null {
  if (traceparent === null) {
    return null;
  }

  return parseTraceParent(traceparent);
}

function mapRequestHeadersToTraceParent(headers: Headers): TraceParent | null {
  return mapTraceparentRequestHeaderToTraceParent(headers.get('traceparent'));
}

export default function mapRequestToTraceParent(
  request: Request,
): TraceParent | null {
  return mapRequestHeadersToTraceParent(request.headers);
}
