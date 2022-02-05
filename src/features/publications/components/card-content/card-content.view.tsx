import Badge from '@awsui/components-react/badge';
import Link from '@awsui/components-react/link';
import Popover from '@awsui/components-react/popover';
import StatusIndicator from '@awsui/components-react/status-indicator';
import I18n from 'lazy-i18n';
import NumberFormat from 'number-format-react';
import type { ReactElement } from 'react';
import Minutes from '../../../../components/minutes';
import validateString from '../../../../utils/validate-string';
import type Publication from '../../types/publication';
import styles from './card-content.module.scss';

const bannerHeightClassName: string = validateString(styles.bannerHeight);
const bannerWidthClassName: string = validateString(styles.bannerWidth);
const dateTimeClassName: string = validateString(styles.dateTime);
const imageClassName: string = validateString(styles.image);
const MONTH_OFFSET = 1;
const popoverClassName: string = validateString(styles.popover);
const reactionsClassName: string = validateString(styles.reactions);
const readingTimeClassName: string = validateString(styles.readingTime);
const viewsClassName: string = validateString(styles.views);

export default function PublicationsCardContent({
  dateTime,
  image,
  reactions,
  readingTime,
  title,
  url,
  views,
}: Readonly<Publication>): ReactElement {
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
}
