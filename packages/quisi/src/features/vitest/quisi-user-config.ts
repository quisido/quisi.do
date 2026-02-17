import type { ViteUserConfig } from 'vitest/config';
import type QuisiVitestInlineConfig from './quisi-vitest-inline-config.js';

export default interface QuisiUserConfig extends Omit<ViteUserConfig, 'test'> {
  readonly test?: QuisiVitestInlineConfig | undefined;
}
