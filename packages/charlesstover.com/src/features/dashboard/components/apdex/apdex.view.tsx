import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Div from '../../../../components/div';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';
import sum from '../../../../utils/sum';
import PieChart from '../apdex-pie-chart';
import LineChart from '../apdex-line-chart';
import Container from '../../../../components/container';

export interface Props {
  readonly error: string | null;
  readonly frustrated: Record<string, number>;
  readonly initiated: boolean;
  readonly loading: boolean;
  readonly satisfied: Record<string, number>;
  readonly tolerated: Record<string, number>;
}

const HALF = 0.5;
const NONE = 0;
const PERCENT = 100;

export default function Apdex({
  error,
  frustrated,
  initiated,
  loading,
  satisfied,
  tolerated,
}: Readonly<Props>): ReactElement {
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
        <Span>An error occurred.</Span>
        <Span>{error}</Span>
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

  const frustratedCount: number = Object.values(frustrated).reduce(sum, NONE);
  const toleratedCount: number = Object.values(tolerated).reduce(sum, NONE);
  const satisfiedCount: number = Object.values(satisfied).reduce(sum, NONE);
  const total: number = frustratedCount + toleratedCount + satisfiedCount;
  const apdexScore: number =
    ((toleratedCount * HALF + satisfiedCount) / total) * PERCENT;
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
          frustrated={frustrated}
          satisfied={satisfied}
          tolerated={tolerated}
        />
      </Div>
    </Container>
  );
}
