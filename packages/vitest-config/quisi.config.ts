import { type BuildConfig } from 'quisi';

export const BUILD: BuildConfig = {
  // @types/chai@5.0.1 is incompatible with @vitest/expect@3.0.4.
  skipLibCheck: true,
};
