import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Cell, Legend, RadialBar, RadialBarChart } from 'recharts';

interface Datum {
  readonly name: string;
  readonly value: number;
}

interface Props {
  readonly max: number;
  readonly size: number;
  readonly units?: string | undefined;
  readonly value: Record<string, number>;
}

const CIRCLE = 360;
const HUE = 192;
const NONE = 0;
const HALF = 0.5;
const LEGEND_FONT_SIZE = 9;

export default function Gauge({
  max,
  size,
  units = '',
  value,
}: Readonly<Props>): ReactElement {
  const data: Datum[] = useMemo((): Datum[] => {
    const reduceEntryToDatum = (
      data: Datum[],
      [label, value]: [string, number],
    ): Datum[] => {
      return [
        ...data,
        {
          name: `${label}: ${value}${units}`,
          value: value,
        },
      ];
    };

    return Object.entries(value).reduce(reduceEntryToDatum, [
      {
        name: '',
        value: max,
      },
    ]);
  }, [max, units, value]);

  const huePerCell: number = useMemo((): number => {
    const cellCount: number = Object.values(value).length;
    return Math.round(CIRCLE / cellCount);
  }, [value]);

  const legendWidth: number = useMemo((): number => {
    const reduceEntryToMaxLength = (
      maxLength: number,
      [label, value]: [string, number],
    ): number => Math.max(maxLength, `${label}: ${value}${units}`.length);
    const maxLength: number = Object.entries(value).reduce(
      reduceEntryToMaxLength,
      NONE,
    );
    return maxLength * LEGEND_FONT_SIZE;
  }, [units, value]);

  return (
    <RadialBarChart
      cx={size * HALF + legendWidth}
      cy={size * HALF}
      data={data}
      endAngle={0}
      height={size * HALF}
      innerRadius={0}
      outerRadius={size * HALF}
      startAngle={180}
      width={size + legendWidth}
    >
      <RadialBar dataKey="value">
        <Cell fill="transparent" />
        {Object.keys(value).map(
          (key: string, index: number): ReactElement => (
            <Cell
              fill={`hsl(${HUE + huePerCell * index}, 64%, 55%)`}
              key={key}
            />
          ),
        )}
      </RadialBar>
      <Legend iconSize={0} layout="radial" width={legendWidth} />
    </RadialBarChart>
  );
}
