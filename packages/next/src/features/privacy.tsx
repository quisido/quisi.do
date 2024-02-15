import type { ReactElement } from 'react';
import Div from '../components/div/index.js';
import Header from '../components/header/index.js';
import Section from '../components/section.js';
import styles from './privacy/privacy.module.scss';

export default function PrivacyFeature(): ReactElement {
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
      <Div>
        In order to support you, your services, and{' '}
        <span className={styles['name']}>quisi.do</span>&apos;s services,
        <span className={styles['name']}>quisi.do</span> may send your personal
        data to third parties, such as Cloudflare, Datadog, or Sentry.
      </Div>
    </Section>
  );
}
