import { type ReactElement } from 'react';
import Div from '../../../modules/quisi/div.jsx';
import Header from '../../../modules/quisi/header.jsx';
import Section from '../../../modules/quisi/section.jsx';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params.js';

export default function CharitiesPage(): ReactElement {
  return (
    <Section header={<Header>Charities</Header>}>
      <Div element="p">
        quisi.do is in the process of defining charities. As this matter has
        legal, financial, and moral implications, the decisions will not be made
        lightly and will be posted after they are ready.
      </Div>
      <Div element="p">
        When we take care of nature, nature takes care of us.
      </Div>
    </Section>
  );
}
