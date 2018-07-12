import * as sentryBrowser from '@sentry/browser';
import { type PropsWithChildren, type ReactElement, useMemo } from 'react';
import SentrySdk from '../../contexts/sentry-sdk.js';
import type { SentrySdk as SentrySdkType } from '../../types/sentry-sdk.js';
import useShallowMemo from 'use-shallow-memo';

export default function MockSentrySdk({
  children,
  ...props
}: PropsWithChildren<Partial<SentrySdkType>>): ReactElement {
  const memoizedProps: Partial<SentrySdkType> = useShallowMemo(props);

  const value: SentrySdkType = useMemo(
    (): SentrySdkType => ({
      ...sentryBrowser,
      ...memoizedProps,
    }),
    [memoizedProps],
  );

  return <SentrySdk.Provider value={value}>{children}</SentrySdk.Provider>;
}
