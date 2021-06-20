import Badge from '@awsui/components-react/badge';
import Box from '@awsui/components-react/box';
import { CardsProps } from '@awsui/components-react/cards';
import ColumnLayout from '@awsui/components-react/column-layout';
import Link from '@awsui/components-react/link';
import Popover from '@awsui/components-react/popover';
import StatusIndicator from '@awsui/components-react/status-indicator';
import I18n from 'lazy-i18n';
import NumberFormat from 'number-format-react';
import { ReactElement } from 'react';
import Minutes from '../components/minutes';
import mapTimeToDaysAgo from '../map/map-time-to-days-ago';
import PublicationCardItem from '../types/publication-card-item';
import styles from './publication-card-definition.module.scss';

const PUBLICATION_CARD_DEFINITION: CardsProps<PublicationCardItem>['cardDefinition'] =
  {
    header({ title, url }: PublicationCardItem): ReactElement {
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
        }: PublicationCardItem): ReactElement {
          const date: Date = new Date(dateTime);
          return (
            <div className={styles.bannerHeight}>
              <div className={styles.bannerWidth}>
                <Link href={url}>
                  {image ? (
                    <img
                      alt={title}
                      className={styles.image}
                      src={image}
                      width={320}
                    />
                  ) : (
                    <StatusIndicator iconAriaLabel="Warning" type="warning">
                      {/* No translation needed. Only I should see this banner. */}
                      Missing image
                    </StatusIndicator>
                  )}
                </Link>
                <Badge className={styles.views}>
                  <Popover
                    className={styles.popover}
                    content={<I18n>Views</I18n>}
                    size="small"
                  >
                    👁‍🗨 <NumberFormat>{views}</NumberFormat>
                  </Popover>
                </Badge>
                <Badge className={styles.reactions}>
                  <Popover
                    className={styles.popover}
                    content={<I18n>Reactions</I18n>}
                    size="small"
                  >
                    <NumberFormat>{reactions}</NumberFormat> 👏
                  </Popover>
                </Badge>
                <Badge className={styles.dateTime}>
                  <Popover
                    className={styles.popover}
                    content={<I18n>Publication date</I18n>}
                    size="small"
                  >
                    📅 {date.getFullYear()}-{date.getMonth() + 1}-
                    {date.getDate()}
                  </Popover>
                </Badge>
                {readingTime && (
                  <Badge className={styles.readingTime}>
                    <Popover
                      className={styles.popover}
                      content={<I18n>Reading time</I18n>}
                      size="small"
                    >
                      <Minutes>{readingTime}</Minutes> ⏳
                    </Popover>
                  </Badge>
                )}
              </div>
            </div>
          );
        },
      },
      {
        id: 'stats',
        // header: 'Statistics',
        content({
          dateTime,
          reactions,
          views,
        }: PublicationCardItem): ReactElement {
          return (
            <ColumnLayout className={styles.columnLayout} columns={12}>
              <div>
                <Box color="text-label" fontSize="heading-s">
                  <I18n>Reactions/day</I18n>
                </Box>
                {Math.round((reactions / mapTimeToDaysAgo(dateTime)) * 100) /
                  100}
              </div>
              <div>
                <Box color="text-label" fontSize="heading-s">
                  <I18n>Reactions/view</I18n>
                </Box>
                {Math.round((reactions / views) * 10000) / 100}%
              </div>
              <div>
                <Box color="text-label" fontSize="heading-s">
                  <I18n>Views/day</I18n>
                </Box>
                {Math.round((views / mapTimeToDaysAgo(dateTime)) * 100) / 100}
              </div>
            </ColumnLayout>
          );
        },
      },
    ],
  };

export default PUBLICATION_CARD_DEFINITION;
