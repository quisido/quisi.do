import type { ReactElement } from 'react';
import Cards from '../../components/cards';
import CardContent from './components/card-content';
import CardHeader from './components/card-header';
import ITEMS from './constants/quotes';

export default function Quotes(): ReactElement {
  return (
    <Cards
      CardContent={CardContent}
      CardHeader={CardHeader}
      cardKey="author"
      items={ITEMS}
    />
  );
}
