import GraphQLObjectQuery from '../utils/graphql-object-query';

export default new GraphQLObjectQuery({
  cost: null,

  viewer: {
    budget: null,

    accounts: {
      __params: {
        filter: {
          accountTag: '$accountTag',
        },
      },

      workersInvocationsAdaptive: {
        __params: {
          limit: 1,
          orderBy: ['avg_sampleInterval_ASC'],

          filter: {
            datetime_gt: '$datetime_gt',
          },
        },

        quantiles: {
          cpuTimeP25: null,
          cpuTimeP50: null,
          cpuTimeP75: null,
          cpuTimeP90: null,
          cpuTimeP99: null,
          cpuTimeP999: null,
          durationP25: null,
          durationP50: null,
          durationP75: null,
          durationP90: null,
          durationP99: null,
          durationP999: null,
          responseBodySizeP25: null,
          responseBodySizeP50: null,
          responseBodySizeP75: null,
          responseBodySizeP90: null,
          responseBodySizeP99: null,
          responseBodySizeP999: null,
          wallTimeP25: null,
          wallTimeP50: null,
          wallTimeP75: null,
          wallTimeP90: null,
          wallTimeP99: null,
          wallTimeP999: null,
        },
      },
    },
  },
}).toString();
