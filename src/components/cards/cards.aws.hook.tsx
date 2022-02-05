import type { CardsProps } from '@awsui/components-react/cards';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import mapComponentToRenderer from '../../utils/map-component-to-renderer';

interface Props<Item> {
  readonly CardContent: ComponentType<Item> | undefined;
  readonly CardFooter: ComponentType<Item> | undefined;
  readonly CardHeader: ComponentType<Item> | undefined;
}

interface State<Item> {
  readonly cardDefinition: CardsProps.CardDefinition<Item>;
}

export default function useAwsCards<Item>({
  CardContent,
  CardFooter,
  CardHeader,
}: Readonly<Props<Item>>): State<Item> {
  return {
    cardDefinition: useMemo((): CardsProps.CardDefinition<Item> => {
      const sections: CardsProps.SectionDefinition<Item>[] = [
        {
          content: mapComponentToRenderer(CardContent),
          id: 'content',
        },
      ];

      if (filterByDefined(CardFooter)) {
        sections.push({
          content: mapComponentToRenderer(CardFooter),
          id: 'footer',
        });
      }

      return {
        header: mapComponentToRenderer(CardHeader),
        sections,
      };
    }, [CardContent, CardFooter, CardHeader]),
  };
}
