import type { Config } from 'quisi';

const CONFIG: Config = {
  // @types/chai@5.0.1 is incompatible with @vitest/expect@3.0.4.
  skipLibCheck: true,
};

export default CONFIG;
