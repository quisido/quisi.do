import type VerifyResponse from '../types/verify-response';
import isVerifyResponse from '../utils/is-verify-response';

export default async function getVerifyResponse(): Promise<VerifyResponse> {
  const stdin: NodeJS.Socket = process.openStdin();

  let responseStr = '';
  const handleData = (chunk: string): void => {
    responseStr += chunk;
  };

  stdin.on('data', handleData);

  return new Promise((resolve, reject): void => {
    const handleEnd = (): void => {
      try {
        const response: unknown = JSON.parse(responseStr);
        if (isVerifyResponse(response)) {
          resolve(response);
        } else {
          throw new Error(`Invalid response: ${responseStr}`);
        }
      } catch (err: unknown) {
        reject(err);
      }
    };

    stdin.on('end', handleEnd);
    stdin.on('error', reject);
  });
}
