import { ErrorCode } from '@quisido/authn-shared';
import ErrorResponseInit from './error-response-init.js';

export default function handleMissingIsolateEnvironment(): Response {
  return new Response(
    null,
    new ErrorResponseInit(ErrorCode.MissingIsolateEnvironment),
  );
}
