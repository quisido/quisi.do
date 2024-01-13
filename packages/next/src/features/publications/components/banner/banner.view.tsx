import I18n from 'lazy-i18n';
import NumberFormat from 'number-format-react';
import { type ReactElement } from 'react';
import Chip from '../../../../components/chip/index.js';
import Link from '../../../../components/link/index.js';
// import Quantity from '../../../../components/quantity.js';
import validateString from '../../../../utils/validate-string.js';
import BannerImage from '../../components/banner-image/index.js';
import styles from './banner.module.scss';

interface Props {
  readonly dateTime: number;
  readonly image?: string | undefined;
  readonly reactions: number;
  readonly readingTime?: number | undefined;
  readonly title: string;
  readonly url: string;
  readonly views: number;
}

const bannerHeightClassName: string = validateString(styles['bannerHeight']);
const bannerWidthClassName: string = validateString(styles['bannerWidth']);
// const dateTimeClassName: string = validateString(styles.dateTime);
const linkClassName: string = validateString(styles['link']);
// const MONTH_OFFSET = 1;
const reactionsClassName: string = validateString(styles['reactions']);
// const readingTimeClassName: string = validateString(styles.readingTime);
const viewsClassName: string = validateString(styles['views']);

export default function PublicationBanner({
  // dateTime,
  image,
  reactions,
  // readingTime,
  title,
  url,
  views,
}: Props): ReactElement {
  /*
  const date: Date = new Date(dateTime);
  const monthStr: string = prefix(date.getMonth() + MONTH_OFFSET);
  const dayStr: string = prefix(date.getDate());
  */
  return (
    <div className={bannerHeightClassName}>
      <div className={bannerWidthClassName}>
        <Link
          className={linkClassName}
          feature="publications/banner"
          href={url}
          title={title}
        >
          <BannerImage src={image} title={title} />
        </Link>
        <Chip className={viewsClassName} title={<I18n>Views</I18n>}>
          👁‍🗨 <NumberFormat>{views}</NumberFormat>
        </Chip>
        <Chip className={reactionsClassName} title={<I18n>Reactions</I18n>}>
          <NumberFormat>{reactions}</NumberFormat> 👏
        </Chip>
        {/*
        <Chip
          className={dateTimeClassName}
          title={<I18n>Publication date</I18n>}
        >
          📅 {date.getFullYear()}-{monthStr}-{dayStr}
        </Chip>
        {typeof readingTime === 'number' && (
          <Chip
            className={readingTimeClassName}
            title={<I18n>Reading time</I18n>}
          >
            <Quantity unit="minutes">{readingTime}</Quantity> ⏳
          </Chip>
        )}
        */}
      </div>
    </div>
  );
}
