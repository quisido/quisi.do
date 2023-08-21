export default function mapPackageNameToRepositoryName(
  packageName: string,
): string {
  switch (packageName) {
    case '@gamingmedley/konami.js':
      return 'konami-js';
    case '@charlesstover/hsl2rgb':
      return 'hsl2rgb-js';
    case 'pluralsight-score':
      return 'react-pluralsight-score';
    case 'react-router-v6-instrumentation':
      return 'react-router-v6-sentry-browser-tracing-integration';
    default:
      return packageName;
  }
}
