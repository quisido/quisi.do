import { TraceFlag } from "../constants/trace-flag.js";

const TRACE_FLAGS: ReadonlySet<unknown> =
  new Set<unknown>(Object.values(TraceFlag));

export default function isTraceFlag(value: unknown): boolean {
  return TRACE_FLAGS.has(value);
}
