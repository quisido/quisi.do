import { type CardsProps } from '@cloudscape-design/components/cards';

// See also: arc/aws-design-system/components/cards/constants/cards-per-row.ts
const CARDS_PER_ROW: CardsProps.CardsLayout[] = [
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

export default CARDS_PER_ROW;
