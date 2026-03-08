import type { RUMCompute } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/index.js';

export const TWO_WEEK_FILTER = { from: 'now-2w', to: 'now' } as const;

export const THREE_WEEK_FILTER = { from: 'now-3w', to: 'now' } as const;

export const SESSION_AND_LAYOUT_COMPUTES: readonly RUMCompute[] = [
  { aggregation: 'median', metric: '@session.time_spent', type: 'total' },
  {
    aggregation: 'median',
    metric: '@view.cumulative_layout_shift',
    type: 'total',
  },
  {
    aggregation: 'pc75',
    metric: '@view.cumulative_layout_shift',
    type: 'total',
  },
  { aggregation: 'median', metric: '@view.dom_complete', type: 'total' },
  { aggregation: 'pc75', metric: '@view.dom_complete', type: 'total' },
  {
    aggregation: 'median',
    metric: '@view.dom_content_loaded',
    type: 'total',
  },
  {
    aggregation: 'pc75',
    metric: '@view.dom_content_loaded',
    type: 'total',
  },
];

export const PERFORMANCE_TIMING_COMPUTES: readonly RUMCompute[] = [
  { aggregation: 'median', metric: '@view.first_byte', type: 'total' },
  { aggregation: 'pc75', metric: '@view.first_byte', type: 'total' },
  {
    aggregation: 'median',
    metric: '@view.first_contentful_paint',
    type: 'total',
  },
  {
    aggregation: 'pc75',
    metric: '@view.first_contentful_paint',
    type: 'total',
  },
  {
    aggregation: 'median',
    metric: '@view.first_input_delay',
    type: 'total',
  },
  { aggregation: 'pc75', metric: '@view.first_input_delay', type: 'total' },
  {
    aggregation: 'median',
    metric: '@view.interaction_to_next_paint',
    type: 'total',
  },
  {
    aggregation: 'pc75',
    metric: '@view.interaction_to_next_paint',
    type: 'total',
  },
  {
    aggregation: 'median',
    metric: '@view.largest_contentful_paint',
    type: 'total',
  },
  {
    aggregation: 'pc75',
    metric: '@view.largest_contentful_paint',
    type: 'total',
  },
];

export const LOAD_TIMING_COMPUTES: readonly RUMCompute[] = [
  { aggregation: 'median', metric: '@view.load_event', type: 'total' },
  { aggregation: 'pc75', metric: '@view.load_event', type: 'total' },
  { aggregation: 'median', metric: '@view.loading_time', type: 'total' },
  { aggregation: 'pc75', metric: '@view.loading_time', type: 'total' },
  { aggregation: 'median', metric: '@view.time_spent', type: 'total' },
];

export const ERROR_COUNT_COMPUTES: readonly RUMCompute[] = [
  {
    aggregation: 'median',
    interval: '1w',
    metric: '@view.error.count',
    type: 'timeseries',
  },
  {
    aggregation: 'pc75',
    interval: '1w',
    metric: '@view.error.count',
    type: 'timeseries',
  },
  {
    aggregation: 'pc90',
    interval: '1w',
    metric: '@view.error.count',
    type: 'timeseries',
  },
];
