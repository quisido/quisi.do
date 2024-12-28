'use client';

import { arc } from 'd3-shape';
import { type ReactElement } from 'react';
import validateString from '../../utils/validate-string.js';
import styles from './gauge.module.scss';

export interface Threshold {
  readonly activeClassName?: string | undefined;
  readonly className?: string | undefined;
  readonly inactiveClassName?: string | undefined;
  readonly from?: number | undefined;
  readonly to: number;
}

interface Props {
  readonly max: number;
  readonly min?: number | undefined;
  readonly needleClassName?: string | undefined;
  readonly thresholds?: readonly (number | Threshold)[] | undefined;
  readonly value: number;
}

const CLASS_NAME: string = validateString(styles['gauge']);
const DECREMENT = -1;
const DEFAULT_MIN = 0;
const DOUBLE = 2;
const HALF = 0.5;
const DIAMETER = 100;
const NIL = 0;
const CIRCLE: number = DOUBLE * Math.PI;
const D3_ANGLE_OFFSET: number = -Math.PI * HALF;
const RADIUS: number = DIAMETER * HALF;

interface GaugeNeedleProps {
  readonly className?: string | undefined;
  readonly max: number;
  readonly min: number;
  readonly value: number;
}

// Measured in radians.
const NEEDLE_BUTTON_WIDTH = 0.333;
const NEEDLE_RADIANS = 0.05;
const NEEDLE_WIDTH: number = DIAMETER / (Math.PI / NEEDLE_RADIANS);

function GaugeNeedle({
  className,
  max,
  min,
  value,
}: GaugeNeedleProps): ReactElement {
  const percentage: number = (value - min) / (max - min);
  const gaugeAngle: number = Math.PI * percentage;

  /**
   *   The needle's arc opens toward the center of the gauge, i.e. 180 degrees
   * away from the gauge angle (+ Math.PI).
   */
  const startAngle: number =
    D3_ANGLE_OFFSET + gaugeAngle + Math.PI - NEEDLE_RADIANS * HALF;

  const needle = arc();
  needle.cornerRadius(RADIUS);
  const arcPathD: string | null = needle({
    endAngle: startAngle + NEEDLE_RADIANS,
    innerRadius: 1,
    outerRadius: RADIUS + NEEDLE_WIDTH,
    startAngle,
  });

  const tipX: number = RADIUS + RADIUS * Math.cos(gaugeAngle + Math.PI);
  const tipY: number = RADIUS - RADIUS * Math.sin(gaugeAngle);
  return (
    <path
      className={className}
      d={arcPathD ?? ''}
      fill="inherit"
      transform={`translate(${tipX}, ${tipY})`}
    />
  );
}

interface GaugePathProps {
  readonly className?: string | undefined;
  readonly from: number;
  readonly max: number;
  readonly min: number;
  readonly to: number;
}

function GaugePath({
  className,
  from,
  max,
  min,
  to,
}: GaugePathProps): ReactElement {
  const fromPercentage: number = (from - min) / (max - min);
  const toPercentage: number = (to - min) / (max - min);
  const angle: number = Math.PI * (toPercentage - fromPercentage);
  const startAngle: number = D3_ANGLE_OFFSET + Math.PI * fromPercentage;
  const arcPathD: string | null = arc()({
    endAngle: startAngle + angle,
    innerRadius: 0,
    outerRadius: RADIUS,
    startAngle,
  });

  return (
    <path
      className={className}
      d={arcPathD ?? ''}
      fill="red"
      transform={`translate(${RADIUS}, ${RADIUS})`}
    />
  );
}

export default function Gauge({
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

  return (
    <svg
      className={CLASS_NAME}
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
      <path
        d={
          arc()({
            endAngle: CIRCLE,
            innerRadius: 0,
            outerRadius: NEEDLE_WIDTH * NEEDLE_BUTTON_WIDTH,
            startAngle: 0,
          }) ?? ''
        }
        fill="#c0c0c0"
        transform={`translate(${RADIUS}, ${RADIUS})`}
      />
    </svg>
  );
}
