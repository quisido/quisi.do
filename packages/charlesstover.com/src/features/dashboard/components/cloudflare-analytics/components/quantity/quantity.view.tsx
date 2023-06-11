import type { ReactElement } from 'react';
import Bytes from '../../../../../../components/bytes';
import Microseconds from '../../../../../../components/microseconds';
import Milliseconds from '../../../../../../components/milliseconds';
import Seconds from '../../../../../../components/seconds';

interface Props {
  readonly children: number;
  readonly unit:
    | 'bytes'
    | 'microseconds'
    | 'milliseconds'
    | 'seconds'
    | undefined;
}

export default function Quantity({
  children,
  unit,
}: Readonly<Props>): ReactElement {
  switch (unit) {
    case 'bytes':
      return <Bytes decimals={2}>{children}</Bytes>;
    case 'microseconds':
      return <Microseconds decimals={2}>{children}</Microseconds>;
    case 'milliseconds':
      return <Milliseconds decimals={2}>{children}</Milliseconds>;
    case 'seconds':
      return <Seconds decimals={2}>{children}</Seconds>;
    default:
      return <>{children}</>;
  }
}
