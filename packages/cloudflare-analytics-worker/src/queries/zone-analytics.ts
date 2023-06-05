import GraphQLObjectQuery from '../utils/graphql-object-query';

export default new GraphQLObjectQuery({
  cost: null,

  viewer: {
    budget: null,

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
          bytes: null,
          cachedBytes: null,
          cachedRequests: null,
          encryptedBytes: null,
          encryptedRequests: null,
          pageViews: null,
          requests: null,
          threats: null,

          /*
          browserMap: {
            key: 'uaBrowserFamily',
            pageViews: null,
          },
          */

          clientSSLMap: {
            key: 'clientSSLProtocol',
            requests: null,
          },

          /*
          contentTypeMap: {
            bytes: null,
            key: 'edgeResponseContentTypeName',
            requests: null,
          },
          */

          countryMap: {
            bytes: null,
            key: 'clientCountryName',
            requests: null,
            threats: null,
          },

          /*
          ipClassMap: {
            key: 'ipType',
            requests: null,
          },
          */

          responseStatusMap: {
            key: 'edgeResponseStatus',
            requests: null,
          },

          threatPathingMap: {
            key: 'threatPathingName',
            requests: null,
          },
        },

        uniq: {
          uniques: null,
        },
      },
    },
  },
}).toString();
