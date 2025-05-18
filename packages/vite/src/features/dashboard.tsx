import { sortStrings } from 'fmrs';
import I18n from 'lazy-i18n';
import {
  memo,
  useEffect,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import CertificateManagerLink from '../components/certificate-manager-link.jsx';
import Gauge from '../components/gauge.jsx';
import NumberFormat from '../components/number-format.jsx';
import { MILLISECONDS_PER_SECOND } from '../constants/time.js';
import useWindow from '../hooks/use-window.js';
import LineChart from '../modules/quisi/line-chart.jsx';
import Link from '../modules/quisi/link.jsx';
import Paragraph from '../modules/quisi/paragraph.jsx';
import Section from '../modules/quisi/section.jsx';
import useAsyncState from '../modules/use-async-state/index.js';
import type DashboardApiResponse from '../types/dashboard-api-response.js';
import isDashboardApiResponse from '../utils/is-dashboard-api-response.js';
import validateString from '../utils/validate-string.js';
import styles from './dashboard.module.scss';

interface IGauge {
  readonly name: string;
  readonly max?: number | undefined;
  readonly severe: number;
  readonly units: string;
  readonly value: number;
  readonly warning: number;
}

const INITIAL_VALUE = 0;
const INITIAL_TUPLE: readonly [number, number] = [INITIAL_VALUE, INITIAL_VALUE];
const LIST_CLASS_NAME: string = validateString(styles['list']);
const PERCENT = 100;

const DASHBOARD_ENDPOINT: string = validateString(
  import.meta.env.DASHBOARD_ENDPOINT,
);

const INITIAL_TIMESERIES: readonly [number, number, number, number] = [
  INITIAL_VALUE,
  INITIAL_VALUE,
  INITIAL_VALUE,
  INITIAL_VALUE,
];

const INITIAL_DATA = {
  cls: INITIAL_TUPLE,
  dcl: INITIAL_TUPLE,
  domComplete: INITIAL_TUPLE,
  fcp: INITIAL_TUPLE,
  fip: INITIAL_TUPLE,
  inp: INITIAL_TUPLE,
  lcp: INITIAL_TUPLE,
  loadEvent: INITIAL_TUPLE,
  loadingTime: INITIAL_TUPLE,
  sessionTimeSpent: 0,
  ttfb: INITIAL_TUPLE,
  viewTimeSpent: 0,

  errorCounts: {
    P50: INITIAL_TIMESERIES,
    P75: INITIAL_TIMESERIES,
    P90: INITIAL_TIMESERIES,
  },
};

const NEXT = 1;
const PREVIOUS = -1;
const sortGauges = (
  { name: aName, severe: aSevere, warning: aWarning, value: aValue }: IGauge,
  { name: bName, severe: bSevere, warning: bWarning, value: bValue }: IGauge,
): number => {
  if (aValue > aSevere) {
    if (bValue > bSevere) {
      return sortStrings(aName, bName);
    }

    return PREVIOUS;
  }

  if (bValue > bSevere) {
    return NEXT;
  }

  if (aValue > aWarning) {
    if (bValue > bWarning) {
      return sortStrings(aName, bName);
    }
    return PREVIOUS;
  }

  if (bValue > bWarning) {
    return NEXT;
  }

  return sortStrings(aName, bName);
};

function DashboardWrapper({ children }: PropsWithChildren): ReactElement {
  return <Section header={<I18n>Dashboard</I18n>}>{children}</Section>;
}

function Dashboard(): ReactElement {
  // Contexts
  const wndw: Window | null = useWindow();

  // States
  const {
    data = INITIAL_DATA,
    error,
    request,
  } = useAsyncState<DashboardApiResponse>();

  // Effects
  useEffect((): void => {
    void request(async (): Promise<DashboardApiResponse> => {
      const response: Response = await window.fetch(DASHBOARD_ENDPOINT);
      const json: unknown = await response.json();
      if (!isDashboardApiResponse(json)) {
        throw new Error('Unknown response');
      }

      return json;
    });
  }, [request]);

  if (typeof error !== 'undefined') {
    if (
      wndw !== null &&
      wndw.location.host === 'localhost:3000' &&
      error.startsWith('Failed to fetch')
    ) {
      return (
        <DashboardWrapper>
          To view the dashboard in development,{' '}
          <Link
            feature="content-security-policy"
            href={DASHBOARD_ENDPOINT}
            title=""
          >
            trust the security certificate.
          </Link>
          <ol style={{ margin: 0 }}>
            <li>
              Visit <CertificateManagerLink feature="content-security-policy" />
              .
            </li>
            <li>
              Under <strong>Trusted Certificates</strong>, click{' '}
              <strong>Import</strong>.
            </li>
          </ol>
        </DashboardWrapper>
      );
    }

    return (
      <DashboardWrapper>
        <Paragraph>
          <strong>An error occurred:</strong> {error}
        </Paragraph>
      </DashboardWrapper>
    );
  }

  const {
    cls: [, cls],
    dcl: [dcl],
    domComplete: [domComplete],
    errorCounts,
    fcp: [, fcp],
    fip: [, fip],
    inp: [, inp],
    lcp: [, lcp],
    loadEvent: [loadEvent],
    loadingTime: [loadingTime],
    sessionTimeSpent,
    ttfb: [, ttfb],
    viewTimeSpent,
  } = data;

  const gauges: readonly IGauge[] = [
    {
      max: 1,
      name: 'Cumulative layout shift p75',
      severe: 25,
      units: '%',
      value: cls * PERCENT,
      warning: 10,
    },
    {
      name: 'DOM complete median',
      severe: 5000,
      units: 'ms',
      value: domComplete,
      warning: 2600,
    },
    {
      name: 'DOM content loaded median',
      severe: 5000,
      units: 'ms',
      value: dcl,
      warning: 2600,
    },
    {
      name: 'First contentful paint p75',
      severe: 3000,
      units: 'ms',
      value: fcp,
      warning: 1800,
    },
    {
      name: 'First input delay p75',
      severe: 300,
      units: 'ms',
      value: fip,
      warning: 100,
    },
    {
      name: 'Interaction to next paint p75',
      severe: 500,
      units: 'ms',
      value: inp,
      warning: 200,
    },
    {
      name: 'Largest contentful paint p75',
      severe: 4000,
      units: 'ms',
      value: lcp,
      warning: 2500,
    },
    {
      name: 'Load event median',
      severe: 8200,
      units: 'ms',
      value: loadEvent,
      warning: 5000,
    },
    {
      name: 'Loading time p75',
      severe: 8200,
      units: 'ms',
      value: loadingTime,
      warning: 5000,
    },
    {
      name: 'Time to first byte p75',
      severe: 1800,
      units: 'ms',
      value: ttfb,
      warning: 800,
    },
  ];

  return (
    <DashboardWrapper>
      <ul className={LIST_CLASS_NAME}>
        <li style={{ gridColumnEnd: 'span 2' }}>
          <LineChart
            title="Error counts"
            xLabels={['3 weeks ago', '2 weeks ago', 'Last week', 'This week']}
            data={{
              Median: errorCounts.P50,
              P75: errorCounts.P75,
              P90: errorCounts.P90,
            }}
          />
        </li>
        {gauges.toSorted(sortGauges).map(
          ({
            max,
            name,
            severe,
            units,
            value,
            warning,
          }: IGauge): ReactElement => (
            <li key={name}>
              <Paragraph>{name}:</Paragraph>
              <Gauge
                max={max}
                severe={severe}
                value={value}
                warning={warning}
              />
              <Paragraph>
                <NumberFormat>{value}</NumberFormat>
                {units}
              </Paragraph>
            </li>
          ),
        )}
        <li>
          <Paragraph>Time spent median:</Paragraph>
          <ul>
            <li>
              Session:{' '}
              <NumberFormat>
                {Math.round(sessionTimeSpent / MILLISECONDS_PER_SECOND)}
              </NumberFormat>{' '}
              seconds
            </li>
            <li>
              View:{' '}
              <NumberFormat>
                {Math.round(viewTimeSpent / MILLISECONDS_PER_SECOND)}
              </NumberFormat>{' '}
              seconds
            </li>
          </ul>
        </li>
      </ul>
      {/* <h3 style={{ margin: 0 }}>Scalability</h3>
      <ul>
        <li>Requests per second</li>
        <li>ROI, must be &ge; 1</li>
        <li>Availability</li>
        <li>Market funnel, $1 spent &ge; $1 earned</li>
      </ul>
      <h3 style={{ margin: 0 }}>Security</h3>
      <ul>
        <li>CSRF blocked</li>
        <li>Cloudflare DDoS + blocked IP counts</li>
        <li>AuthN/AuthZ error counts</li>
        <li>Anomaly detection on the above ratios</li>
      </ul> */}
    </DashboardWrapper>
  );
}

export default memo(Dashboard);
