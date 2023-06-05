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

      workersAnalyticsEngineAdaptiveGroups: {
        __params: {
          limit: 1,

          filter: {
            datetime_gt: '$datetime_gt',
          },

          orderBy: ['count_ASC'],
        },

        count: null,
      },
    },
  },
}).toString();
