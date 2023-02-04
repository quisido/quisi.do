import type { CardsProps } from '@cloudscape-design/components/cards';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import findDefined from '../../utils/find-defined';
import mapComponentToRenderer from '../../utils/map-component-to-renderer';

interface Props<Item> {
  readonly CardContent: ComponentType<Item> | undefined;
  readonly CardFooter: ComponentType<Item> | undefined;
  readonly CardHeader: ComponentType<Item> | undefined;
}

interface State<Item> {
  readonly cardDefinition: CardsProps.CardDefinition<Item>;
}

export default function useCloudscapeCards<
  Item extends Record<string, unknown>,
>({ CardContent, CardFooter, CardHeader }: Readonly<Props<Item>>): State<Item> {
  return {
    cardDefinition: useMemo((): CardsProps.CardDefinition<Item> => {
      const sections: CardsProps.SectionDefinition<Item>[] = [
        {
          content: mapComponentToRenderer(CardContent),
          id: 'content',
        },
      ];

      if (findDefined(CardFooter)) {
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
