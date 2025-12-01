import { type TraceFlag } from '../constants/trace-flag.js';
import isTraceFlag from './is-trace-flag.js';

export default function hasTraceFlag(flags: number, flag: TraceFlag): boolean {
  return isTraceFlag(flags & flag);
}
