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
    clsP95,
    clsTm95,
    errorCountTimeSeries,
    errorsError,
    fidP95,
    fidTm95,
    frustratedTimeSeries,
    isApdexInitiated,
    isApdexLoading,
    isErrorsInitiated,
    isErrorsLoading,
    isWebVitalsInitiated,
    isWebVitalsLoading,
    lcpP95,
    lcpTm95,
    satisfiedTimeSeries,
    sessionCountTimeSeries,
    toleratedTimeSeries,
    webVitalsError,
  } = useDashboard({
    onRumMetricsRequest,
  });

  return (
    <Wrapper
      breadcrumbs={breadcrumbs}
      fallback={<I18n>Loading dashboard</I18n>}
      toolsHide
    >
      <Content
        apdexError={apdexError}
        clsP95={clsP95}
        clsTm95={clsTm95}
        errorCountTimeSeries={errorCountTimeSeries}
        errorsError={errorsError}
        fidP95={fidP95}
        fidTm95={fidTm95}
        frustratedTimeSeries={frustratedTimeSeries}
        isApdexInitiated={isApdexInitiated}
        isApdexLoading={isApdexLoading}
        isErrorsInitiated={isErrorsInitiated}
        isErrorsLoading={isErrorsLoading}
        isWebVitalsInitiated={isWebVitalsInitiated}
        isWebVitalsLoading={isWebVitalsLoading}
        lcpP95={lcpP95}
        lcpTm95={lcpTm95}
        satisfiedTimeSeries={satisfiedTimeSeries}
        sessionCountTimeSeries={sessionCountTimeSeries}
        toleratedTimeSeries={toleratedTimeSeries}
        webVitalsError={webVitalsError}
      />
    </Wrapper>
  );
}
