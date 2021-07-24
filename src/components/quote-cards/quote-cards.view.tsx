import type { CardsProps } from '@awsui/components-react/cards';
import Cards from '@awsui/components-react/cards';
import type { ReactElement } from 'react';
import CARD_DEFINITION from '../../constants/quote-card-definition';
import ITEMS from '../../constants/quotes';

const CARDS_PER_ROW: CardsProps.CardsLayout[] = [
  {
    cards: 2,
  },
];

export default function QuoteCards(): ReactElement {
  return (
    <Cards
      cardDefinition={CARD_DEFINITION}
      cardsPerRow={CARDS_PER_ROW}
      items={ITEMS}
      trackBy="author"
    />
  );
}
