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
        __params: {
          limit: 1,
          // orderBy: ['avg_connectionTime_ASC'],
          filter: {
            datetime_gt: '$datetime_gt',
          },
        },

        quantiles: {
          loadEventTimeP50: true,
          loadEventTimeP75: true,
          loadEventTimeP90: true,
          loadEventTimeP99: true,
          pageLoadTimeP50: true,
          pageLoadTimeP75: true,
          pageLoadTimeP90: true,
          pageLoadTimeP99: true,
          pageRenderTimeP50: true,
          pageRenderTimeP75: true,
          pageRenderTimeP90: true,
          pageRenderTimeP99: true,
          requestTimeP50: true,
          requestTimeP75: true,
          requestTimeP90: true,
          requestTimeP99: true,
          responseTimeP50: true,
          responseTimeP75: true,
          responseTimeP90: true,
          responseTimeP99: true,
        },
      },
    },
  },
}).toString();
