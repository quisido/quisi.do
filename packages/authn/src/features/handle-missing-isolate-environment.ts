import ErrorCode from '../constants/error-code.js';
import ErrorResponseInit from './error-response-init.js';

export default function handleMissingIsolateEnvironment(): Response {
  return new Response(
    null,
    new ErrorResponseInit(ErrorCode.MissingIsolateEnvironment),
  );
}
