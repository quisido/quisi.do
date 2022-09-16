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

      rumPageloadEventsAdaptiveGroups: {
        count: true,

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

        sum: {
          visits: true,
        },
      },
    },
  },
}).toString();
