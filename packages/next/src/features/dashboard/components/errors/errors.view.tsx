import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Container from '../../../../components/container';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';
import useErrors from './errors.hook';

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
      <Container header={<I18n>Errors</I18n>} marginTop="large">
        <I18n>Initiating</I18n>
      </Container>
    );
  }

  if (error !== null) {
    return (
      <Container header={<I18n>Errors</I18n>} marginTop="large">
        <Span element="p">{error}</Span>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container header={<I18n>Errors</I18n>} marginTop="large">
        <LoadingIcon /> <I18n>Loading errors</I18n>
      </Container>
    );
  }

  return (
    <Container
      header={<I18n count={errorCount}>Errors ($count)</I18n>}
      marginTop="large"
    >
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
    </Container>
  );
}
