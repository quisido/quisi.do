import GraphQLObjectQuery from '../utils/graphql-object-query';

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

      workersInvocationsAdaptive: {
        __params: {
          limit: 1,
          // orderBy: ['avg_sampleInterval_ASC'],
          filter: {
            datetime_gt: '$datetime_gt',
          },
        },

        quantiles: {
          cpuTimeP25: true,
          cpuTimeP50: true,
          cpuTimeP75: true,
          cpuTimeP90: true,
          cpuTimeP99: true,
          cpuTimeP999: true,
          durationP25: true,
          durationP50: true,
          durationP75: true,
          durationP90: true,
          durationP99: true,
          durationP999: true,
          responseBodySizeP25: true,
          responseBodySizeP50: true,
          responseBodySizeP75: true,
          responseBodySizeP90: true,
          responseBodySizeP99: true,
          responseBodySizeP999: true,
          wallTimeP25: true,
          wallTimeP50: true,
          wallTimeP75: true,
          wallTimeP90: true,
          wallTimeP99: true,
          wallTimeP999: true,
        },
      },
    },
  },
}).toString();
