import { setUser } from '@sentry/react';
import type { User } from '@sentry/types';

export default function useSetUser(): (user: User | null) => void {
  return setUser;
}
