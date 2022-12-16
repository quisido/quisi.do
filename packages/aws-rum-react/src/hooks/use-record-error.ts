import type { AwsRum } from 'aws-rum-web';
import { useCallback } from 'react';
import useAwsRum from './use-aws-rum';

export default function useRecordError(): (error: unknown) => void {
  const client: AwsRum = useAwsRum();

  return useCallback(
    (error: unknown): void => {
      client.recordError(error);
    },
    [client],
  );
}
