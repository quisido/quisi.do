import Badge from '@awsui/components-react/badge';
import Box from '@awsui/components-react/box';
import { CardsProps } from '@awsui/components-react/cards';
import ColumnLayout from '@awsui/components-react/column-layout';
import Link from '@awsui/components-react/link';
import Popover from '@awsui/components-react/popover';
import StatusIndicator from '@awsui/components-react/status-indicator';
import NumberFormat from 'number-format-react';
import { ReactElement } from 'react';
import Minutes from '../components/minutes';
import Item from '../types/item';
import mapTimeToDaysAgo from '../utils/map-time-to-days-ago';
import styles from './card-definition.module.scss';

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
      content({
        dateTime,
        image,
        reactions,
        readingTime,
        title,
        url,
        views,
      }: Item): ReactElement {
        const date: Date = new Date(dateTime);
        return (
          <Box className={styles.banner} textAlign="center">
            <Link href={url}>
              {image ? (
                <img alt={title} src={image} width={320} />
              ) : (
                <StatusIndicator iconAriaLabel="Warning" type="warning">
                  Missing image
                </StatusIndicator>
              )}
            </Link>
            <Badge className={styles.views}>
              <Popover className={styles.popover} content="Views" size="small">
                👁‍🗨 <NumberFormat>{views}</NumberFormat>
              </Popover>
            </Badge>
            <Badge className={styles.reactions}>
              <Popover
                className={styles.popover}
                content="Reactions"
                size="small"
              >
                👏 <NumberFormat>{reactions}</NumberFormat>
              </Popover>
            </Badge>
            <Badge className={styles.dateTime}>
              <Popover
                className={styles.popover}
                content="Published date"
                size="small"
              >
                📅 {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
              </Popover>
            </Badge>
            {readingTime && (
              <Badge className={styles.readingTime}>
                <Popover
                  className={styles.popover}
                  content="Reading time"
                  size="small"
                >
                  ⏳<Minutes>{readingTime}</Minutes>
                </Popover>
              </Badge>
            )}
          </Box>
        );
      },
    },
    {
      id: 'stats',
      // header: 'Statistics',
      content({ dateTime, reactions, views }: Item): ReactElement {
        return (
          <ColumnLayout columns={12}>
            <div>
              <Box color="text-label" fontSize="heading-s">
                Reactions/day
              </Box>
              {Math.round((reactions / mapTimeToDaysAgo(dateTime)) * 100) / 100}
            </div>
            <div>
              <Box color="text-label" fontSize="heading-s">
                Reactions/view
              </Box>
              {Math.round((reactions / views) * 10000) / 100}%
            </div>
            <div>
              <Box color="text-label" fontSize="heading-s">
                Views/day
              </Box>
              {Math.round((views / mapTimeToDaysAgo(dateTime)) * 100) / 100}
            </div>
          </ColumnLayout>
        );
      },
    },
  ],
};

export default CARD_DEFINITION;
