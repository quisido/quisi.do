import { version as patreonVersion } from 'patreon/package.json';
import { version as wranglerVersion } from 'wrangler/package.json';

const PATREON_USER_AGENT = `Patreon-JS, version ${patreonVersion}, platform cloudflare-${wranglerVersion}`;

export default PATREON_USER_AGENT;
