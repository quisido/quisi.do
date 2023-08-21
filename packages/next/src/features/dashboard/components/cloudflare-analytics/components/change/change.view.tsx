import type { ReactElement } from 'react';
import PercentDifference from '../../../../../../components/percent-difference';
import validateString from '../../../../../../utils/validate-string';
import styles from './change.module.scss';

interface Props {
  readonly goal?: 'high' | 'low' | undefined;
  readonly p50?: number | undefined;
  readonly value: number;
}

const badClassName: string = validateString(styles.bad);
const goodClassName: string = validateString(styles.good);
const ZERO = 0;

export default function CloudflareAnalyticChange({
  goal,
  p50,
  value,
}: Readonly<Props>): ReactElement | null {
  if (typeof p50 === 'undefined' || p50 === ZERO) {
    return null;
  }

  const getClassName = (): string | undefined => {
    if (typeof goal === 'undefined' || value === p50) {
      return;
    }

    switch (goal) {
      case 'low': {
        if (value < p50) {
          return goodClassName;
        }
        return badClassName;
      }

      case 'high': {
        if (value > p50) {
          return goodClassName;
        }
        return badClassName;
      }
    }
  };

  const className: string | undefined = getClassName();
  return (
    <>
      &nbsp;{' '}
      <span className={className}>
        (<PercentDifference from={p50} to={value} />)
      </span>
    </>
  );
}
