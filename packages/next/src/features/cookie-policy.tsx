import type { ReactElement } from 'react';
import Div from '../components/div/index.js';
import Header from '../components/header/index.js';
import Section from '../components/section.js';
import styles from './cookie-policy.module.scss';

export default function CookiePolicy(): ReactElement {
  return (
    <Section header={<Header>Cookie Policy</Header>}>
      <Div element="p">
        <span className={styles['name']}>quisi.do</span>&apos;s cookie policy
        will be documented after its services are finalized.
      </Div>
    </Section>
  );
}
