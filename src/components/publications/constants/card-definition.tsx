import Box from '@awsui/components-react/box';
import { CardsProps } from '@awsui/components-react/cards';
import ColumnLayout from '@awsui/components-react/column-layout';
import Link from '@awsui/components-react/link';
import StatusIndicator from '@awsui/components-react/status-indicator';
import NumberFormat from 'number-format-react';
import { ReactElement } from 'react';
import Item from '../types/item';

const CARD_DEFINITION: CardsProps<Item>['cardDefinition'] = {
  header({ title, url }: Item): ReactElement {
    return (
      <Link href={url}>
        <Box color="inherit" fontSize="heading-m">
          {title}
        </Box>
      </Link>
    );
  },
  sections: [
    {
      id: 'image',
      content({ image, title, url }: Item): ReactElement {
        if (typeof image === 'undefined') {
          return (
            <StatusIndicator iconAriaLabel="Warning" type="warning">
              Missing image
            </StatusIndicator>
          );
        }
        return (
          <Box textAlign="center">
            <Link href={url}>
              <img alt={title} src={image} width={320} />
            </Link>
          </Box>
        );
      },
    },
    {
      id: 'dateTime',
      header: 'Published on',
      content({ dateTime }: Item): string {
        return new Date(dateTime).toLocaleString();
      },
    },
    {
      id: 'readingTime',
      header: 'Reading time',
      content({ readingTime }: Item): string {
        switch (readingTime) {
          case 1:
            return '1 minute';
          default:
            return `${readingTime} minutes`;
        }
      },
    },
    {
      id: 'readingTime-reactions-views',
      // header: 'Statistics',
      content({ reactions, views }: Item): ReactElement {
        return (
          <ColumnLayout columns={6} variant="text-grid">
            <div>
              <Box color="text-label" fontSize="heading-xs">
                Views
              </Box>
              <NumberFormat>{views}</NumberFormat> 👁‍🗨
            </div>
            <div>
              <Box color="text-label" fontSize="heading-xs">
                Reactions
              </Box>
              <NumberFormat>{reactions}</NumberFormat> 👏
            </div>
          </ColumnLayout>
        );
      },
    },
  ],
};

export default CARD_DEFINITION;
