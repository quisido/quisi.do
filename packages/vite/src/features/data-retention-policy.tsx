import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import { Paragraph, Region } from '../design-systems/template/index.js';
import Page from './page.js';

export default function DataRetentionPolicy(): ReactElement {
  return (
    <Page>
      <Region heading={<I18n>Data Retention &amp; Disposal Policy</I18n>}>
        <Paragraph>
          quisi.do retains user data only as long as necessary to provide its
          services. When user data is no longer needed, quisi.do securely
          disposes of it in accordance with industry best practices.
        </Paragraph>
      </Region>
    </Page>
  );
}
