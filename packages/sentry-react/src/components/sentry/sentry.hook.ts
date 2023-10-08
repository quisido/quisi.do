'use client';

import type { BrowserOptions } from '@sentry/react';
import { init, setUser } from '@sentry/react';
import type { User } from '@sentry/types';
import { useEffect } from 'react';
import DEFAULT_USER from '../../constants/default-user.js';
import mapObjectToDependencyArray from '../../utils/map-object-to-dependency-array.js';

interface Props extends Readonly<BrowserOptions> {
  readonly user?: User | undefined;
}

export default function useSentry({ user, ...browserOptions }: Props): void {
  const initDependencies: unknown[] =
    mapObjectToDependencyArray(browserOptions);

  useEffect(
    (): void => {
      init(browserOptions);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    initDependencies,
  );

  useEffect((): void => {
    setUser({
      ...DEFAULT_USER,
      ...user,
    });
  }, [user]);
}