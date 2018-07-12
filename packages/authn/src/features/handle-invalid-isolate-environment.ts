import { ErrorCode } from '@quisido/authn-shared';
import ErrorResponseInit from './error-response-init.js';

export default function handleInvalidIsolateEnvironment(): Response {
  return new Response(
    null,
    new ErrorResponseInit(ErrorCode.InvalidIsolateEnvironment),
  );
}
