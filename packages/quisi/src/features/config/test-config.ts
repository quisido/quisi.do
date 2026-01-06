import type Coverage from './coverage.js';

export default interface TestConfig {
  readonly coverage?: Coverage | undefined;
  readonly eslintConfigFile?: string | undefined;
  readonly skipLibCheck?: boolean | undefined;
}
