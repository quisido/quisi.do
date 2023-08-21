'use client';

import type { PropsWithChildren, ReactElement } from 'react';
import DataDog from 'react-datadog';
import GITHUB_SHA from '../../constants/github-sha';

export default function AppDatadog({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return (
    <DataDog
      applicationId="e29eb164-e193-4380-b512-ebd70bbfaeb6"
      clientToken="pubf0c07bd5003d0c4a65a9f129d9e83a3d"
      env={process.env.NODE_ENV}
      service="charlesstover.com"
      sessionReplayRecording
      version={GITHUB_SHA ?? 'unknown'}
    >
      {children}
    </DataDog>
  );
}
