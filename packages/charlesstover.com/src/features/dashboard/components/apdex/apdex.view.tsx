import I18n from 'lazy-i18n';
import { ReactElement, useMemo } from 'react';
import { Line, LineChart, Tooltip, XAxis } from 'recharts';
import Div from '../../../../components/div';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';

interface Datum {
  readonly score: number;
  readonly timestamp: string;
}

export interface Props {
  readonly error: string | null;
  readonly frustrated: Record<string, number>;
  readonly initiated: boolean;
  readonly loading: boolean;
  readonly satisfied: Record<string, number>;
  readonly tolerated: Record<string, number>;
}

const MONTHS: readonly string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const sum = (a: number, b: number): number => a + b;

export default function Apdex({
  error,
  frustrated,
  initiated,
  loading,
  satisfied,
  tolerated,
}: Props): ReactElement {
  const data: Datum[] = useMemo((): Datum[] => {
    const apdex: Record<string, { count: number; sum: number }> = {};
    for (const [time, sum] of Object.entries(frustrated)) {
      if (time in apdex) {
        apdex[time] = {
          ...apdex[time],
          count: apdex[time].count + sum,
        };
        continue;
      }
      apdex[time] = {
        count: sum,
        sum: 0,
      };
    }
    for (const [time, sum] of Object.entries(tolerated)) {
      if (time in apdex) {
        apdex[time] = {
          count: apdex[time].count + sum,
          sum: apdex[time].sum + sum / 2,
        };
        continue;
      }
      apdex[time] = {
        count: sum,
        sum: sum / 2,
      };
    }
    for (const [time, sum] of Object.entries(satisfied)) {
      if (time in apdex) {
        apdex[time] = {
          count: apdex[time].count + sum,
          sum: apdex[time].sum + sum,
        };
        continue;
      }
      apdex[time] = {
        count: sum,
        sum,
      };
    }
    const reduce = (
      data: Datum[],
      [time, { count, sum }]: [string, { count: number; sum: number }],
    ): Datum[] => {
      const date: Date = new Date(parseInt(`${time}000`));
      const hours: number = date.getHours();
      const minutes: number = date.getMinutes();
      const month: number = date.getMonth();
      const day: number = date.getDate();
      return [
        ...data,
        {
          score: (sum / count) * 100,
          timestamp: `${MONTHS[month]} ${day} ${hours}:${minutes}`,
        },
      ];
    };
    const sortByTimestamp = (a: Datum, b: Datum): number => {
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      return 0;
    };
    const newData = Object.entries(apdex)
      .reduce(reduce, [])
      .sort(sortByTimestamp);
    console.log(newData);
    return newData;
  }, [frustrated, satisfied, tolerated]);

  if (!initiated) {
    return <I18n>Initiating</I18n>;
  }

  if (error !== null) {
    return (
      <Div>
        <Span>An error occurred.</Span>
        <Span>{error}</Span>
      </Div>
    );
  }

  if (loading) {
    return (
      <>
        <LoadingIcon /> <I18n>Loading Application Performance Index</I18n>
      </>
    );
  }

  const frustratedCount: number = Object.values(frustrated).reduce(sum, 0);
  const toleratedCount: number = Object.values(tolerated).reduce(sum, 0);
  const satisfiedCount: number = Object.values(satisfied).reduce(sum, 0);
  const total: number = frustratedCount + toleratedCount + satisfiedCount;
  const apdexScore: number =
    ((toleratedCount / 2 + satisfiedCount) / total) * 100;
  return (
    <>
      <Div>Apdex score: {Math.round(apdexScore)}%</Div>
      <Div>Frustrated: {Math.round((frustratedCount / total) * 100)}%</Div>
      <Div>Tolerated: {Math.round((toleratedCount / total) * 100)}%</Div>
      <Div>Satisfied: {Math.round((satisfiedCount / total) * 100)}%</Div>
      <LineChart data={data} height={400} width={640}>
        <Line dataKey="score" stroke="#ff0000" type="monotone" />
        <Tooltip allowEscapeViewBox={{ x: true, y: true }} />
        <XAxis dataKey="timestamp" orientation="bottom" />
      </LineChart>
    </>
  );
}
