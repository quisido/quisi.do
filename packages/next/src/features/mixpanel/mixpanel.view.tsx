'use client';

import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';

const TOKEN = 'fc99e9cddffa038e5304528dd3e13048';

export default function Mixpanel(): null {
  useEffect((): VoidFunction => {
    mixpanel.init(TOKEN, {
      // https://github.com/mixpanel/mixpanel-js/blob/master/doc/readme.io/javascript-full-api-reference.md#mixpanelset_config
      autotrack: true,
      batch_requests: false,
      cookie_expiration: 365,
      cross_site_cookie: false,
      cross_subdomain_cookie: false,
      debug: true,
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
      track_pageview: true,
      upgrade: true,
      verbose: true,
    });

    return (): void => {
      mixpanel.reset();
    };
  }, []);

  return null;
}
