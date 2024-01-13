import GraphQLObjectQuery from '../utils/graphql-object-query.js';

export default new GraphQLObjectQuery({
  cost: true,
  viewer: {
    budget: true,
    zones: {
      __params: {
        filter: {
          zoneTag: '$zoneTag',
        },
      },

      httpRequests1hGroups: {
        __params: {
          limit: 10000,
          // orderBy: ['datetime_ASC'],
          filter: {
            datetime_gt: '$datetime_gt',
          },
        },

        /*
        dimensions: {
          timeslot: 'datetime',
        },
        */

        sum: {
          bytes: true,
          cachedBytes: true,
          cachedRequests: true,
          encryptedBytes: true,
          encryptedRequests: true,
          pageViews: true,
          requests: true,
          threats: true,

          /*
          browserMap: {
            key: 'uaBrowserFamily',
            pageViews: true,
          },
          */

          clientSSLMap: {
            key: 'clientSSLProtocol',
            requests: true,
          },

          /*
          contentTypeMap: {
            bytes: true,
            key: 'edgeResponseContentTypeName',
            requests: true,
          },
          */

          countryMap: {
            bytes: true,
            key: 'clientCountryName',
            requests: true,
            threats: true,
          },

          /*
          ipClassMap: {
            key: 'ipType',
            requests: true,
          },
          */

          responseStatusMap: {
            key: 'edgeResponseStatus',
            requests: true,
          },

          threatPathingMap: {
            key: 'threatPathingName',
            requests: true,
          },
        },

        uniq: {
          uniques: true,
        },
      },
    },
  },
}).toString();
