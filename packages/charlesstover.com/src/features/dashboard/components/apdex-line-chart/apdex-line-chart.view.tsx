import type { ReactElement } from 'react';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import validateString from '../../../../utils/validate-string';
import formatter from '../../utils/formatter';
import useApdexLineChart from './apdex-line-chart.hook';
import styles from './apdex-line-chart.module.scss';

interface Props {
  readonly frustrated: Record<string, number>;
  readonly satisfied: Record<string, number>;
  readonly tolerated: Record<string, number>;
}

const rootClassName: string = validateString(styles.root);

export default function ApdexLineChart({
  frustrated,
  satisfied,
  tolerated,
}: Readonly<Props>): ReactElement {
  const { data, labelFormatter, ref, tickFormatter, width } = useApdexLineChart(
    {
      frustrated,
      satisfied,
      tolerated,
    },
  );

  return (
    <div className={rootClassName} ref={ref}>
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
