import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { lazy } from 'react';
import Wrapper from '../../components/wrapper';
import type RumMetrics from '../../types/rum-metrics';
import type { Props as ContentProps } from './components/content';
import useDashboard from './dashboard.hook';

interface Props {
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
}

const Content: ComponentType<ContentProps> = lazy(
  async (): Promise<Record<'default', ComponentType<ContentProps>>> =>
    import('./components/content'),
);

export default function Dashboard({
  onRumMetricsRequest,
}: Readonly<Props>): ReactElement {
  const {
    apdexError,
    breadcrumbs,
    cumulativeLayoutShift,
    errorCount,
    firstInputDelay,
    frustrated,
    isApdexInitiated,
    isApdexLoading,
    largestContentfulPaint,
    notifications,
    satisfied,
    sessionCount,
    tolerated,
  } = useDashboard({
    onRumMetricsRequest,
  });

  return (
    <Wrapper
      breadcrumbs={breadcrumbs}
      fallback={<I18n>Loading dashboard</I18n>}
      notifications={notifications}
      toolsHide
    >
      <Content
        apdexError={apdexError}
        cumulativeLayoutShift={cumulativeLayoutShift}
        errorCount={errorCount}
        firstInputDelay={firstInputDelay}
        frustrated={frustrated}
        isApdexInitiated={isApdexInitiated}
        isApdexLoading={isApdexLoading}
        largestContentfulPaint={largestContentfulPaint}
        satisfied={satisfied}
        sessionCount={sessionCount}
        tolerated={tolerated}
      />
    </Wrapper>
  );
}
