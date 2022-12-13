import { AwsRum } from 'aws-rum-web';
import { useEffect } from 'react';
import type { Location } from 'react-router';
import { useLocation } from 'react-router';
import useAwsRum from './use-aws-rum';

export default function useReactRouterRecordPageView(): void {
  // Contexts
  const awsRum: AwsRum = useAwsRum();
  const { pathname }: Location = useLocation();

  // Effects
  useEffect((): void => {
    awsRum.recordPageView(pathname);
  }, [awsRum, pathname]);
}
