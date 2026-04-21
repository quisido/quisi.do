import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Region from '../design-systems/template/region.js';
import Page from './page.jsx';

/**
 * A "customer support" page is a feature of Stripe.
 * https://dashboard.stripe.com/settings/update/public/support-details
 */

export default function Support(): ReactElement {
  return (
    <Page>
      <Region heading={<I18n>Support</I18n>}>
        If you have any questions or concerns, please feel free to text us at
        1-920-786-8379 or email us at
        <a href="mailto:support@quisi.do">support@quisi.do</a>. We are here to
        help you with any issues you may have.
      </Region>
    </Page>
  );
}
