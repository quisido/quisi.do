import type QuisiVitestInlineConfig from './quisi-vitest-inline-config.js';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function definePool(): Promise<
  Pick<QuisiVitestInlineConfig, never /* 'pool' | 'poolOptions' */>
> {
  /**
   *   The Cloudflare Vitest pool workers extension is disabled until it
   * supports vitest@^4.
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
  */

  return {};
}
