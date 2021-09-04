import type VerifyResponse from './types/verify-response';
import getVerifyResponse from './utils/get-verify-response';
import mapVerifyResponseToErrorString from './utils/map-verify-response-to-error-string';
import mapVerifyResponseToMessageString from './utils/map-verify-response-to-message-string';

const FAILURE_EXIT_CODE = 1;
const SUCCESS_EXIT_CODE = 0;

getVerifyResponse()
  .then((response: VerifyResponse): void => {
    if (!response.success) {
      throw new Error(mapVerifyResponseToErrorString(response));
    }
    if (response.result !== null) {
      console.log(`Status: ${response.result.status}`);
    }
    if (response.messages.length > 0) {
      console.log(mapVerifyResponseToMessageString(response));
    }
    process.exit(SUCCESS_EXIT_CODE);
  })
  .catch((err: unknown): void => {
    console.error(err);
    process.exit(FAILURE_EXIT_CODE);
  });
