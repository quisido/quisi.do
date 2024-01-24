import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import LoadingIcon from '../../../../components/loading-icon/index.js';
import Section from '../../../../components/section.js';
import Span from '../../../../components/span/index.js';
import useErrors from './errors.hook.js';

interface Props {
  readonly error: string | null;
  readonly errorCountTimeSeries: Record<string, number>;
  readonly initiated: boolean;
  readonly loading: boolean;
  readonly sessionCountTimeSeries: Record<string, number>;
}

export default function Errors({
  error,
  errorCountTimeSeries,
  initiated,
  loading,
  sessionCountTimeSeries,
}: Props): ReactElement {
  const {
    data,
    errorCount,
    formatter,
    labelFormatter,
    ref,
    tickFormatter,
    width,
  } = useErrors({
    errorCountTimeSeries,
    sessionCountTimeSeries,
  });

  if (!initiated) {
    return (
      <Section header={<I18n>Errors</I18n>}>
        <I18n>Initiating</I18n>
      </Section>
    );
  }

  if (error !== null) {
    return (
      <Section header={<I18n>Errors</I18n>}>
        <Span element="p">{error}</Span>
      </Section>
    );
  }

  if (loading) {
    return (
      <Section header={<I18n>Errors</I18n>}>
        <LoadingIcon /> <I18n>Loading errors</I18n>
      </Section>
    );
  }

  return (
    <Section header={<I18n count={errorCount}>Errors ($count)</I18n>}>
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
          <YAxis
            interval="preserveStartEnd"
            minTickGap={25}
            orientation="left"
          />
        </LineChart>
      </div>
    </Section>
  );
}
