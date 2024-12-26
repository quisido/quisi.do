import type { RUMApiAggregateRUMEventsRequest } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/index.js';

export const AGGREGATE_DATADOG_RUM_EVENTS_REQUEST: RUMApiAggregateRUMEventsRequest =
  {
    body: {
      compute: [
        {
          aggregation: 'pc75',
          metric: '@view.cumulative_layout_shift',
        },
        {
          aggregation: 'pc75',
          metric: '@view.first_contentful_paint',
        },
        {
          aggregation: 'pc75',
          metric: '@view.interaction_to_next_paint',
        },
        {
          aggregation: 'pc75',
          metric: '@view.largest_contentful_paint',
        },
        {
          aggregation: 'pc75',
          metric: '@view.loading_time',
        },
      ],

      filter: {
        from: 'now-2w',
        to: 'now',
      },

      // @ts-expect-error: 'search' does not exist in type 'RUMAggregateRequest'
      search: {
        query:
          '@application.id:e29eb164-e193-4380-b512-ebd70bbfaeb6 @type:view',
      },
    },
  };
