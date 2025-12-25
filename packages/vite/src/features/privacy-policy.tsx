import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Div from '../modules/quisi/div.js';
import Link from '../modules/quisi/link.js';
import Section from '../modules/quisi/section.js';

/**
 *   Developing a comprehensive privacy policy for an application is essential.
 * This policy should clearly outline how user data is collected, used, stored,
 * and protected, as well as the rights of users regarding their personal
 * information. Having a well-defined privacy policy not only helps ensure
 * compliance with legal and regulatory requirements but also builds trust with
 * users by demonstrating your commitment to protecting their privacy.
 */

export default function PrivacyPolicy(): ReactElement {
  return (
    <Section header={<I18n>Privacy policy</I18n>}>
      <Div element="p" marginBottom="medium">
        quisi.do is a completely open source software-as-a-service provider. As
        such, it offers full transparency into its collection and use of your
        personal data.
      </Div>
      <Div element="p" marginBottom="medium">
        quisi.do does not sell your personal data and does not use your personal
        data for advertising or marketing purposes.
      </Div>
      <Div element="p" marginBottom="medium">
        For website traffic, quisi.do uses third-party monitoring services, such
        as Cloudflare Insights, Datadog RUM, Fullstory, and Google Analytics.
        This data is aggregated and dashboarded to transparently monitor the
        website&apos;s performance. These services use cookies, and cookie
        functionality will be documented in quisi.do&apos;s{' '}
        <Link
          feature="privacy"
          href="/cookies/"
          title="quisi.do cookie policy."
        >
          cookie policy
        </Link>
        .
      </Div>
      <Div element="p" marginBottom="medium">
        In order to support you, your services, and quisi.do&apos;s services,{' '}
        quisi.do may send your personal data to third parties, such as
        Cloudflare, Datadog, or Sentry.
      </Div>
    </Section>
  );
}
