import { type ReactElement } from 'react';
import { Main, Paragraph, Region } from '../components/design-system.js';
import I18n from '../components/i18n.js';
import Page from './page.js';

export default function CookiePolicy(): ReactElement {
  return (
    <Page>
      <Main>
        <Region heading={<I18n>Cookie policy</I18n>}>
          <Paragraph>
            quisi.do&apos;s cookie policy will be documented after its services
            are finalized.
          </Paragraph>
        </Region>
      </Main>
    </Page>
  );
}
