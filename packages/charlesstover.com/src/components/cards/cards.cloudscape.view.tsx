import type { CardsProps } from '@cloudscape-design/components/cards';
import Cards from '@cloudscape-design/components/cards';
import type { ReactElement } from 'react';
import useCloudscapeCards from './cards.cloudscape.hook';
import type Props from './types/props';

const CARDS_LAYOUT: CardsProps.CardsLayout = {
  cards: 3,
};

const CARDS_PER_ROW: CardsProps.CardsLayout[] = [CARDS_LAYOUT];

export default function CloudscapeCards<Item extends Record<string, unknown>>({
  CardContent,
  CardFooter,
  CardHeader,
  header,
  items,
  loading,
}: Readonly<Props<Item>>): ReactElement {
  const { cardDefinition } = useCloudscapeCards({
    CardContent,
    CardFooter,
    CardHeader,
  });

  // Workaround until Cloudscape supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalCardsProps: Pick<CardsProps, 'loading' | 'loadingText'> = {};
  if (typeof loading === 'string') {
    optionalCardsProps.loading = true;
    optionalCardsProps.loadingText = loading;
  } else {
    optionalCardsProps.loading = false;
  }

  return (
    <Cards
      cardDefinition={cardDefinition}
      cardsPerRow={CARDS_PER_ROW}
      header={header}
      items={items}
      {...optionalCardsProps}
    />
  );
}
