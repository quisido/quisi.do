import { type ReactElement } from 'react';
import { Paragraph, Region } from '../design-systems/template/index.js';
import Page from './page.jsx';

export default function Home(): ReactElement {
  return (
    <Page>
      <Region heading="About">
        <Paragraph>
          quisi.do is an invite-only, software-as-a-service provider for front
          end platforms.
        </Paragraph>
      </Region>
    </Page>
  );
}
