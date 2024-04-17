import { version as wranglerVersion } from 'wrangler/package.json';

const PATREON_USER_AGENT = `quisi.do, platform cloudflare-${wranglerVersion}`;

export default PATREON_USER_AGENT;
