enum MetricName {
  ErrorCode = 'error.code',
  FaviconIco = 'pathname.favicon.ico',
  InvalidEnvironmentName = 'environment-name.invalid',
  InvalidHost = 'host.invalid',
  InvalidPrivateDataset = 'dataset.private.invalid',
  InvalidPublicDataset = 'dataset.public.invalid',
  InvalidTraceParent = 'trace-parent.invalid',
  MissingEnvironmentName = 'environment-name.missing',
  MissingHost = 'host.missing',
  MissingIP = 'ip.missing',
  MissingIsolateEnvironment = 'isolate-environment.missing',
  MissingPrivateDataset = 'dataset.private.missing',
  MissingPublicDataset = 'dataset.public.missing',
  MissingTraceParent = 'trace-parent.missing',
  PatreonRequest = 'request.patreon',
  TooManyRequests = 'throttle.ip',
  RobotsTxt = 'pathname.robots.txt',
}

export default MetricName;
