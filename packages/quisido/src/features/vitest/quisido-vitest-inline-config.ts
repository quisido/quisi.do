import type { InlineConfig } from 'vitest/node';
import type { QuisidoCoverageOptions } from './define-coverage-options.js';

export default interface QuisidoVitestInlineConfig
  extends Omit<InlineConfig, 'coverage'> {
  readonly coverage?: QuisidoCoverageOptions | undefined;
}
