import type { AwsRum } from 'aws-rum-web';
import { useCallback } from 'react';
import useAwsRum from './use-aws-rum';

export default function useRecordEvent(): (
  ...params: Parameters<AwsRum['recordEvent']>
) => ReturnType<AwsRum['recordEvent']> {
  const client: AwsRum = useAwsRum();

  return useCallback(
    (
      ...params: Parameters<AwsRum['recordEvent']>
    ): ReturnType<AwsRum['recordEvent']> => {
      client.recordEvent(...params);
    },
    [client],
  );
}
