import { TRACEPARENT } from '../constants/traceparent.js';
import { type TraceParentGroups } from '../types/trace-parent-groups.js';
import type TraceParent from '../types/trace-parent.js';
import parseTraceParentGroups from './parse-trace-parent-groups.js';

export default function parseTraceParent(traceParent: string): TraceParent {
  const result: RegExpExecArray | null = TRACEPARENT.exec(traceParent);
  if (result === null) {
    throw new Error('Invalid trace parent', {
      cause: traceParent,
    });
  }

  // `as TraceParentGroups` is tested in `constants/traceparent.test.ts`.
  return parseTraceParentGroups(result.groups as TraceParentGroups);
}
