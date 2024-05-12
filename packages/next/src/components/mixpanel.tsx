'use client';

import { type ReactElement } from 'react';
import '../modules/react-mixpanel/img.css';
import Mixpanel from '../modules/react-mixpanel/index.js';

// https://github.com/mixpanel/mixpanel-js/blob/master/doc/readme.io/javascript-full-api-reference.md#mixpanelset_config

interface Props {
  readonly token: string;
}

export default function MixpanelComponent({ token }: Props): ReactElement {
  return (
    <Mixpanel
      autotrack
      batch_requests={false}
      cookie_expiration={365}
      cross_site_cookie={false}
      cross_subdomain_cookie={false}
      debug={false}
      disable_cookie={false}
      disable_persistence={false}
      ignore_dnt
      img
      ip
      opt_out_persistence_by_default={false}
      opt_out_tracking_by_default={false}
      opt_out_tracking_persistence_type="localStorage"
      persistence="localStorage"
      save_referrer
      secure_cookie
      store_google
      token={token}
      track_pageview
      upgrade
      verbose
    />
  );
}
