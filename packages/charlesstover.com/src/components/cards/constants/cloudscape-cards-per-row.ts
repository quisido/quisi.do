import type { CardsProps } from '@cloudscape-design/components/cards';

// See also: ./aws-cards-per-row.ts
const CLOUDSCAPE_CARDS_PER_ROW: CardsProps.CardsLayout[] = [
  {
    cards: 3,
    minWidth: 1024,
  },
  {
    cards: 2,
    minWidth: 640,
  },
  {
    cards: 1,
    minWidth: 0,
  },
];

export default CLOUDSCAPE_CARDS_PER_ROW;
