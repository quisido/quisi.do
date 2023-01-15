import type { ReactElement } from 'react';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import useErrorRate from './error-rate.hook';

interface Props {
  readonly errorCount: Record<string, number>;
  readonly sessionCount: Record<string, number>;
}

export default function ErrorRate({
  errorCount,
  sessionCount,
}: Readonly<Props>): ReactElement {
  const { data, formatter, labelFormatter, ref, tickFormatter, width } =
    useErrorRate({
      errorCount,
      sessionCount,
    });

  return (
    <div ref={ref}>
      <LineChart data={data} height={240} width={width}>
        <Line dataKey="value" type="natural" />
        <Tooltip formatter={formatter} labelFormatter={labelFormatter} />
        <XAxis
          angle={-60}
          dataKey="timestamp"
          height={50}
          interval="preserveStartEnd"
          orientation="bottom"
          tickFormatter={tickFormatter}
        />
        <YAxis interval="preserveStartEnd" minTickGap={25} orientation="left" />
      </LineChart>
    </div>
  );
}
