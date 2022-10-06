/* eslint-disable react/jsx-max-depth */
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Span from '../../../../components/span';
import mapTimeToDaysAgo from '../../../../utils/map-time-to-days-ago';
import validateString from '../../../../utils/validate-string';
import ratio from '../../utils/ratio';
import styles from './stats.module.scss';

interface Props {
  readonly dateTime: number;
  readonly reactions: number;
  readonly views: number;
}

const rootClassName: string = validateString(styles.root);
const TWO = 2;

export default function PublicationStats({
  dateTime,
  reactions,
  views,
}: Readonly<Props>): ReactElement {
  return (
    <div className={rootClassName}>
      <div>
        <Span color="label" size="small-heading">
          <I18n>Reactions/day</I18n>
        </Span>
        <Span>{ratio(reactions, mapTimeToDaysAgo(dateTime))}</Span>
      </div>
      <div>
        <Span color="label" size="small-heading">
          <I18n>Reactions/view</I18n>
        </Span>
        <Span>{ratio(reactions, views, TWO)}%</Span>
      </div>
      <div>
        <Span color="label" size="small-heading">
          <I18n>Views/day</I18n>
        </Span>
        <Span>{ratio(views, mapTimeToDaysAgo(dateTime))}</Span>
      </div>
    </div>
  );
}
