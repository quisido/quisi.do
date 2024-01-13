import { type ReactElement } from 'react';
import Section from '../../../components/section.js';
import Div from '../../../components/div/index.js';
import Header from '../../../components/header/index.js';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params.js';

export default function CharitiesPage(): ReactElement {
  return (
    <Section header={<Header>Charities</Header>}>
      <Div element="p">
        quisi.do is in the process of defining charities. As this matter has
        legal, financial, and moral implications, the decisions will not be made
        lightly and will be posted after they are ready.
      </Div>
    </Section>
  );
}
