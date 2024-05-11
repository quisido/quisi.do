import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../../../../modules/quisi/div.js';
import LoadingIcon from '../../../../modules/quisi/loading-icon.js';
import Section from '../../../../modules/quisi/section.js';
import Span from '../../../../modules/quisi/span.js';
import createApdexScore from '../../utils/create-apdex-score.js';
import mapRecordToSum from '../../utils/map-record-to-sum.js';
import LineChart from '../apdex-line-chart/index.js';
import PieChart from '../apdex-pie-chart/index.js';

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
      <Section header={<I18n>Application Performance Index</I18n>}>
        <I18n>Initiating</I18n>
      </Section>
    );
  }

  if (error !== null) {
    return (
      <Section header={<I18n>Application Performance Index</I18n>}>
        <Span element="p">{error}</Span>
      </Section>
    );
  }

  if (loading) {
    return (
      <Section header={<I18n>Application Performance Index</I18n>}>
        <LoadingIcon />{' '}
        {/*<I18n>Loading Application Performance Index</I18n> */}
      </Section>
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
    <Section
      header={
        <>
          <I18n>Application Performance Index</I18n> ({Math.round(apdexScore)}%)
        </>
      }
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
    </Section>
  );
}
