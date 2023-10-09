import Cards, { type CardsProps } from '@awsui/components-react/cards';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/cards';
import useCards from './cards.hook';
import CARDS_PER_ROW from './constants/cards-per-row';

export default function AwsuiCards<Item extends object>({
  CardContent,
  CardFooter,
  CardHeader,
  header,
  items,
  loading,
}: Readonly<Props<Item>>): ReactElement {
  const { cardDefinition } = useCards({
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
