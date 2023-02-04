import I18n from 'lazy-i18n';
import { ReactElement } from 'react';

interface Props {
  readonly children: number;
}

const SINGLE = 1;

export default function DailySessions({
  children,
}: Readonly<Props>): ReactElement {
  if (children === SINGLE) {
    return <I18n>1 session/day</I18n>;
  }

  return <I18n count={children}>$count sessions/day</I18n>;
}
