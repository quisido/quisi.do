import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../modules/quisi/div.js';
import Section from '../modules/quisi/section.js';

/**
 * A "customer support" page is a feature of Stripe.
 * https://dashboard.stripe.com/settings/update/public/support-details
 */

export default function Support(): ReactElement {
  return (
    <Section header={<I18n>Support</I18n>}>
      <Div>
        If you have any questions or concerns, please feel free to text us at
        1-920-786-8379 or email us at
        <a href="mailto:support@quisi.do">support@quisi.do</a>. We are here to
        help you with any issues you may have.
      </Div>
    </Section>
  );
}
