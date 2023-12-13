import { type ReactElement } from 'react';
import Section from '../../../components/section';
import Div from '../../../components/div';
import Header from '../../../components/header';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params';

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
