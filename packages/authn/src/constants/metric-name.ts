enum MetricName {
  ErrorCode = 'error.code',
  FaviconIco = 'pathname.favicon.ico',
  InvalidCookieDomain = 'cookie-domain.invalid',
  InvalidDataBucket = 'bucket.data.invalid',
  InvalidEnvironmentName = 'environment-name.invalid',
  InvalidHost = 'host.invalid',
  InvalidPrivateDataset = 'dataset.private.invalid',
  InvalidPublicDataset = 'dataset.public.invalid',
  InvalidTraceParent = 'trace-parent.invalid',
  MissingCookieDomain = 'cookie-domain.missing',
  MissingDataBucket = 'bucket.data.missing',
  MissingEnvironmentName = 'environment-name.missing',
  MissingHost = 'host.missing',
  MissingIP = 'ip.missing',
  MissingIsolateEnvironment = 'isolate-environment.missing',
  MissingPrivateDataset = 'dataset.private.missing',
  MissingPublicDataset = 'dataset.public.missing',
  MissingTraceParent = 'trace-parent.missing',
  PatreonRequest = 'request.patreon',
  RobotsTxt = 'pathname.robots.txt',
  SetAuthenticationIdUser = 'namespace.authn-user-ids.set',
  TooManyRequests = 'throttle.ip',

  // OAuth
  AuthenticationCreated = 'authentication.created',
  AuthenticationRead = 'authentication.read',
  EmailInsertError = 'query.emails.insert.error',
  EmailInserted = 'query.emails.insert',
  OAuthInsertError = 'query.oauth.insert.error',
  OAuthInserted = 'query.oauth.insert',
  OAuthUserIdSelected = 'query.oauth.select.user-id',

  // Patreon
  InvalidPatreonIdentityAttributes = 'patreon.identity.attributes.invalid',
  MissingPatreonIdentityAttributes = 'patreon.identity.attributes.missing',
  MissingPatreonOAuthHost = 'oauth.patreon.host.missing',

  // quisi.do
  AuthnIdCreated = 'authn-id.created',
  AuthnIdError = 'authn-id.error',
}

export default MetricName;
