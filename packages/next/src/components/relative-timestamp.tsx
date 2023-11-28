import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import RelativeTimestampModule from 'relative-timestamp';

interface Props {
  readonly children: number;
}

const SINGLE = 1;

export default function RelativeTimestamp({ children }: Props): ReactElement {
  return (
    <RelativeTimestampModule value={children}>
      {(
        unit: 'days' | 'hours' | 'minutes' | 'months' | 'now' | 'years',
        count: number,
      ): ReactElement => {
        switch (unit) {
          case 'days': {
            if (count === SINGLE) {
              return <I18n>1 day ago</I18n>;
            }
            return <I18n n={count}>$n days ago</I18n>;
          }
          case 'hours': {
            if (count === SINGLE) {
              return <I18n>1 hour ago</I18n>;
            }
            return <I18n n={count}>$n hours ago</I18n>;
          }
          case 'minutes': {
            if (count === SINGLE) {
              return <I18n>1 minute ago</I18n>;
            }
            return <I18n n={count}>$n minutes ago</I18n>;
          }
          case 'months': {
            if (count === SINGLE) {
              return <I18n>1 month ago</I18n>;
            }
            return <I18n n={count}>$n months ago</I18n>;
          }
          case 'now':
            return <I18n>just now</I18n>;
          case 'years': {
            if (count === SINGLE) {
              return <I18n>1 year ago</I18n>;
            }
            return <I18n n={count}>$n years ago</I18n>;
          }
        }
      }}
    </RelativeTimestampModule>
  );
}
