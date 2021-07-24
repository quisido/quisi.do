import type { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import useQuotes from './quotes.hook';
import Contents from './quotes.suspense.contents';

export default function Quotes(): ReactElement {
  const { breadcrumbs } = useQuotes();

  return (
    <AppLayout breadcrumbs={breadcrumbs} toolsHide>
      <Contents />
    </AppLayout>
  );
}
