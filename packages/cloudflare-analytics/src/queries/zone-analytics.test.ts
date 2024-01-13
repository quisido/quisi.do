/// <reference types="jest" />
import ZONE_ANALYTICS_QUERY from './zone-analytics.js';

describe('Zone analytics', (): void => {
  it('should resolve to a valid GraphQL query', (): void => {
    expect(ZONE_ANALYTICS_QUERY).toBe(`{
  cost
  viewer {
    budget
    zones(
      filter: {
        zoneTag: $zoneTag
      }
    ) {
      httpRequests1hGroups(
        limit: 10000,
        filter: {
          datetime_gt: $datetime_gt
        }
      ) {
        sum {
          bytes
          cachedBytes
          cachedRequests
          encryptedBytes
          encryptedRequests
          pageViews
          requests
          threats
          clientSSLMap {
            key: clientSSLProtocol
            requests
          }
          countryMap {
            bytes
            key: clientCountryName
            requests
            threats
          }
          responseStatusMap {
            key: edgeResponseStatus
            requests
          }
          threatPathingMap {
            key: threatPathingName
            requests
          }
        }
        uniq {
          uniques
        }
      }
    }
  }
}`);
  });
});
