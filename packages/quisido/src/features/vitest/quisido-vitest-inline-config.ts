// import type { WorkersUserConfig } from '@cloudflare/vitest-pool-workers/config';
import type { CoverageOptions, InlineConfig } from 'vitest/node';

// type CloudflareWorkersVitestInlineConfig = Exclude<
//   WorkersUserConfig<UserConfig>['test'],
//   undefined
// >;

export default interface QuisidoVitestInlineConfig
  // Omit<CloudflareWorkersVitestInlineConfig, 'coverage'>,
  extends Omit<InlineConfig, 'coverage' | 'pool'> {
  readonly coverage?: Omit<CoverageOptions<'istanbul'>, 'provider'> | undefined;
}
