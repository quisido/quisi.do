enum MetricName {
  Deny = 'deny',
  EmailInserted = 'db.emails.insert.success',
  EndRegistration = 'registration.end',
  ErrorResponse = 'response.error',
  FailedAssertion = 'assertion.failed',
  FailedEmailInsert = 'db.emails.insert.failure',
  FailedOAuthInsert = 'db.oauth.insert.failure',
  FaviconIco = 'favicon.ico',
  Login = 'login',
  NotFoundRequest = 'request.404',
  OAuthInserted = 'db.oauth.insert.success',
  OAuthUserIdSelected = 'db.oauth.user-id.success',
  SetAuthenticationIdUser = 'kv.authn-id_user.set',
  StartRegistration = 'registration.start',
  Success = 'success',
  RobotsTxt = 'robots.txt',
  UnknownErrorCauseResponse = 'response.error.cause.unknown',
  UnknownErrorResponse = 'response.error.unknown',
  UserInserted = 'db.users.insert',

  // Experiments
  AwaitExperiment = 'experiment.await',

  // Patreon
  MissingPatreonEmail = 'patreon.email.missing',
  MissingPatreonEmailVerification = 'patreon.email-verification.missing',
  NonStringPatreonEmail = 'patreon.email.non-string',
  PatreonRequest = 'request.patreon',
  UnverifiedPatreonEmail = 'patreon.email.unverified',
}

export default MetricName;
