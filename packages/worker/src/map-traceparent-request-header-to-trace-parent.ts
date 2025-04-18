import {
  parseTraceParent,
  type TraceParent,
} from './modules/trace-parent/index.js';

export default function mapTraceparentRequestHeaderToTraceParent(
  traceparent: string | null,
): TraceParent | null {
  if (traceparent === null) {
    return null;
  }

  try {
    return parseTraceParent(traceparent);
  } catch (_err: unknown) {
    return null;
  }
}
