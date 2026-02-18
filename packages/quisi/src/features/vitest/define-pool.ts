import debug from '../../utils/debug.js';
import hasPackageFile from '../../utils/has-package-file.js';
import joinCwdPath from '../../utils/join-path.js';
import type QuisiVitestInlineConfig from './quisi-vitest-inline-config.js';

export default async function definePool(): Promise<
  Pick<QuisiVitestInlineConfig, 'pool' | 'poolOptions'>
> {
  const hasWrangler: boolean = await hasPackageFile('wrangler.jsonc');

  if (hasWrangler) {
    debug('Using Cloudflare Workers pool.');
    return {
      pool: '@cloudflare/vitest-pool-workers',
      poolOptions: {
        workers: {
          wrangler: {
            configPath: joinCwdPath('wrangler.jsonc'),
          },
        },
      },
    };
  }

  return {};
}
