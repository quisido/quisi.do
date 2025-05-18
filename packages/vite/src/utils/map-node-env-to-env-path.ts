export default function mapNodeEnvToEnvPath(nodeEnv: string): string {
  switch (nodeEnv) {
    case 'production':
      return '.env.production';

    default:
      return '.env.development';
  }
}
