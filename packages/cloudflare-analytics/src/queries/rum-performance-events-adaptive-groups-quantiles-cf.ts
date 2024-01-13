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
          connectionTimeP50: true,
          connectionTimeP75: true,
          connectionTimeP90: true,
          connectionTimeP99: true,
          dnsTimeP50: true,
          dnsTimeP75: true,
          dnsTimeP90: true,
          dnsTimeP99: true,
          firstContentfulPaintP50: true,
          firstContentfulPaintP75: true,
          firstContentfulPaintP90: true,
          firstContentfulPaintP99: true,
          firstPaintP50: true,
          firstPaintP75: true,
          firstPaintP90: true,
          firstPaintP99: true,
        },
      },
    },
  },
}).toString();
