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

      workersInvocationsAdaptive: {
        __params: {
          limit: 1,
          // orderBy: ['avg_sampleInterval_ASC'],
          filter: {
            datetime_gt: '$datetime_gt',
          },
        },

        avg: {
          sampleInterval: true,
        },

        max: {
          cpuTime: true,
          duration: true,
          responseBodySize: true,
          wallTime: true,
        },

        min: {
          cpuTime: true,
          duration: true,
          responseBodySize: true,
          wallTime: true,
        },

        sum: {
          duration: true,
          errors: true,
          requests: true,
          responseBodySize: true,
          subrequests: true,
          wallTime: true,
        },
      },
    },
  },
}).toString();
