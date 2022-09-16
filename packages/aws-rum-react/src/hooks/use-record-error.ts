import type { AwsRum } from 'aws-rum-web';
import { useCallback } from 'react';
import useAwsRum from './use-aws-rum';

export default function useRecordError(): (
  ...params: Parameters<AwsRum['recordError']>
) => ReturnType<AwsRum['recordError']> {
  const client: AwsRum = useAwsRum();

  return useCallback(
    (
      ...params: Parameters<AwsRum['recordError']>
    ): ReturnType<AwsRum['recordError']> => {
      client.recordError(...params);
    },
    [client],
  );
}
