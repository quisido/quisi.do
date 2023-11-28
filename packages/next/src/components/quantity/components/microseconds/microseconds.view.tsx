import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import round from '../../../../utils/round';
import Milliseconds from '../milliseconds';

interface Props {
  readonly children: number;
  readonly decimals?: number | undefined;
}

const MICROSECONDS_PER_MILLISECOND = 1000;

export default function Microseconds({
  children,
  decimals,
}: Props): ReactElement {
  if (children >= MICROSECONDS_PER_MILLISECOND) {
    return (
      <Milliseconds decimals={decimals}>
        {children / MICROSECONDS_PER_MILLISECOND}
      </Milliseconds>
    );
  }

  if (typeof decimals === 'undefined') {
    return (
      <I18n microseconds={children.toLocaleString()}>$microseconds μs</I18n>
    );
  }

  return (
    <I18n microseconds={round(children, decimals).toLocaleString()}>
      $microseconds μs
    </I18n>
  );
}
