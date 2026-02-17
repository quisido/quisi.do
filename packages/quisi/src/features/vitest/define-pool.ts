import hasPackageFile from '../../utils/has-package-file.js';
import type QuisiVitestInlineConfig from './quisi-vitest-inline-config.js';

export default async function definePool(): Promise<
  Pick<QuisiVitestInlineConfig, 'pool' | 'poolOptions'>
> {
  const hasWrangler: boolean = await hasPackageFile('wrangler.jsonc');

  if (hasWrangler) {
    return {
      pool: '@cloudflare/vitest-pool-workers',
      poolOptions: {
        workers: {
          wrangler: {
            configPath: './wrangler.jsonc',
          },
        },
      },
    };
  }

  return {};
}
