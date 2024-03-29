import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../../../../components/div.js';
import Gauge from '../../../../components/gauge.js';
import LoadingIcon from '../../../../components/loading-icon.js';
import Section from '../../../../components/section.js';
import Span from '../../../../components/span.js';
import Status from '../../constants/status.js';
import mapStatusToEmoji from '../../utils/map-status-to-emoji.js';

interface Props {
  readonly clsP95: number;
  readonly clsTm95: number;
  readonly error: string | null;
  readonly fidP95: number;
  readonly fidTm95: number;
  readonly initiated: boolean;
  readonly lcpP95: number;
  readonly lcpTm95: number;
  readonly loading: boolean;
}

const CUMULATIVE_LAYOUT_GOOD_THRESHOLD = 0.1;
const CUMULATIVE_LAYOUT_POOR_THRESHOLD = 0.25;
const FIRST_INPUT_DELAY_GOOD_THRESHOLD = 100;
const FIRST_INPUT_DELAY_POOR_THRESHOLD = 300;
const LARGEST_CONTENTFUL_PAINT_GOOD_THRESHOLD = 2500;
const LARGEST_CONTENTFUL_PAINT_POOR_THRESHOLD = 4000;

export default function WebVitals({
  clsP95,
  clsTm95,
  error,
  fidP95,
  fidTm95,
  initiated,
  lcpP95,
  lcpTm95,
  loading,
}: Props): ReactElement {
  if (!initiated) {
    return (
      <Section header={<I18n>Web Vitals</I18n>}>
        <I18n>Initiating</I18n>
      </Section>
    );
  }

  if (error !== null) {
    return (
      <Section header={<I18n>Web Vitals</I18n>}>
        <Span element="p">{error}</Span>
      </Section>
    );
  }

  if (loading) {
    return (
      <Section header={<I18n>Web Vitals</I18n>}>
        <LoadingIcon /> <I18n>Loading Web Vitals</I18n>
      </Section>
    );
  }

  const clsStatus: Status =
    clsTm95 <= CUMULATIVE_LAYOUT_GOOD_THRESHOLD &&
    clsP95 <= CUMULATIVE_LAYOUT_POOR_THRESHOLD
      ? Status.Good
      : clsTm95 <= CUMULATIVE_LAYOUT_POOR_THRESHOLD
        ? Status.NeedsImprovement
        : Status.Poor;

  const fidStatus: Status =
    fidTm95 <= FIRST_INPUT_DELAY_GOOD_THRESHOLD &&
    fidP95 <= FIRST_INPUT_DELAY_POOR_THRESHOLD
      ? Status.Good
      : fidTm95 <= FIRST_INPUT_DELAY_POOR_THRESHOLD
        ? Status.NeedsImprovement
        : Status.Poor;

  const lcpStatus: Status =
    lcpTm95 <= LARGEST_CONTENTFUL_PAINT_GOOD_THRESHOLD &&
    lcpP95 <= LARGEST_CONTENTFUL_PAINT_POOR_THRESHOLD
      ? Status.Good
      : lcpTm95 <= LARGEST_CONTENTFUL_PAINT_POOR_THRESHOLD
        ? Status.NeedsImprovement
        : Status.Poor;

  return (
    <Section
      header={
        <>
          <I18n>Web Vitals</I18n>{' '}
          {clsStatus === Status.Poor ||
          fidStatus === Status.Poor ||
          lcpStatus === Status.Poor
            ? mapStatusToEmoji(Status.Poor)
            : clsStatus === Status.NeedsImprovement ||
                fidStatus === Status.NeedsImprovement ||
                lcpStatus === Status.NeedsImprovement
              ? mapStatusToEmoji(Status.NeedsImprovement)
              : mapStatusToEmoji(Status.Good)}
        </>
      }
    >
      <Div display="flex" justifyContent="space-around">
        <Div display="flex" flexDirection="column">
          <Span>
            <I18n>Cumulative Layout Shift</I18n> {mapStatusToEmoji(clsStatus)}
          </Span>
          <Gauge
            max={0.1}
            size={240}
            values={{
              average: clsTm95,
              max: clsP95,
            }}
          />
        </Div>
        <Div>
          <I18n>First Input Delay</I18n> {mapStatusToEmoji(fidStatus)}
          <Gauge
            max={300}
            size={240}
            units="ms"
            values={{
              average: fidTm95,
              max: fidP95,
            }}
          />
        </Div>
        <Div>
          <I18n>Largest Contentful Paint</I18n> {mapStatusToEmoji(lcpStatus)}
          <Gauge
            max={4000}
            size={240}
            units="ms"
            values={{
              average: lcpTm95,
              max: lcpP95,
            }}
          />
        </Div>
      </Div>
    </Section>
  );
}
