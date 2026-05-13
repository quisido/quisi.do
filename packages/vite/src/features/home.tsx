import { type ReactElement } from 'react';
import { Main, Paragraph, Region } from '../design-systems/template/index.js';
import Page from './page.js';

export default function Home(): ReactElement {
  return (
    <Page>
      <Main>
        <Region heading="About">
          <Paragraph>
            quisi.do is an invite-only, software-as-a-service provider for front
            end platforms.
          </Paragraph>
        </Region>
      </Main>
    </Page>
  );
}
