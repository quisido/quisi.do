'use client';

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

const LIST_CLASS_NAME: string = validateString(styles['list']);

const DASHBOARD_ENDPOINT: string = validateString(
  process.env['DASHBOARD_ENDPOINT'],
);

function DashboardWrapper({ children }: PropsWithChildren): ReactElement {
  return (
    <Section header={<I18n>quisi.do's dashboard</I18n>}>{children}</Section>
  );
}

function Dashboard(): ReactElement {
  // Contexts
  const wndw: Window | null = useWindow();

  // States
  const { data, error, initiated, loading, request } =
    useAsyncState<DashboardApiResponse>();

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

  if (!initiated) {
    return <DashboardWrapper>Initializing</DashboardWrapper>;
  }

  if (loading) {
    return <DashboardWrapper>Loading</DashboardWrapper>;
  }

  if (typeof error !== 'undefined') {
    if (
      wndw !== null &&
      wndw.location.origin === 'https://localhost:3000' &&
      error === 'Failed to fetch'
    ) {
      return (
        <Section header="Content Security Policy">
          To view the dashboard in development,{' '}
          <Link
            feature="content-security-policy"
            href={DASHBOARD_ENDPOINT}
            title=""
          >
            trust the security certificate.
          </Link>
          <ol>
            <li>
              Visit <CertificateManagerLink feature="content-security-policy" />
              .
            </li>
            <li>
              Under <strong>Trusted Certificates</strong>, click{' '}
              <strong>Import</strong>.
            </li>
          </ol>
        </Section>
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
  return (
    <DashboardWrapper>
      <ul className={LIST_CLASS_NAME}>
        <li>
          <Paragraph>Cumulative layout shift p75:</Paragraph>
          <Gauge max={1} severe={0.25} value={cls} warning={0.1} />
          <Paragraph>
            <NumberFormat>{cls}</NumberFormat>
          </Paragraph>
        </li>
        <li>
          <Paragraph>DOM complete median:</Paragraph>
          <Gauge severe={5000} value={domComplete} warning={2600} />
          <Paragraph>
            <NumberFormat>{domComplete}</NumberFormat>ms
          </Paragraph>
        </li>
        <li>
          <Paragraph>DOM content loaded median:</Paragraph>
          <Gauge severe={5000} value={dcl} warning={2600} />
          <Paragraph>
            <NumberFormat>{dcl}</NumberFormat>ms
          </Paragraph>
        </li>
        <li>
          <Paragraph>First contentful paint p75:</Paragraph>
          <Gauge severe={3000} value={fcp} warning={1800} />
          <Paragraph>
            <NumberFormat>{fcp}</NumberFormat>ms
          </Paragraph>
        </li>
        <li>
          <Paragraph>First input delay p75:</Paragraph>
          <Gauge severe={300} value={fip} warning={100} />
          <Paragraph>
            <NumberFormat>{fip}</NumberFormat>ms
          </Paragraph>
        </li>
        <li>
          <Paragraph>Interaction to next paint p75:</Paragraph>
          <Gauge severe={500} value={inp} warning={200} />
          <Paragraph>
            <NumberFormat>{inp}</NumberFormat>ms
          </Paragraph>
        </li>
        <li>
          <Paragraph>Largest contentful paint p75:</Paragraph>
          <Gauge severe={4000} value={lcp} warning={2500} />
          <Paragraph>
            <NumberFormat>{lcp}</NumberFormat>ms
          </Paragraph>
        </li>
        <li>
          <Paragraph>Load event median:</Paragraph>
          <Gauge severe={8200} value={loadEvent} warning={5000} />
          <Paragraph>
            <NumberFormat>{loadEvent}</NumberFormat>ms
          </Paragraph>
        </li>
        <li>
          <Paragraph>Loading time p75:</Paragraph>
          <Gauge severe={8200} value={loadingTime} warning={5000} />
          <Paragraph>
            <NumberFormat>{loadingTime}</NumberFormat>ms
          </Paragraph>
        </li>
        <li>
          <Paragraph>Time to first byte p75:</Paragraph>
          <Gauge severe={1800} value={ttfb} warning={800} />
          <Paragraph>
            <NumberFormat>{ttfb}</NumberFormat>ms
          </Paragraph>
        </li>
        <li>
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
