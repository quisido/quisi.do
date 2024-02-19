import type { ReactElement } from 'react';
import Div from '../components/div/index.js';
import Header from '../components/header/index.js';
import Link from '../components/link/index.js';
import Section from '../components/section.js';
import styles from './privacy-policy.module.scss';

export default function PrivacyPolicy(): ReactElement {
  return (
    <Section header={<Header>Privacy Policy</Header>}>
      <Div element="p">
        <span className={styles['name']}>quisi.do</span> is a completely open
        source software-as-a-service provider. As such, it offers full
        transparency into its collection and use of your personal data.
      </Div>
      <Div element="p">
        <span className={styles['name']}>quisi.do</span> does not sell your
        personal data and does not use your personal data for advertising or
        marketing purposes.
      </Div>
      <Div element="p">
        For website traffic, <span className={styles['name']}>quisi.do</span>{' '}
        uses third-party monitoring services, such as Amazon CloudWatch RUM,
        Cloudflare Insights, Datadog RUM, Fullstory, and Google Analytics. This
        data is aggregated and{' '}
        <Link
          feature="privacy-policy"
          href="/dashboard/"
          title="quisi.do dashboard"
        >
          dashboarded
        </Link>{' '}
        to transparently monitor the website&apos;s performance. These services
        use cookies, and cookie functionality will be documented in{' '}
        <span className={styles['name']}>quisi.do</span>&apos;s{' '}
        <Link
          feature="privacy"
          href="/cookies/"
          title="quisi.do cookie policy."
        >
          cookie policy
        </Link>
        .
      </Div>
      <Div element="p">
        In order to support you, your services, and{' '}
        <span className={styles['name']}>quisi.do</span>&apos;s services,{' '}
        <span className={styles['name']}>quisi.do</span> may send your personal
        data to third parties, such as Cloudflare, Datadog, or Sentry.
      </Div>
    </Section>
  );
}
