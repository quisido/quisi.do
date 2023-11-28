import { type CardsProps } from '@awsui/components-react/cards';

// See also:
//   src/components/cloudscape-design-system/cards/constants/cards-per-row.ts
const AWS_CARDS_PER_ROW: CardsProps.CardsLayout[] = [
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

export default AWS_CARDS_PER_ROW;
