import I18n from 'lazy-i18n';
import { ReactElement } from 'react';
import round from '../../utils/round';
import Milliseconds from '../milliseconds';

interface Props {
  readonly children: number;
  readonly decimals?: number | undefined;
}

const MILLISECONDS_PER_SECOND = 1000;
const SINGLE = 1;

export default function Seconds({
  children,
  decimals,
}: Readonly<Props>): ReactElement {
  if (children < SINGLE) {
    return (
      <Milliseconds decimals={decimals}>
        {children * MILLISECONDS_PER_SECOND}
      </Milliseconds>
    );
  }

  if (typeof decimals === 'undefined') {
    return <I18n seconds={children}>$seconds s</I18n>;
  }

  return <I18n seconds={round(children, decimals)}>$seconds s</I18n>;
}