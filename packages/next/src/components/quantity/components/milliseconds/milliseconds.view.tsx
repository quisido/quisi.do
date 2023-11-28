import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import round from '../../../../utils/round';
import Microseconds from '../microseconds';
import Seconds from '../seconds';

interface Props {
  readonly children: number;
  readonly decimals?: number | undefined;
}

const MICROSECONDS_PER_MILLISECOND = 1000;
const MILLISECONDS_PER_SECOND = 1000;
const SINGLE = 1;

export default function Milliseconds({
  children,
  decimals,
}: Props): ReactElement {
  if (children < SINGLE) {
    return (
      <Microseconds decimals={decimals}>
        {children * MICROSECONDS_PER_MILLISECOND}
      </Microseconds>
    );
  }

  if (children >= MILLISECONDS_PER_SECOND) {
    return (
      <Seconds decimals={decimals}>
        {children / MILLISECONDS_PER_SECOND}
      </Seconds>
    );
  }

  if (typeof decimals === 'undefined') {
    return (
      <I18n milliseconds={children.toLocaleString()}>$milliseconds ms</I18n>
    );
  }

  return (
    <I18n milliseconds={round(children, decimals).toLocaleString()}>
      $milliseconds ms
    </I18n>
  );
}
