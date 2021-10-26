import Cards from '@awsui/components-react/cards';
import type { ReactElement } from 'react';
import ITEMS from './constants/quotes';
import CARD_DEFINITION from './constants/quotes-card-definition';

export default function QuoteCards(): ReactElement {
  return (
    <Cards cardDefinition={CARD_DEFINITION} items={ITEMS} trackBy="author" />
  );
}
