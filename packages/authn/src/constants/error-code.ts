enum ErrorCode {
  // OAuth
  MissingCookies = 12,
  MissingSessionIDCookie = 13,
  MissingState = 4,
  MissingStateReturnPath = 9,
  MissingStateSessionID = 10,
  NonJsonState = 5,
  NonObjectState = 8,
  NonStringStateReturnPath = 11,

  // Patreon
  InvalidPatreonOAuthClientID = 17,
  InvalidPatreonOAuthClientSecret = 19,
  InvalidPatreonOAuthHost = 21,
  InvalidPatreonOAuthRedirectUri = 23,
  MissingPatreonOAuthClientID = 16,
  MissingPatreonOAuthClientSecret = 18,
  MissingPatreonOAuthHost = 20,
  MissingPatreonOAuthRedirectUri = 22,

  // Patreon access token
  InvalidPatreonClientID = 28,
  InvalidPatreonGrantCode = 29,
  InvalidPatreonTokenRequest = 32,
  MissingInvalidPatreonRequestDescription = 30,
  MissingPatreonAccessToken = 36,
  MissingPatreonRequestCode = 15,
  MissingPatreonTokenErrorBody = 25,
  MissingPatreonTokenErrorCode = 27,
  NonJsonPatreonTokenErrorBody = 24,
  NonJsonPatreonTokenResponse = 34,
  NonObjectPatreonTokenError = 26,
  NonObjectPatreonTokenResponse = 35,
  NonStringInvalidPatreonRequestDescription = 31,
  NonStringPatreonAccessToken = 37,
  UnknownPatreonTokenError = 33,

  // Patreon current user
  InvalidPatreonCurrentUserData = 43,
  MissingPatreonCurrentUserData = 42,
  MissingPatreonCurrentUserId = 44,
  NonJsonPatreonCurrentUserResponse = 38,
  NonObjectPatreonCurrentUserResponse = 41,
  NonOkPatreonCurrentUserResponseStatus = 40,
  NonStringPatreonCurrentUserId = 45,
  PatreonCurrentUserForbidden = 39,

  // quisi.do
  CSRF = 14,
  InvalidAuthnUserIdsNamespace = 50,
  InvalidCause = 3,
  InvalidDatabase = 47,
  InvalidIsolateEnvironment = 6,
  InvalidUserId = 48,
  MissingAuthnUserIdsNamespace = 49,
  MissingDatabase = 46,
  MissingIsolateEnvironment = 7,
  NotFound = 404,
  TooManyRequests = 429,
  Unknown = 1,
  UnknownCause = 2,
}

export default ErrorCode;
