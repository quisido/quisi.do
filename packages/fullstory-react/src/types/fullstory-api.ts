import type { anonymize, identify, init, shutdown } from '@fullstory/browser';

export default interface FullStoryAPI {
  readonly anonymize: typeof anonymize;
  readonly identify: typeof identify;
  readonly init: typeof init;
  readonly shutdown: typeof shutdown;
}
