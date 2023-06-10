import type { FunctionComponent, ReactElement } from 'react';
import Bytes from '../../../../../components/bytes';
import Microseconds from '../../../../../components/microseconds';
import Milliseconds from '../../../../../components/milliseconds';
import Seconds from '../../../../../components/seconds';
import type Analytic from '../../../types/cloudflare-analytic';

const NONE = 0;

export default function mapCloudflareAnalyticKeyToColumnCell(
  key: keyof Analytic,
): FunctionComponent<Analytic> {
  return function CellContent({
    unit,
    [key]: value,
  }: Readonly<Analytic>): ReactElement | null {
    if (typeof value === 'string') {
      return <>{value}</>;
    }

    if (typeof value === 'undefined' || value === NONE) {
      return null;
    }

    switch (unit) {
      case 'bytes':
        return <Bytes decimals={2}>{value}</Bytes>;
      case 'microseconds':
        return <Microseconds decimals={2}>{value}</Microseconds>;
      case 'milliseconds':
        return <Milliseconds decimals={2}>{value}</Milliseconds>;
      case 'seconds':
        return <Seconds decimals={2}>{value}</Seconds>;
      default:
        return <>{value}</>;
    }
  };
}
