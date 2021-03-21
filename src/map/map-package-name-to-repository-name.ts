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
    default:
      return packageName;
  }
}
