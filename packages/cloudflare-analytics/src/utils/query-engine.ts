import mapApiTokenToHeaders from './map-api-token-to-headers.js';
import mapDateToDatetimeGT from './map-date-to-datetime-gt.js';

export default class QueryEngine {
  private readonly _accountTag: string;

  private readonly _datetimeGT: string;

  private readonly _headers: Headers;

  private readonly _zoneTag: string;

  public constructor(
    apiToken: string,
    accountTag: string,
    zoneTag: string,
    start: Date,
  ) {
    this._accountTag = accountTag;
    this._datetimeGT = mapDateToDatetimeGT(start);
    this._headers = mapApiTokenToHeaders(apiToken);
    this._zoneTag = zoneTag;
  }

  private get variables(): Record<string, string> {
    return {
      accountTag: this._accountTag,
      datetime_gt: this._datetimeGT,
      zoneTag: this._zoneTag,
    };
  }

  // TODO: Replace this with the new API:
  // curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/analytics_engine/sql" -H "Authorization: Bearer <TOKEN>" -d "SHOW TABLES"
  public readonly fetch = async (query: string): Promise<Response> => {
    return fetch('https://api.cloudflare.com/client/v4/graphql', {
      body: this.mapQueryToBody(query),
      headers: this._headers,
      method: 'POST',
    });
  };

  private readonly mapQueryToBody = (query: string): string =>
    JSON.stringify({
      query,
      variables: this.variables,
    });
}
