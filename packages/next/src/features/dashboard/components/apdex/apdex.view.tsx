import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../../../../components/div';
import Container from '../../../../components/container';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';
import PieChart from '../apdex-pie-chart';
import LineChart from '../apdex-line-chart';
import mapRecordToSum from '../../utils/map-record-to-sum';
import createApdexScore from '../../utils/create-apdex-score';

export interface Props {
  readonly error: string | null;
  readonly frustratedTimeSeries: Record<string, number>;
  readonly initiated: boolean;
  readonly loading: boolean;
  readonly satisfiedTimeSeries: Record<string, number>;
  readonly toleratedTimeSeries: Record<string, number>;
}

export default function Apdex({
  error,
  frustratedTimeSeries,
  initiated,
  loading,
  satisfiedTimeSeries,
  toleratedTimeSeries,
}: Props): ReactElement {
  if (!initiated) {
    return (
      <Container
        header={<I18n>Application Performance Index</I18n>}
        marginTop="large"
      >
        <I18n>Initiating</I18n>
      </Container>
    );
  }

  if (error !== null) {
    return (
      <Container
        header={<I18n>Application Performance Index</I18n>}
        marginTop="large"
      >
        <Span element="p">{error}</Span>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container
        header={<I18n>Application Performance Index</I18n>}
        marginTop="large"
      >
        <LoadingIcon /> <I18n>Loading Application Performance Index</I18n>
      </Container>
    );
  }

  const frustratedCount: number = mapRecordToSum(frustratedTimeSeries);
  const satisfiedCount: number = mapRecordToSum(satisfiedTimeSeries);
  const toleratedCount: number = mapRecordToSum(toleratedTimeSeries);
  const apdexScore: number = createApdexScore({
    frustrated: frustratedCount,
    satisfied: satisfiedCount,
    tolerated: toleratedCount,
  });

  return (
    <Container
      header={
        <>
          <I18n>Application Performance Index</I18n> ({Math.round(apdexScore)}%)
        </>
      }
      marginTop="large"
    >
      <Div display="flex" flexDirection="row" flexWrap="wrap">
        <PieChart
          frustrated={frustratedCount}
          satisfied={satisfiedCount}
          tolerated={toleratedCount}
        />
        <LineChart
          frustrated={frustratedTimeSeries}
          satisfied={satisfiedTimeSeries}
          tolerated={toleratedTimeSeries}
        />
      </Div>
    </Container>
  );
}
