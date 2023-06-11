import type { FunctionComponent, ReactElement } from 'react';
import Div from '../../../../../components/div';
import type Analytic from '../../../types/cloudflare-analytic';
import Quantity from '../components/quantity/quantity.view';

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

    return (
      <Div display="flex" flexDirection="row">
        <Quantity unit={unit}>{value}</Quantity>
      </Div>
    );
  };
}
