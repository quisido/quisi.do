export default function mapNodeEnvToEnvPath(nodeEnv: string): string {
  switch (nodeEnv) {
    case 'staging':
      return '.env.staging';

    case 'production':
      return '.env.production';

    default:
      return '.env.development';
  }
}
