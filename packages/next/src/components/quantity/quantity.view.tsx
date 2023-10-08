import type { ReactElement } from 'react';
import Bytes from './components/bytes';
import Kibibytes from './components/kibibytes';
import Microseconds from './components/microseconds';
import Milliseconds from './components/milliseconds';
import Minutes from './components/minutes';
import Seconds from './components/seconds';

interface Props {
  readonly children: number;
  readonly decimals?: number | undefined;
  readonly unit:
    | 'bytes'
    | 'kilobytes'
    | 'microseconds'
    | 'milliseconds'
    | 'minutes'
    | 'seconds';
}

export default function Quantity({
  children,
  decimals,
  unit,
}: Props): ReactElement {
  switch (unit) {
    case 'bytes':
      return <Bytes decimals={decimals}>{children}</Bytes>;
    case 'kilobytes':
      return <Kibibytes decimals={decimals}>{children}</Kibibytes>;
    case 'microseconds':
      return <Microseconds decimals={decimals}>{children}</Microseconds>;
    case 'milliseconds':
      return <Milliseconds decimals={decimals}>{children}</Milliseconds>;
    case 'minutes':
      return <Minutes /*decimals={decimals}*/>{children}</Minutes>;
    case 'seconds':
      return <Seconds decimals={decimals}>{children}</Seconds>;
  }
}
