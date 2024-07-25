import InternalServerErrorResponse from './internal-server-error-response.js';

export default function createInvalidIsolateEnvironmentHandler(
  console: Console,
): (env: unknown) => Response {
  return function handleInvalidIsolateEnvironment(env: unknown): Response {
    if (typeof env === 'undefined') {
      console.error('Missing isolate environment');
      return new InternalServerErrorResponse();
    }

    console.error('Invalid isolate environment', env);
    return new InternalServerErrorResponse();
  };
}
