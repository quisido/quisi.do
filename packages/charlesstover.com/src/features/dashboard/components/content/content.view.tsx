import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import type { MutableRefObject, ReactElement } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import Link from '../../../../components/link';
import mapUnknownToString from 'unknown2string';
import Span from '../../../../components/span';

type AsyncState<T> =
  | ErrorAsyncState
  | LoadingAsyncState<T>
  | SuccessAsyncState<T>
  | UninitiatedAsyncState;

interface ErrorAsyncState {
  readonly data: null;
  readonly error: string;
  readonly initiated: true;
  readonly loading: false;
}

interface LoadingAsyncState<T> {
  readonly data: T | null;
  readonly error: null | string;
  readonly initiated: true;
  readonly loading: true;
}

interface MetricStats {
  readonly average: Record<string, number>;
  readonly p90: Record<string, number>;
}

interface RumError {
  readonly message: 'Forbidden' | 'Unauthorized';
}

type RumMetricKey =
  | 'JsErrorCount'
  | 'NavigationFrustratedTransaction'
  | 'NavigationSatisfiedTransaction'
  | 'NavigationToleratedTransaction'
  | 'PerformanceNavigationDuration'
  | 'RumEventPayloadSize'
  | 'SessionCount'
  | 'WebVitalsCumulativeLayoutShift'
  | 'WebVitalsFirstInputDelay'
  | 'WebVitalsLargestContentfulPaint';

type RumMetrics = Record<RumMetricKey, MetricStats>;

interface SuccessAsyncState<T> {
  readonly data: T;
  readonly error: null;
  readonly initiated: true;
  readonly loading: false;
}

interface UninitiatedAsyncState {
  readonly data: null;
  readonly error: null;
  readonly initiated: false;
  readonly loading: false;
}

const ACCESS_KEY = '0123-4567-89ab-cdef';

const DEFAULT_RUM_METRICS_STATE: AsyncState<RumMetrics> = {
  data: null,
  error: null,
  initiated: false,
  loading: false,
};

export default function DashboardContent(): ReactElement {
  const asyncEffect: MutableRefObject<Promise<unknown> | undefined> = useRef();

  const [{ data, error, initiated, loading }, setRumMetrics] = useState<
    AsyncState<RumMetrics>
  >(DEFAULT_RUM_METRICS_STATE);

  const getRumMetrics = useCallback(async (): Promise<void> => {
    setRumMetrics({
      data: null,
      error: null,
      initiated: true,
      loading: true,
    });
    try {
      const response: Response = await fetch(
        `https://rum.cscdn.net/rum?accessKey=${ACCESS_KEY}`,
      );
      const data: RumMetrics | RumError = await response.json();

      if ('message' in data) {
        throw new Error(data.message);
      }

      setRumMetrics({
        data,
        error: null,
        initiated: true,
        loading: false,
      });
    } catch (err: unknown) {
      console.log(err);
      setRumMetrics({
        data: null,
        error: mapUnknownToString(err),
        initiated: true,
        loading: false,
      });
    }
  }, []);

  useEffect((): void => {
    asyncEffect.current = getRumMetrics();
  }, []);

  return (
    <>
      <Container header="CharlesStover.com">
        <Div element="p">
          This dashboard showcases operational and performance metrics for{' '}
          <Link href="/">CharlesStover.com</Link>.
        </Div>
        {initiated ? (
          loading ? (
            <Span>Loading...</Span>
          ) : error ? (
            <Span>An error occurred: {error}</Span>
          ) : (
            <Span>Data: {JSON.stringify(data)}</Span>
          )
        ) : (
          <>Warming up...</>
        )}
      </Container>
      <Div marginTop="large">
        <Container header="Performance">
          <Div>
            <div style={{ height: '92px', width: '92px' }}>
              <CircularProgressbarWithChildren
                styles={buildStyles({
                  pathColor: 'green',
                  rotation: 0.99,
                  strokeLinecap: 'butt',
                  trailColor: 'transparent',
                })}
                value={1}
              >
                <CircularProgressbarWithChildren
                  styles={buildStyles({
                    pathColor: 'yellow',
                    rotation: 0.89,
                    strokeLinecap: 'butt',
                    trailColor: 'transparent',
                  })}
                  value={1}
                >
                  <CircularProgressbarWithChildren
                    styles={buildStyles({
                      pathColor: 'red',
                      rotation: 0.49,
                      strokeLinecap: 'butt',
                      trailColor: 'transparent',
                    })}
                    value={1}
                  >
                    <CircularProgressbarWithChildren
                      styles={buildStyles({
                        pathColor: 'yellow',
                        strokeLinecap: 'butt',
                        trailColor: 'transparent',
                      })}
                      value={60}
                    >
                      <CircularProgressbarWithChildren
                        styles={buildStyles({
                          pathColor: 'darkyellow',
                          rotation: 0.6,
                          strokeLinecap: 'butt',
                          trailColor: 'transparent',
                        })}
                        value={1}
                      >
                        60%
                      </CircularProgressbarWithChildren>
                    </CircularProgressbarWithChildren>
                  </CircularProgressbarWithChildren>
                </CircularProgressbarWithChildren>
              </CircularProgressbarWithChildren>
            </div>
          </Div>
        </Container>
      </Div>
    </>
  );
}
