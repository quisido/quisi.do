import { type CardsProps } from '@cloudscape-design/components/cards';
import { type ComponentType, useMemo } from 'react';
import mapComponentToRenderer from '../../../../utils/map-component-to-renderer';

interface Props<Item> {
  readonly CardContent: ComponentType<Item> | undefined;
  readonly CardFooter: ComponentType<Item> | undefined;
  readonly CardHeader: ComponentType<Item> | undefined;
}

interface State<Item> {
  readonly cardDefinition: CardsProps.CardDefinition<Item>;
}

export default function useCloudscapeDesignCards<Item extends object>({
  CardContent,
  CardFooter,
  CardHeader,
}: Readonly<Props<Item>>): State<Item> {
  return {
    cardDefinition: useMemo((): CardsProps.CardDefinition<Item> => {
      const contentSection: CardsProps.SectionDefinition<Item> = {
        id: 'content',
      };

      if (typeof CardContent !== 'undefined') {
        contentSection.content = mapComponentToRenderer(CardContent);
      }

      const sections: CardsProps.SectionDefinition<Item>[] = [contentSection];
      if (typeof CardFooter !== 'undefined') {
        sections.push({
          content: mapComponentToRenderer(CardFooter),
          id: 'footer',
        });
      }

      const cardDefinition: CardsProps.CardDefinition<Item> = {
        sections,
      };

      if (typeof CardHeader !== 'undefined') {
        cardDefinition.header = mapComponentToRenderer(CardHeader);
      }

      return cardDefinition;
    }, [CardContent, CardFooter, CardHeader]),
  };
}
