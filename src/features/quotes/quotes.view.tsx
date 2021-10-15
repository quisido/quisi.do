import type { ReactElement } from 'react';
import Wrapper from '../../components/wrapper';
import useQuotes from './quotes.hook';
import Contents from './quotes.suspense.contents';

export default function Quotes(): ReactElement {
  const { breadcrumbs } = useQuotes();

  return (
    <Wrapper breadcrumbs={breadcrumbs} toolsHide>
      <Contents />
    </Wrapper>
  );
}
