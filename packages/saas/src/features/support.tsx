import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Page from './page.js';
import { Link, Main, Region } from '../design-systems/template/index.js';

/**
 * A "customer support" page is a feature of Stripe.
 * https://dashboard.stripe.com/settings/update/public/support-details
 */

export default function Support(): ReactElement {
  return (
    <Page>
      <Main>
        <Region heading={<I18n>Support</I18n>}>
          If you have any questions or concerns, please feel free to text us at{' '}
          <Link href="sms:+19207868379">1-920-786-8379</Link> or email us at{' '}
          <Link href="mailto:support@quisi.do">support@quisi.do</Link>. We are
          here to help you with any issues you may have.
        </Region>
      </Main>
    </Page>
  );
}
