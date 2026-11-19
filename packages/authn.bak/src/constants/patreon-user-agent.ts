import { version as wranglerVersion } from 'wrangler/package.json';

export const PATREON_USER_AGENT: string = `quisi.do, platform cloudflare-${wranglerVersion}`;
