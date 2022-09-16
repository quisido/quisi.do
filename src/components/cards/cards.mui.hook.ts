import type { Attributes, ComponentType } from 'react';
import { useMemo } from 'react';
import type CardProps from './types/mui-card-props';

interface Props<Item extends Record<string, unknown>> {
  readonly CardContent: ComponentType<Item>;
  readonly CardFooter: ComponentType<Item> | undefined;
  readonly CardHeader: ComponentType<Item> | undefined;
  readonly cardKey: keyof Item;
  readonly items: readonly Item[];
}

interface State<Item extends Record<string, unknown>> {
  readonly cardProps: readonly (CardProps<Item> & Required<Attributes>)[];
}

export default function useMuiCards<Item extends Record<string, unknown>>({
  CardContent,
  CardFooter,
  CardHeader,
  cardKey,
  items,
}: Readonly<Props<Item>>): State<Item> {
  return {
    cardProps: useMemo((): readonly (CardProps<Item> &
      Required<Attributes>)[] => {
      const mapItemToCardProps = (
        item: Readonly<Item>,
      ): CardProps<Item> & Required<Attributes> => ({
        Content: CardContent,
        Footer: CardFooter,
        Header: CardHeader,
        item,
        key: JSON.stringify(item[cardKey]),
      });

      return items.map(mapItemToCardProps);
    }, [CardContent, CardFooter, CardHeader, cardKey, items]),
  };
}
