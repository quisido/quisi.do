import type { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import QuoteCards from '../../components/quote-cards';
import useQuotes from './quotes.hook';

export default function Quotes(): ReactElement {
  const { breadcrumbs } = useQuotes();

  return (
    <AppLayout breadcrumbs={breadcrumbs} toolsHide>
      <QuoteCards />
    </AppLayout>
  );
}
