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
  PatreonRequest = 'request.patreon',
  OAuthUserIdSelected = 'db.oauth.user-id.success',
  SetAuthenticationIdUser = 'kv.authn-id_user.set',
  StartRegistration = 'registration.start',
  Success = 'success',
  RobotsTxt = 'robots.txt',
  UserInserted = 'db.users.insert',

  // Experiments
  AwaitExperiment = 'experiment.await',
}

export default MetricName;
