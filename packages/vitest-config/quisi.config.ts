import { type BuildConfig, type TestConfig } from 'quisi';

export const BUILD: BuildConfig = {
  // @types/chai@5.0.1 is incompatible with @vitest/expect@3.0.4.
  skipLibCheck: true,
};

export const TEST: TestConfig = {
  // @types/chai@5.0.1 is incompatible with @vitest/expect@3.0.4.
  skipLibCheck: true,
};
