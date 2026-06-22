import { type ReactElement } from 'react';
import {
  Heading,
  Main,
  Paragraph,
  Region,
} from '../design-systems/template/index.js';
import Page from './page.js';

export default function Home(): ReactElement {
  return (
    <Page>
      <Main>
        <Heading level={1}>quisi.do</Heading>
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
