import type Cause from '../types/cause.js';

// TODO: Create `mapCodeToMessage` to generate human-readable error messages.
export default function mapCauseToError(cause: Cause): Error {
  return new Error(`Code #${cause.code}`, { cause });
}
