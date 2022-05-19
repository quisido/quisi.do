import type { CardsProps } from '@awsui/components-react/cards';
import Cards from '@awsui/components-react/cards';
import type { ReactElement } from 'react';
import useAwsCards from './cards.aws.hook';
import type Props from './types/props';

const CARDS_LAYOUT: CardsProps.CardsLayout = {
  cards: 3,
};

const CARDS_PER_ROW: CardsProps.CardsLayout[] = [CARDS_LAYOUT];

export default function AwsCards<Item>({
  CardContent,
  CardFooter,
  CardHeader,
  header,
  items,
  loading,
}: Readonly<Props<Item>>): ReactElement {
  const { cardDefinition } = useAwsCards({
    CardContent,
    CardFooter,
    CardHeader,
  });

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
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
