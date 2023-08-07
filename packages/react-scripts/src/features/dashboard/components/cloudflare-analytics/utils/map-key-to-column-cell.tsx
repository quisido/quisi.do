import type { FunctionComponent, ReactElement } from 'react';
import Div from '../../../../../components/div';
import Quantity from '../../../../../components/quantity';
import Change from '../components/change';

interface Analytic {
  readonly goal?: 'high' | 'low' | undefined;
  readonly name: string;
  readonly p50?: number | undefined;
  readonly unit: 'bytes' | 'microseconds' | 'milliseconds' | 'seconds';
}

const NONE = 0;

export default function mapCloudflareAnalyticKeyToColumnCell<
  T extends Analytic & Partial<Record<K, number | undefined>>,
  K extends Exclude<keyof T, 'goal' | 'name' | 'unit'>,
>(key: keyof T): FunctionComponent<T> {
  return function CellContent({
    goal,
    p50,
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
        <Quantity decimals={2} unit={unit}>
          {value}
        </Quantity>
        {key !== 'p50' && key != 'sum' && (
          <Change goal={goal} p50={p50} value={value} />
        )}
      </Div>
    );
  };
}
