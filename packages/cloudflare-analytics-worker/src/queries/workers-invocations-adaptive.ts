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
          filter: {
            datetime_gt: '$datetime_gt',
          },
          orderBy: ['avg_sampleInterval_ASC'],
        },

        avg: {
          sampleInterval: null,
        },

        max: {
          cpuTime: null,
          duration: null,
          responseBodySize: null,
          wallTime: null,
        },

        min: {
          cpuTime: null,
          duration: null,
          responseBodySize: null,
          wallTime: null,
        },

        sum: {
          duration: null,
          errors: null,
          requests: null,
          responseBodySize: null,
          subrequests: null,
          wallTime: null,
        },
      },
    },
  },
}).toString();
