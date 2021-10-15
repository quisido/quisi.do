import type { ReactElement } from 'react';
import Wrapper from '../../components/wrapper';
import usePublications from './publications.hook';
import Contents from './publications.suspense.contents';

export default function Publications(): ReactElement {
  const { breadcrumbs } = usePublications();

  return (
    <Wrapper breadcrumbs={breadcrumbs} toolsHide>
      <Contents />
    </Wrapper>
  );
}
