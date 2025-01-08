import type { RUMApiAggregateRUMEventsRequest } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/index.js';
import {
  MEDIAN,
  PERCENTILE_75,
} from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/models/RUMAggregationFunction.js';

export const AGGREGATE_RUM_EVENTS_REQUEST: RUMApiAggregateRUMEventsRequest = {
  body: {
    compute: [
      {
        aggregation: MEDIAN,
        metric: '@view.cumulative_layout_shift',
      },
      {
        aggregation: PERCENTILE_75,
        metric: '@view.cumulative_layout_shift',
      },
      {
        aggregation: MEDIAN,
        metric: '@view.first_contentful_paint',
      },
      {
        aggregation: PERCENTILE_75,
        metric: '@view.first_contentful_paint',
      },
      {
        aggregation: MEDIAN,
        metric: '@view.interaction_to_next_paint',
      },
      {
        aggregation: PERCENTILE_75,
        metric: '@view.interaction_to_next_paint',
      },
      {
        aggregation: MEDIAN,
        metric: '@view.largest_contentful_paint',
      },
      {
        aggregation: PERCENTILE_75,
        metric: '@view.largest_contentful_paint',
      },
      {
        aggregation: MEDIAN,
        metric: '@view.loading_time',
      },
      {
        aggregation: PERCENTILE_75,
        metric: '@view.loading_time',
      },
    ],

    filter: {
      from: 'now-2w',
      to: 'now',
    },

    // @ts-expect-error: 'search' does not exist in type 'RUMAggregateRequest'
    search: {
      query: '@application.id:e29eb164-e193-4380-b512-ebd70bbfaeb6 @type:view',
    },
  },
};
