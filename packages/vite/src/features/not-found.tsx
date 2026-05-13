import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import { Main, Paragraph, Region } from '../design-systems/template/index.js';
import Page from './page.js';

export default function NotFound(): ReactElement {
  return (
    <Page>
      <Main>
        <Region heading={<I18n>Not Found</I18n>}>
          <Paragraph>HTTP status code 404</Paragraph>
        </Region>
      </Main>
    </Page>
  );
}
