import { type ComponentType, useMemo } from 'react';
import type { WithKey } from '../../../../types/with-key.js';
import { type Props as CardProps } from './components/card/index.js';

interface Props<Item extends object> {
  readonly CardContent: ComponentType<Item>;
  readonly CardFooter: ComponentType<Item> | undefined;
  readonly CardHeader: ComponentType<Item> | undefined;
  readonly cardKey: keyof Item;
  readonly items: readonly Item[];
}

interface State<Item extends object> {
  readonly cardProps: readonly WithKey<CardProps<Item>>[];
}

export default function useMuiCards<Item extends object>({
  CardContent,
  CardFooter,
  CardHeader,
  cardKey,
  items,
}: Readonly<Props<Item>>): State<Item> {
  return {
    cardProps: useMemo((): readonly WithKey<CardProps<Item>>[] => {
      const mapItemToCardProps = (
        item: Readonly<Item>,
      ): WithKey<CardProps<Item>> => ({
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
