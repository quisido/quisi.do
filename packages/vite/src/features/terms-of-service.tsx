import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../modules/quisi/div.js';
import Section from '../modules/quisi/section.js';

const LAST_UPDATED: Date = new Date('2024-03-21');

export default function TermsOfService(): ReactElement {
  return (
    <Section header={<I18n>Terms of service</I18n>}>
      <Div marginBottom="medium">
        Last updated {LAST_UPDATED.toLocaleDateString()}
      </Div>
      <Div element="p" marginBottom="medium">
        These terms of service may change at any time.
      </Div>
      <Div element="p" marginBottom="medium">
        By using this website, you agree to be bound by these terms of service.
        If you do not agree to be bound by these terms of service, you should
        not use this website.
      </Div>
      <Div element="p" marginBottom="medium">
        You agree to use this website in accordance with all applicable laws and
        regulations. You agree not to use this website for any illegal or
        unauthorized purpose. You agree not to use this website to engage in any
        activity that is harmful to others. You agree not to use this website to
        violate any intellectual property rights of others. You agree not to use
        this website to violate any privacy rights of others. You agree not to
        use this website to violate any other law or regulation.
      </Div>
      <Div element="p" marginBottom="medium">
        You agree not to use this website to collect or store personal
        information about others without their consent. You agree not to use
        this website to send or receive any spam or other unsolicited commercial
        email.
      </Div>
      <Div element="p" marginBottom="medium">
        If any provision of these terms of service is held to be invalid or
        unenforceable, such provision will be struck from these terms of service
        and the remaining provisions will remain in full force and effect.
      </Div>
    </Section>
  );
}
