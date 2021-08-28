import Badge from '@awsui/components-react/badge';
import Box from '@awsui/components-react/box';
import type { CardsProps } from '@awsui/components-react/cards';
import ColumnLayout from '@awsui/components-react/column-layout';
import Link from '@awsui/components-react/link';
import Popover from '@awsui/components-react/popover';
import StatusIndicator from '@awsui/components-react/status-indicator';
import I18n from 'lazy-i18n';
import NumberFormat from 'number-format-react';
import type { ReactElement } from 'react';
import Minutes from '../../components/minutes';
import mapTimeToDaysAgo from '../../map/map-time-to-days-ago';
import validateString from '../../utils/validate-string';
import styles from './publications.constant.card-definition.module.scss';
import type Item from './publications.type.item';

const bannerHeightClassName: string = validateString(styles.bannerHeight);
const bannerWidthClassName: string = validateString(styles.bannerWidth);
const BASE = 10;
const BASE_POW = 2;
const columnLayoutClassName: string = validateString(styles.columnLayout);
const dateTimeClassName: string = validateString(styles.dateTime);
const imageClassName: string = validateString(styles.image);
const MONTH_OFFSET = 1;
const PERCENT = 100;
const popoverClassName: string = validateString(styles.popover);
const reactionsClassName: string = validateString(styles.reactions);
const readingTimeClassName: string = validateString(styles.readingTime);
const TWO = 2;
const viewsClassName: string = validateString(styles.views);
const ZERO = 0;

const ratio = (a: number, b: number, decimals: number = ZERO): number =>
  Math.round((a / b) * Math.pow(BASE, BASE_POW + decimals)) / PERCENT;

const PUBLICATION_CARD_DEFINITION: CardsProps<Item>['cardDefinition'] = {
  header({ title, url }: Readonly<Item>): ReactElement {
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
      }: Readonly<Item>): ReactElement {
        const date: Date = new Date(dateTime);
        return (
          <div className={bannerHeightClassName}>
            <div className={bannerWidthClassName}>
              <Link href={url}>
                {typeof image === 'string' ? (
                  <img
                    alt={title}
                    className={imageClassName}
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
              <Badge className={viewsClassName}>
                <Popover
                  className={popoverClassName}
                  content={<I18n>Views</I18n>}
                  size="small"
                >
                  👁‍🗨 <NumberFormat>{views}</NumberFormat>
                </Popover>
              </Badge>
              <Badge className={reactionsClassName}>
                <Popover
                  className={popoverClassName}
                  content={<I18n>Reactions</I18n>}
                  size="small"
                >
                  <NumberFormat>{reactions}</NumberFormat> 👏
                </Popover>
              </Badge>
              <Badge className={dateTimeClassName}>
                <Popover
                  className={popoverClassName}
                  content={<I18n>Publication date</I18n>}
                  size="small"
                >
                  📅 {date.getFullYear()}-{date.getMonth() + MONTH_OFFSET}-
                  {date.getDate()}
                </Popover>
              </Badge>
              {typeof readingTime === 'number' && (
                <Badge className={readingTimeClassName}>
                  <Popover
                    className={popoverClassName}
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
      content({ dateTime, reactions, views }: Readonly<Item>): ReactElement {
        return (
          <ColumnLayout className={columnLayoutClassName} columns={12}>
            <div>
              <Box color="text-label" fontSize="heading-s">
                <I18n>Reactions/day</I18n>
              </Box>
              {ratio(reactions, mapTimeToDaysAgo(dateTime))}
            </div>
            <div>
              <Box color="text-label" fontSize="heading-s">
                <I18n>Reactions/view</I18n>
              </Box>
              {ratio(reactions, views, TWO)}%
            </div>
            <div>
              <Box color="text-label" fontSize="heading-s">
                <I18n>Views/day</I18n>
              </Box>
              {ratio(views, mapTimeToDaysAgo(dateTime))}
            </div>
          </ColumnLayout>
        );
      },
    },
  ],
};

export default PUBLICATION_CARD_DEFINITION;
