import { type ReactElement } from 'react';

import { Main, Paragraph, Region } from '../components/design-system.js';
import I18n from '../components/i18n.js';
import Page from './page.js';

export default function DataRetentionPolicy(): ReactElement {
  return (
    <Page>
      <Main>
        <Region heading={<I18n>Data Retention &amp; Disposal Policy</I18n>}>
          <Paragraph>
            quisi.do retains user data only as long as necessary to provide its
            services. When user data is no longer needed, quisi.do securely
            disposes of it in accordance with industry best practices.
          </Paragraph>
        </Region>
      </Main>
    </Page>
  );
}
