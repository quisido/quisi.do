import GraphQLObjectQuery from '../utils/graphql-object-query.js';

export default new GraphQLObjectQuery({
  cost: true,
  viewer: {
    budget: true,
    accounts: {
      __params: {
        filter: {
          accountTag: '$accountTag',
        },
      },

      rumPerformanceEventsAdaptiveGroups: {
        count: true,

        __params: {
          limit: 1,
          // orderBy: ['avg_connectionTime_ASC'],
          filter: {
            datetime_gt: '$datetime_gt',
          },
        },

        avg: {
          connectionTime: true,
          dnsTime: true,
          firstContentfulPaint: true,
          firstPaint: true,
          loadEventTime: true,
          pageLoadTime: true,
          pageRenderTime: true,
          requestTime: true,
          responseTime: true,
          sampleInterval: true,
        },

        sum: {
          visits: true,
        },
      },
    },
  },
}).toString();
