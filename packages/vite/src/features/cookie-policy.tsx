import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import { Main, Paragraph, Region } from '../design-systems/template/index.js';
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
