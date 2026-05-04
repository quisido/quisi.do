import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import { Paragraph, Region } from '../design-systems/template/index.js';
import Page from './page.js';

const LAST_UPDATED: Date = new Date('2024-03-21');

export default function TermsOfService(): ReactElement {
  return (
    <Page>
      <Region heading={<I18n>Terms of service</I18n>}>
        <Paragraph>Last updated {LAST_UPDATED.toLocaleDateString()}</Paragraph>
        <Paragraph>These terms of service may change at any time.</Paragraph>
        <Paragraph>
          By using this website, you agree to be bound by these terms of
          service. If you do not agree to be bound by these terms of service,
          you should not use this website.
        </Paragraph>
        <Paragraph>
          You agree to use this website in accordance with all applicable laws
          and regulations. You agree not to use this website for any illegal or
          unauthorized purpose. You agree not to use this website to engage in
          any activity that is harmful to others. You agree not to use this
          website to violate any intellectual property rights of others. You
          agree not to use this website to violate any privacy rights of others.
          You agree not to use this website to violate any other law or
          regulation.
        </Paragraph>
        <Paragraph>
          You agree not to use this website to collect or store personal
          information about others without their consent. You agree not to use
          this website to send or receive any spam or other unsolicited
          commercial email.
        </Paragraph>
        <Paragraph>
          If any provision of these terms of service is held to be invalid or
          unenforceable, such provision will be struck from these terms of
          service and the remaining provisions will remain in full force and
          effect.
        </Paragraph>
      </Region>
    </Page>
  );
}
