'use client';

import '../modules/react-mixpanel/img.css';
import useMixpanelModule from '../modules/react-mixpanel/index.js';

// https://github.com/mixpanel/mixpanel-js/blob/master/doc/readme.io/javascript-full-api-reference.md#mixpanelset_config

export default function useMixpanel(token: string): void {
  useMixpanelModule({
    autotrack: true,
    batch_requests: false,
    cookie_expiration: 365,
    cross_site_cookie: false,
    cross_subdomain_cookie: false,
    debug: false,
    disable_cookie: false,
    disable_persistence: false,
    ignore_dnt: true,
    img: true,
    ip: true,
    opt_out_persistence_by_default: false,
    opt_out_tracking_by_default: false,
    opt_out_tracking_persistence_type: 'localStorage',
    persistence: 'localStorage',
    save_referrer: true,
    secure_cookie: true,
    store_google: true,
    token,
    track_pageview: true,
    upgrade: true,
    verbose: true,
  });
}
