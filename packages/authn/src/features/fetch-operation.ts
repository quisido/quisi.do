import { parse } from 'cookie';
import formUrlEncoded from 'form-urlencoded';
import { JsonApiDataStore } from 'jsonapi-datastore';
import { mapEntriesToRecord } from 'm7e';
import EPOCH_SECONDS_OFFSET from '../constants/epoch-seconds-offset.js';
import ErrorCode from '../constants/error-code.js';
import MetricName from '../constants/metric-name.js';
import OAuthProvider from '../constants/oauth-provider.js';
import PatreonGender from '../constants/patreon-gender.js';
import StatusCode from '../constants/status-code.js';
import { MILLISECONDS_PER_SECOND } from '../constants/time.js';
import USER_AGENT from '../constants/user-agent.js';
import type Cause from '../types/cause.js';
import type OAuthUser from '../types/oauth-user.js';
import createThrottler from '../utils/create-throttler.js';
import isObject from '../utils/is-object.js';
import mapPatreonGenderToGender from '../utils/map-patreon-gender-to-gender.js';
import mapReadableStreamToString from '../utils/map-readable-stream-to-string.js';
import mapThrottleErrorToLastCallTime from '../utils/map-throttle-error-to-last-call-time.js';
import serialize from '../utils/serialize.js';
import CloudflareWorkerOperation from './cloudflare-worker-operation.js';

interface CreatePatreonErrorOptions {
  readonly clientId: string;
  readonly code: string;
  readonly json: Record<'error', unknown>;
  readonly status: StatusCode;
}

interface GetOAuthUserOptions {
  readonly patreonClientId: string;
  readonly patreonClientSecret: string;
  readonly patreonHost: string;
  readonly patreonRedirectUri: string;
}

const FORBIDDEN = 403;
const HTTP_REDIRECTION = 300;
const HTTP_SUCCESSFUL = 200;
const IP_THROTTLE_LIMIT = 10000;
const PATREON_BASE_PATH = '/api/oauth2/v2';
const PATREON_GENDERS: Set<unknown> = new Set(Object.values(PatreonGender));
const throttleIp = createThrottler();

const GET_USER_ID_QUERY = `
SELECT \`userId\`
FROM \`oauth\`
WHERE \`oauthProvider\` = ?
  AND \`oauthId\` = ?
LIMIT 1;
`;

const INSERT_INTO_EMAILS_QUERY = `
INSERT INTO \`emails\` (\`address\`, \`userId\`)
VALUES (?, ?);
`;

const INSERT_INTO_OAUTH_QUERY = `
INSERT INTO \`oauth\` (\`oauthId\`, \`oauthProvider\`, \`userId\`)
VALUES (?, ?, ?);
`;

const INSERT_INTO_USERS_QUERY = `
INSERT INTO \`users\` (
  \`firstName\`,
  \`fullName\`,
  \`gender\`,
  \`registrationTimestamp\`
)
VALUES (?, ?, ?, ?);
`;

const isPatreonGender = (value: unknown): value is PatreonGender =>
  PATREON_GENDERS.has(value);

const PATREON_FIELDS: URLSearchParams = new URLSearchParams({
  'fields[user]': [
    'email',
    'first_name',
    'full_name',
    'is_email_verified',
  ].join(','),
});

const PATREON_HEADERS: Headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'User-Agent': USER_AGENT,
});

const PATREON_SEARCH: string = PATREON_FIELDS.toString();

export default class FetchOperation extends CloudflareWorkerOperation<
  Cause,
  MetricName
> {
  private readonly _ctx: ExecutionContext;

  private readonly _request: Request;

  private _returnHref: string | undefined;

  public constructor(traceId: string, request: Request, ctx: ExecutionContext) {
    super(traceId);
    this._ctx = ctx;
    this._request = request;
  }

  public get sessionId(): string {
    const sessionId: string | undefined = this._cookies['__Secure-Session-ID'];
    this.assert(
      typeof sessionId === 'string',
      'The session ID cookie is missing.',
      {
        code: ErrorCode.MissingSessionIDCookie,
        privateData: this._cookies,
        publicData: Object.keys(this._cookies),
        status: StatusCode.BadRequest,
      },
    );
    return sessionId;
  }

  private get _cookieHeader(): string {
    const cookieHeader: string | null = this._request.headers.get('Cookie');
    this.assert(cookieHeader !== null, 'The cookies are missing. 🍪', {
      code: ErrorCode.MissingCookies,
      publicData: Array.from(this._request.headers.keys()),
      status: StatusCode.BadRequest,
      privateData: mapEntriesToRecord(
        Array.from(this._request.headers.entries()),
      ),
    });
    return cookieHeader;
  }

  private get _cookies(): Partial<Record<string, string>> {
    return parse(this._cookieHeader);
  }

  public createReturnHref(
    host: string,
    sessionId: string,
    stateSearchParam: string,
  ): string {
    const state: unknown = this._parseJson(
      stateSearchParam,
      ErrorCode.NonJsonState,
    );

    this.assert(isObject(state), 'Expected state to be a string.', {
      code: ErrorCode.NonObjectState,
      privateData: state,
      publicData: typeof state,
      status: StatusCode.BadRequest,
    });

    const stateKeys: readonly string[] = Object.keys(state);
    this.assert('returnPath' in state, 'Missing return path in state.', {
      code: ErrorCode.MissingReturnPath,
      privateData: state,
      publicData: stateKeys,
      status: StatusCode.BadRequest,
    });

    this.assert(
      'sessionId' in state,
      'Expected state to contain a session ID.',
      {
        code: ErrorCode.MissingSessionIDState,
        privateData: state,
        publicData: stateKeys,
        status: StatusCode.BadRequest,
      },
    );

    const { returnPath, sessionId: stateSessionId } = state;
    this.assert(
      typeof returnPath === 'string',
      'Expected the return path to be a string.',
      {
        code: ErrorCode.NonStringReturnPath,
        privateData: returnPath,
        publicData: typeof returnPath,
        status: StatusCode.BadRequest,
      },
    );

    // Cross-site request forgery (CSRF)
    this.assert(
      sessionId === stateSessionId,
      'Expected this session to have initiated this request.',
      {
        code: ErrorCode.CSRF,
        status: StatusCode.BadRequest,
      },
    );

    const returnHref = `https://${host}${returnPath}`;
    this._returnHref = returnHref;
    return returnHref;
  }

  public async createUser(
    usersDb: D1Database,
    oAuthProvider: OAuthProvider,
    { email, firstName, fullName, gender, id: oAuthId }: OAuthUser,
  ): Promise<number> {
    const nowSeconds: number = Date.now() / MILLISECONDS_PER_SECOND;
    const usersStatement = usersDb.prepare(INSERT_INTO_USERS_QUERY).bind(
      firstName,
      fullName,
      gender,
      Math.floor(nowSeconds - EPOCH_SECONDS_OFFSET), // `registrationTimestamp`
    );

    const {
      meta: {
        changes: usersChanges,
        duration: usersDuration,
        last_row_id: usersLastRowId,
        size_after: usersSizeAfter,
      },
    } = await usersStatement.run();
    this.emit(MetricName.UserInserted, usersLastRowId, {
      changes: usersChanges,
      duration: usersDuration,
      sizeAfter: usersSizeAfter,
    });

    this._ctx.waitUntil(
      usersDb
        .prepare(INSERT_INTO_OAUTH_QUERY)
        .bind(oAuthId, oAuthProvider, usersLastRowId)
        .run()
        .then(
          ({
            meta: {
              changes: oAuthChanges,
              duration: oAuthDuration,
              last_row_id: oAuthLastRowId,
              size_after: oAuthSizeAfter,
            },
          }: D1Result): void => {
            this.emit(MetricName.OAuthInserted, oAuthLastRowId, {
              changes: oAuthChanges,
              duration: oAuthDuration,
              sizeAfter: oAuthSizeAfter,
            });
          },
        )
        .catch((err: unknown): void => {
          this.logErrorPrivately(err);
          this.emit(MetricName.FailedOAuthInsert);
        }),
    );

    if (email !== null) {
      this._ctx.waitUntil(
        usersDb
          .prepare(INSERT_INTO_EMAILS_QUERY)
          .bind(email, usersLastRowId)
          .run()
          .then(
            ({
              meta: {
                changes: emailsChanges,
                duration: emailsDuration,
                last_row_id: emailsLastRowId,
                size_after: emailsSizeAfter,
              },
            }: D1Result): void => {
              this.emit(MetricName.EmailInserted, emailsLastRowId, {
                changes: emailsChanges,
                duration: emailsDuration,
                lastRowId: emailsLastRowId,
                sizeAfter: emailsSizeAfter,
              });
            },
          )
          .catch((err: unknown): void => {
            this.logErrorPrivately(err);
            this.emit(MetricName.FailedEmailInsert);
          }),
      );
    }

    return usersLastRowId;
  }

  public async getOAuthUser({
    patreonClientId,
    patreonClientSecret,
    patreonHost,
    patreonRedirectUri,
  }: GetOAuthUserOptions): Promise<
    OAuthUser & Record<'provider', OAuthProvider>
  > {
    const { pathname, searchParams } = new URL(this._request.url);

    this.assert(pathname === '/patreon/', 'Not found.', {
      code: ErrorCode.NotFound,
      publicData: pathname,
      status: StatusCode.NotFound,
    });

    switch (pathname) {
      case '/patreon/': {
        this.emit(MetricName.PatreonRequest);
        const code: string | null = searchParams.get('code');
        this.assert(code !== null, 'Expected a Patreon code.', {
          code: ErrorCode.MissingCode,
          privateData: mapEntriesToRecord(Array.from(searchParams.entries())),
          status: StatusCode.Unauthorized,
        });

        return {
          provider: OAuthProvider.Patreon,
          ...(await this.getPatreonUser(
            patreonHost,
            patreonClientId,
            patreonClientSecret,
            patreonRedirectUri,
            code,
          )),
        };
      }
    }
  }

  public async getPatreonUser(
    host: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    code: string,
  ): Promise<OAuthUser> {
    const makeRequest = await this._createPatreonApiClient(
      host,
      clientId,
      clientSecret,
      redirectUri,
      code,
    );

    const store: JsonApiDataStore = await makeRequest(
      `/identity?${PATREON_SEARCH}`,
    );
    const [firstUser] = store.findAll('user').map(serialize);

    this.assert(
      typeof firstUser !== 'undefined',
      'Expected to find a Patreon user.',
      {
        code: ErrorCode.MissingPatreonUser,
        status: StatusCode.BadGateway,
      },
    );

    this.assert(
      'data' in firstUser,
      'Expected the Patreon user to contain data.',
      {
        code: ErrorCode.MissingPatreonUserData,
        privateData: firstUser,
        status: StatusCode.BadGateway,
      },
    );

    const { data } = firstUser;
    this.assert(
      isObject(data),
      'Expected the Patreon user data to be an object.',
      {
        code: ErrorCode.NonObjectPatreonUserData,
        privateData: data,
        status: StatusCode.BadGateway,
      },
    );

    this.assert(
      'attributes' in data,
      'Expected the Patreon user to have attributes.',
      {
        code: ErrorCode.MissingPatreonUserAttributes,
        privateData: data,
        status: StatusCode.BadGateway,
      },
    );

    this.assert('id' in data, 'Expected the Patreon user to have an ID.', {
      code: ErrorCode.MissingPatreonUserId,
      privateData: data,
      status: StatusCode.BadGateway,
    });

    this.assert('type' in data, 'Expected the Patreon user to have a type.', {
      code: ErrorCode.MissingPatreonUserType,
      privateData: data,
      status: StatusCode.BadGateway,
    });

    const { attributes, id, type } = data;
    this.assert(
      isObject(attributes),
      'Expected the Patreon user attributes to be an object.',
      {
        code: ErrorCode.NonObjectPatreonUserAttributes,
        privateData: attributes,
        status: StatusCode.BadGateway,
      },
    );

    this.assert(
      typeof id === 'string',
      'Expected the Patreon user ID to be a string.',
      {
        code: ErrorCode.NonStringPatreonUserId,
        privateData: id,
        status: StatusCode.BadGateway,
      },
    );

    this.assert(
      type === 'user',
      'Expected a Patreon user type.', // 🤔
      {
        code: ErrorCode.NonPatreonUserType,
        publicData: type,
        status: StatusCode.BadGateway,
      },
    );

    this.assert(
      'first_name' in attributes,
      'Expected the Patreon user to have a first name.',
      {
        code: ErrorCode.MissingPatreonUserFirstName,
        privateData: attributes,
        status: StatusCode.BadGateway,
      },
    );

    this.assert(
      'full_name' in attributes,
      'Expected the Patreon user to have a full name.',
      {
        code: ErrorCode.MissingPatreonUserFullName,
        privateData: attributes,
        status: StatusCode.BadGateway,
      },
    );

    /**
     *   Technical debt: Search for the `google_id` in an attempt to find accounts
     * to merge with this one.
     */
    const {
      first_name: firstName,
      full_name: fullName,
      // email,
      // is_email_verified: isEmailVerified,
    } = attributes;

    this.assert(
      typeof firstName === 'string',
      "Expected the Patreon user's first name to be a string.",
      {
        code: ErrorCode.NonStringPatreonUserFirstName,
        privateData: firstName,
        publicData: typeof firstName,
        status: StatusCode.BadGateway,
      },
    );

    this.assert(
      typeof fullName === 'string',
      "Expected the Patreon user's full name to be a string.",
      {
        code: ErrorCode.NonStringPatreonUserFullName,
        privateData: fullName,
        publicData: typeof fullName,
        status: StatusCode.BadGateway,
      },
    );

    const gender: PatreonGender =
      'gender' in attributes && isPatreonGender(attributes.gender)
        ? attributes.gender
        : PatreonGender.Neutral;

    const getEmail = (): string | null => {
      if (!('email' in attributes)) {
        this.emit(MetricName.MissingPatreonEmail);
        return null;
      }

      if (!('is_email_verified' in attributes)) {
        this.emit(MetricName.MissingPatreonEmailVerification);
        return null;
      }

      const { email, is_email_verified: isEmailVerified } = attributes;
      if (typeof email !== 'string') {
        this.emit(MetricName.NonStringPatreonEmail);
        return null;
      }

      if (isEmailVerified !== true) {
        this.emit(MetricName.UnverifiedPatreonEmail);
        return null;
      }

      return email;
    };

    return {
      email: getEmail(),
      firstName,
      fullName,
      gender: mapPatreonGenderToGender(gender),
      id,
    };
  }

  public async getUserId(
    db: D1Database,
    oauthProvider: OAuthProvider,
    oauthId: string,
  ): Promise<number | null> {
    const statement: D1PreparedStatement = db
      .prepare(GET_USER_ID_QUERY)
      .bind(oauthProvider, oauthId);

    const {
      meta: { duration, size_after: sizeAfter },
      results,
    } = await statement.run();

    this.emit(MetricName.OAuthUserIdSelected, {
      duration,
      sizeAfter,
    });

    const [firstResult] = results;
    if (!isObject(firstResult)) {
      return null;
    }

    this.assert(
      'userId' in firstResult,
      'Expected OAuth result to have a user ID.',
      {
        code: ErrorCode.MissingOAuthUserId,
        privateData: firstResult,
        status: StatusCode.InternalServerError,
      },
    );

    const { userId } = firstResult;
    this.assert(
      typeof userId === 'number',
      'Expected OAuth user ID to be numeric.',
      {
        code: ErrorCode.NonNumberOAuthUserId,
        privateData: firstResult,
        publicData: typeof userId,
        status: StatusCode.InternalServerError,
      },
    );

    return userId;
  }

  public throttle(request: Request): void {
    const ip: string | null = request.headers.get('CF-Connecting-IP');

    this.assert(ip !== null, 'Expected a Cloudflare connecting IP.', {
      code: ErrorCode.MissingIP,
      status: StatusCode.BadRequest,
    });

    this._throttleIp(ip);
  }

  public override createError(message: string, cause: Cause): Error {
    return super.createError(message, {
      ...cause,
      returnHref: this._returnHref,
    });
  }

  private async _createPatreonApiAccessToken(
    host: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    code: string,
  ): Promise<string> {
    const response: Response = await fetch(`${host}/api/oauth2/token`, {
      headers: PATREON_HEADERS,
      method: 'POST',
      body: formUrlEncoded({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (
      response.status < HTTP_SUCCESSFUL ||
      response.status >= HTTP_REDIRECTION
    ) {
      this.assert(
        response.body !== null,
        'Expected a Patreon OAuth token error body.',
        {
          code: ErrorCode.MissingPatreonOAuthTokenErrorBody,
          status: StatusCode.BadGateway,
        },
      );

      const body: string = await mapReadableStreamToString(response.body);
      const json: unknown = this._parseJson(
        body,
        ErrorCode.NonJsonPatreonOAuthTokenErrorBody,
      );

      this.assert(
        isObject(json),
        'Expected the Patreon OAuth token error to be an object.',
        {
          code: ErrorCode.NonObjectPatreonOAuthTokenError,
          privateData: json,
          publicData: typeof json,
          status: StatusCode.BadGateway,
        },
      );

      this.assert('error' in json, 'Missing Patreon OAuth token error code.', {
        code: ErrorCode.MissingPatreonOAuthTokenErrorCode,
        status: StatusCode.BadGateway,
      });

      throw this._createPatreonError({
        clientId,
        code,
        json,
        status: response.status,
      });
    }

    const json: unknown = await response.json();
    this.assert(
      isObject(json),
      'Expected the Patreon OAuth token response to be an object.',
      {
        code: ErrorCode.NonObjectPatreonOAuthTokenResponse,
        privateData: json,
        publicData: typeof json,
        status: StatusCode.BadGateway,
      },
    );

    this.assert('access_token' in json, 'Missing Patreon OAuth access token.', {
      code: ErrorCode.MissingPatreonOAuthAccessToken,
      status: response.status,
    });

    this.assert(
      typeof json.access_token === 'string',
      'Expected the Patreon OAuth access token to be a string.',
      {
        code: ErrorCode.NonStringPatreonOAuthAccessToken,
        privateData: json.access_token,
        publicData: typeof json.access_token,
        status: response.status,
      },
    );

    return json.access_token;
  }

  private async _createPatreonApiClient(
    host: string,
    id: string,
    secret: string,
    redirectUrl: string,
    code: string,
  ): Promise<(pathname: string) => Promise<JsonApiDataStore>> {
    const accessToken: string = await this._createPatreonApiAccessToken(
      host,
      id,
      secret,
      redirectUrl,
      code,
    );

    const requestInit: RequestInit = {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': USER_AGENT,
      }),
    };

    return async (requestSpec: string): Promise<JsonApiDataStore> => {
      const response: Response = await fetch(
        `${host}${PATREON_BASE_PATH}${requestSpec}`,
        requestInit,
      );

      const json: unknown = await response.json();
      this.assert(response.status !== FORBIDDEN, 'Forbidden by Patreon.', {
        code: ErrorCode.PatreonForbidden,
        privateData: json,
        status: StatusCode.Forbidden,
      });

      this.assert(
        response.status >= HTTP_SUCCESSFUL &&
          response.status < HTTP_REDIRECTION,
        `Patreon status ${response.status}`,
        {
          code: ErrorCode.NonOkResponseStatus,
          privateData: json,
          status: response.status,
        },
      );

      this.assert(
        isObject(json),
        `Expected \`${host}${requestSpec}\` to be an object.`,
        {
          code: ErrorCode.NonObjectPatreonRequestSpec,
          privateData: json,
          publicData: typeof json,
          status: StatusCode.BadGateway,
        },
      );

      const store: JsonApiDataStore = new JsonApiDataStore();
      store.sync(json);
      return store;
    };
  }

  private _createPatreonError({
    clientId,
    code,
    json,
    status,
  }: CreatePatreonErrorOptions): Error {
    switch (json.error) {
      case 'invalid_client':
        return this.createError('Invalid Patreon client ID.', {
          code: ErrorCode.InvalidPatreonClientId,
          publicData: clientId,
          status,
        });

      case 'invalid_grant':
        return this.createError('Invalid Patreon grant code.', {
          code: ErrorCode.InvalidPatreonGrantCode,
          privateData: code,
          status,
        });

      case 'invalid_request': {
        this.assert(
          'error_description' in json,
          'Missing Patreon OAuth invalid token request description.',
          {
            code: ErrorCode.MissingPatreonOAuthInvalidTokenRequestDescription,
            privateData: json,
            status: StatusCode.BadGateway,
          },
        );

        this.assert(
          typeof json.error_description === 'string',
          'Expected Patreon OAuth invalid token request description to be a string.',
          {
            code: ErrorCode.NonStringPatreonOAuthInvalidTokenRequestDescription,
            privateData: json.error_description,
            publicData: typeof json.error_description,
            status: StatusCode.BadGateway,
          },
        );

        return this.createError(json.error_description, {
          code: ErrorCode.InvalidPatreonOAuthTokenRequest,
          privateData: json,
          status,
        });
      }

      default:
        return this.createError('Unknown Patreon OAuth token error.', {
          code: ErrorCode.UnknownPatreonOAuthTokenError,
          privateData: json,
          status,
        });
    }
  }

  private _parseJson(value: string, errorCode: ErrorCode): unknown {
    try {
      return JSON.parse(value);
    } catch (err: unknown) {
      throw this.createError('Expected JSON.', {
        code: errorCode,
        status: StatusCode.BadRequest,
      });
    }
  }

  private _throttleIp(ip: string): void {
    try {
      throttleIp(ip, IP_THROTTLE_LIMIT);
    } catch (err: unknown) {
      const lastCallTime: number = mapThrottleErrorToLastCallTime(err);
      throw this.createError('Too many requests.', {
        code: ErrorCode.TooManyRequests,
        publicData: Date.now() - lastCallTime,
        status: StatusCode.TooManyRequests,
      });
    }
  }
}
