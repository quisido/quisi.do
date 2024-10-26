export enum ErrorCode {
  // OAuth
  InvalidStateReturnPath = 11,
  InvalidStateSessionId = 51,
  MissingCookies = 12,
  MissingSessionIdCookie = 13,
  MissingState = 4,
  MissingStateReturnPath = 9,
  MissingStateSessionId = 10,
  NonJsonState = 5,
  NonObjectState = 8,

  // Patreon
  InvalidPatreonOAuthClientId = 17,
  InvalidPatreonOAuthClientSecret = 19,
  InvalidPatreonOAuthHost = 21,
  InvalidPatreonOAuthRedirectUri = 23,
  MissingPatreonOAuthClientId = 16,
  MissingPatreonOAuthClientSecret = 18,
  MissingPatreonOAuthRedirectUri = 22,

  // Patreon access token
  ForbiddenPatreonIdentityResponse = 39,
  InvalidInvalidPatreonAccessTokenRequestDescription = 31,
  InvalidPatreonAccessToken = 37,
  InvalidPatreonAccessTokenError = 26,
  InvalidPatreonAccessTokenErrorBody = 24,
  InvalidPatreonAccessTokenRequest = 32,
  InvalidPatreonClientId = 28,
  InvalidPatreonGrantCode = 29,
  InvalidPatreonIdentity = 41,
  InvalidPatreonIdentityData = 43,
  InvalidPatreonIdentityId = 45,
  InvalidPatreonIdentityResponse = 38,
  InvalidPatreonOAuthToken = 35,
  InvalidPatreonOAuthTokenResponse = 34,
  MissingInvalidPatreonAccessTokenRequestDescription = 30,
  MissingPatreonAccessToken = 36,
  MissingPatreonAccessTokenErrorBody = 25,
  MissingPatreonAccessTokenErrorCode = 27,
  MissingPatreonIdentityData = 42,
  MissingPatreonIdentityId = 44,
  MissingPatreonOAuthHost = 52,
  MissingPatreonRequestCode = 15,
  UnknownPatreonAccessTokenErrorCode = 33,
  UnknownPatreonIdentityError = 40,

  // quisi.do
  CSRF = 14,
  InvalidAnalyticsId = 53,
  InvalidAuthnUserIdsNamespace = 20,
  InvalidCause = 3,
  InvalidDatabase = 47,
  InvalidIsolateEnvironment = 6,
  InvalidOAuthUserId = 48,
  InvalidUsageDataset = 50,
  MissingAuthnUserIdsNamespace = 49,
  MissingDatabase = 46,
  MissingIsolateEnvironment = 7,
  NotFound = 404,
  TooManyRequests = 429,
  Unknown = 1,
  UnknownCause = 2,
}
