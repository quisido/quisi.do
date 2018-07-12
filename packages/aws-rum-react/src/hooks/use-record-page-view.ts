import type { AwsRum } from 'aws-rum-web';
import { useCallback } from 'react';
import useAwsRum from './use-aws-rum.js';

export default function useRecordPageView(): (
  ...params: Parameters<AwsRum['recordPageView']>
) => ReturnType<AwsRum['recordPageView']> {
  const client: AwsRum = useAwsRum();

  return useCallback(
    (
      ...params: Parameters<AwsRum['recordPageView']>
    ): ReturnType<AwsRum['recordPageView']> => {
      client.recordPageView(...params);
    },
    [client],
  );
}
