import { type ReactElement } from 'react';
import Bytes from './components/bytes.js';
import Kibibytes from './components/kibibytes.js';
import Microseconds from './components/microseconds.js';
import Milliseconds from './components/milliseconds.js';
import Minutes from './components/minutes.js';
import Seconds from './components/seconds.js';

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
