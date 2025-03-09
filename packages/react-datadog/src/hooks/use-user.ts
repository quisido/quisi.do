'use client';

import type { datadogRum } from '@datadog/browser-rum';
import { isUndefined } from 'fmrs';
import { useEffect } from 'react';
import useShallowMemo from 'use-shallow-memo';
import type User from '../types/user.js';
import useDatadogRum from './use-datadog-rum.js';

const isEmptyRecord = (value: object): value is Record<never, never> =>
  Object.values(value).every(isUndefined);

export default function useUser(user: Readonly<User> | undefined): void {
  // Contexts
  const rum: typeof datadogRum = useDatadogRum();

  // States
  const userMemo: User | Record<never, never> = useShallowMemo(user ?? {});

  // Effects
  useEffect((): VoidFunction | undefined => {
    if (isEmptyRecord(userMemo)) {
      return;
    }

    rum.setUser(userMemo);
    return (): void => {
      rum.clearUser();
    };
  }, [rum, userMemo]);
}
