import { type NextConfig } from "next";

export default function mapNodeEnvToOutput(
  env: NodeJS.ProcessEnv['NODE_ENV'],
): NextConfig['output'] {
  switch (env) {
    case 'development':
    case 'test':
      return 'standalone';
    case 'production':
      return 'export';
  }
}
