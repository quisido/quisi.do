enum ResponseCode {
  Cached = 1,
  InvalidAuthenticationId = 6,
  MethodNotAllowed = 0,
  MissingEnvironment = 2,
  MissingEnvironmentName = 10,
  MissingAuthenticationDatabase = 3,
  MissingAuthenticationId = 5,
  MissingCookieDomain = 4,
  MissingIP = 7,
  ThrottleCacheMiss = 8,
  Uncached = 9,
}

export default ResponseCode;
