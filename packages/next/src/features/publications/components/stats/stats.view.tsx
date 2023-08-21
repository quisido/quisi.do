import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Span from '../../../../components/span';
import mapTimeToDaysAgo from '../../../../utils/map-time-to-days-ago';
import round from '../../../../utils/round';
import validateString from '../../../../utils/validate-string';
import styles from './stats.module.scss';

interface Props {
  readonly dateTime: number;
  readonly reactions: number;
  readonly views: number;
}

const DECIMALS = 2;
const LOCKED_DAY = 22;
const LOCKED_MONTH = 6; // July
const LOCKED_YEAR = 2023;
const PERCENT = 100;
const rootClassName: string = validateString(styles.root);
const LOCKED_DATE: Date = new Date(LOCKED_YEAR, LOCKED_MONTH, LOCKED_DAY);
const LOCKED_TIME: number = LOCKED_DATE.getTime();
const LOCKED_DAYS_AGO: number = mapTimeToDaysAgo(LOCKED_TIME);

export default function PublicationStats({
  dateTime,
  reactions,
  views,
}: Readonly<Props>): ReactElement {
  const days: number = mapTimeToDaysAgo(dateTime) - LOCKED_DAYS_AGO;
  return (
    <div className={rootClassName}>
      <div>
        <Span color="label" size="small-heading">
          <I18n>Daily views</I18n>
        </Span>
        <Span>{round(views / days, DECIMALS)}</Span>
      </div>
      <div>
        <Span color="label" size="small-heading">
          <I18n>Daily reactions</I18n>
        </Span>
        <Span>{round(reactions / days, DECIMALS)}</Span>
      </div>
      <div>
        <Span color="label" size="small-heading">
          <I18n>Engagement rate</I18n>
        </Span>
        <Span>{round((reactions / views) * PERCENT, DECIMALS)}%</Span>
      </div>
    </div>
  );
}
