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

      workersAnalyticsEngineAdaptiveGroups: {
        count: true,
        __params: {
          limit: 1,
          // orderBy: ['count_ASC'],
          filter: {
            datetime_gt: '$datetime_gt',
          },
        },
      },
    },
  },
}).toString();
