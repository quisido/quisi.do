import { type ReactElement } from 'react';
import validateString from '../../utils/validate-string.js';
import styles from './gauge.module.scss';
import { DIAMETER, NEEDLE_WIDTH, RADIUS } from './gauge/gauge-constants.js';
import GaugeNeedle from './gauge/gauge-needle.jsx';
import GaugePath from './gauge/gauge-path.jsx';

export interface Threshold {
  readonly activeClassName?: string | undefined;
  readonly className?: string | undefined;
  readonly inactiveClassName?: string | undefined;
  readonly from?: number | undefined;
  readonly to: number;
}

interface Props {
  readonly className?: string | undefined;
  readonly max: number;
  readonly min?: number | undefined;
  readonly needleClassName?: string | undefined;
  readonly thresholds?: readonly (number | Threshold)[] | undefined;
  readonly value: number;
}

const CLASS_NAME: string = validateString(styles['gauge']);
const DECREMENT = -1;
const DEFAULT_MIN = 0;
const NIL = 0;

export default function Gauge({
  className,
  max,
  min = DEFAULT_MIN,
  needleClassName,
  thresholds = [],
  value,
}: Props): ReactElement {
  const mapThresholdToPath = (
    threshold: number | Threshold,
    index: number,
  ): ReactElement | null => {
    // When `from` isn't defined, we default to the previous threshold's `to`.
    const getPreviousTo = (): number => {
      const previousThreshold: Threshold | number | undefined =
        thresholds[index + DECREMENT];
      if (typeof previousThreshold === 'undefined') {
        return NIL;
      }

      if (typeof previousThreshold === 'number') {
        return previousThreshold;
      }

      return previousThreshold.to;
    };

    const previousTo: number = getPreviousTo();
    if (typeof threshold === 'number') {
      return (
        <GaugePath
          from={previousTo}
          key={threshold}
          max={max}
          min={min}
          to={threshold}
        />
      );
    }

    const {
      activeClassName,
      className,
      from = previousTo,
      inactiveClassName,
      to,
    } = threshold;

    const getClassName = (): string => {
      const classNames: string[] = [];
      if (typeof className !== 'undefined') {
        classNames.push(className);
      }

      if (value >= from && value <= to) {
        if (typeof activeClassName !== 'undefined') {
          classNames.push(activeClassName);
        }
      } else if (typeof inactiveClassName !== 'undefined') {
        classNames.push(inactiveClassName);
      }

      return classNames.join(' ');
    };

    return (
      <GaugePath
        className={getClassName()}
        from={from}
        key={`${from}-${to}`}
        max={max}
        min={min}
        to={to}
      />
    );
  };

  const classNames: string[] = [CLASS_NAME];
  if (typeof className !== 'undefined') {
    classNames.push(className);
  }

  return (
    <svg
      className={classNames.join(' ')}
      viewBox={`0 0 ${DIAMETER} ${RADIUS + NEEDLE_WIDTH}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {thresholds.map(mapThresholdToPath)}
      <GaugeNeedle
        className={needleClassName}
        max={max}
        min={min}
        value={value}
      />
    </svg>
  );
}
