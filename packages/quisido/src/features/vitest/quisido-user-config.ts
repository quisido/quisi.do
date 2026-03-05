import type { ViteUserConfig } from 'vitest/config';
import type QuisidoVitestInlineConfig from './quisido-vitest-inline-config.js';

export default interface QuisidoUserConfig extends Omit<
  ViteUserConfig,
  'test'
> {
  readonly test?: QuisidoVitestInlineConfig | undefined;
}
