import { type ReactElement } from 'react';
import Container from '../../../components/container';
import Div from '../../../components/div';
import Header from '../../../components/header';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params';

export default function CharitiesPage(): ReactElement {
  return (
    <Container header={<Header>Charities</Header>}>
      <Div element="p">
        quisi.do is in the process of defining charities. As this matter has
        legal, financial, and moral implications, the decisions won't be made
        lightly and will be posted after they are ready.
      </Div>
    </Container>
  );
}
