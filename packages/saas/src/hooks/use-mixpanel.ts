import '../modules/react-mixpanel/img.css';
import useMixpanelModule, { type Config } from '../modules/react-mixpanel/index.js';

/**
 * @see https://github.com/mixpanel/mixpanel-js/blob/master/doc/readme.io/javascript-full-api-reference.md#mixpanelset_config
 */
const CONFIG: Partial<Config> = {
  autotrack: true,
  cross_site_cookie: false,
  cross_subdomain_cookie: false,
  disable_cookie: false,
  ignore_dnt: true,
  img: true,
  ip: true,
  persistence: 'localStorage',
  save_referrer: true,
  secure_cookie: true,
  store_google: true,
  track_pageview: true,
  upgrade: true,
  verbose: true,
};

export default function useMixpanel(token: string): void {
  useMixpanelModule({
    ...CONFIG,
    token,
  }
  );
}
