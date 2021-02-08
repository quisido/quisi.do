import Cards, { CardsProps } from '@awsui/components-react/cards';
// import Header from '@awsui/components-react/header';
import { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import CARD_DEFINITION from './constants/card-definition';
import ITEMS from './constants/quotes';
import useQuotes from './quotes.hook';

const CARDS_PER_ROW: CardsProps.CardsLayout[] = [
  {
    cards: 3,
  },
];

export default function Quotes(): ReactElement {
  const { breadcrumbs } = useQuotes();

  return (
    <AppLayout breadcrumbs={breadcrumbs} toolsHide>
      <Cards
        cardDefinition={CARD_DEFINITION}
        cardsPerRow={CARDS_PER_ROW}
        // header={<Header>Quotes</Header>}
        items={ITEMS}
        trackBy="author"
      />
    </AppLayout>
  );
}
