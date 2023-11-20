'use client';

import * as fullStoryBrowser from '@fullstory/browser';
import { useMemo, type PropsWithChildren, type ReactElement } from 'react';
import FullStorySdk from '../contexts/fullstory-sdk.js';
import useShallowMemo from '../hooks/use-shallow-memo.js';
import type { FullStorySdk as FullStorySdkType } from '../types/fullstory-sdk.js';

export default function MockFullStory({
  children,
  ...props
}: PropsWithChildren<Partial<FullStorySdkType>>): ReactElement {
  const memoizedProps: FullStorySdkType = useShallowMemo(props);

  const value: FullStorySdkType = useMemo(
    (): FullStorySdkType => ({
      ...fullStoryBrowser,
      ...memoizedProps,
    }),
    [memoizedProps],
  );

  return (
    <FullStorySdk.Provider value={value}>{children}</FullStorySdk.Provider>
  );
}
