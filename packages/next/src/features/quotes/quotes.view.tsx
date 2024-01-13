'use client'; // lazy-i18n

import { type ReactElement } from 'react';
import Cards from '../../components/cards.js';
import CardContent from './components/card-content.js';
import CardHeader from './components/card-header.js';
import ITEMS from './constants/quotes.js';

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
