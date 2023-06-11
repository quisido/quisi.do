import type { FunctionComponent, ReactElement } from 'react';
import Div from '../../../../../components/div';
import Quantity from '../../../../../components/quantity';

interface Analytic {
  readonly name: string;
  readonly unit: 'bytes' | 'microseconds' | 'milliseconds' | 'seconds';
}

const NONE = 0;

export default function mapCloudflareAnalyticKeyToColumnCell<
  T extends Analytic & Partial<Record<K, number | undefined>>,
  K extends Exclude<keyof T, 'name' | 'unit'>,
>(key: keyof T): FunctionComponent<T> {
  return function CellContent({
    unit,
    [key]: value,
  }: Readonly<T>): ReactElement | null {
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
